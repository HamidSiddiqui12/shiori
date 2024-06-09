"use server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import Saved from "../../../database/saved.model";
import User, { IUser } from "../../../database/user.model";
import { UserInterface } from "../../../types";
import { connectToDatabase } from "../mongoose";
import { CreateUserParams } from "./shared.types";

export async function getUserById(id: any) {
  try {
    if (!id) throw new Error("ID not found");
    await connectToDatabase();
    const user: UserInterface | null = await User.findById({
      _id: JSON.parse(id),
    });
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createUser(params: CreateUserParams) {
  try {
    await connectToDatabase();
    const { username, password } = params;

    const user = await User.findOne({ username });

    if (user) {
      throw new Error("User already exists");
    }

    await User.create({
      username,
      password,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function loginUser(params: CreateUserParams) {
  try {
    await connectToDatabase();

    const { username, password } = params;

    const user: UserInterface | null = await User.findOne({ username });
    if (!user) {
      throw new Error("User not found");
    }

    if (!user.password) {
      throw new Error("Password not found");
    }

    if (user.password !== password) {
      throw new Error("Incorrect password");
    }

    if (user.password === password) {
      cookies().set("token", JSON.stringify(user._id));
      return true;
    }
    throw new Error("User not found");
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function logoutUser() {
  cookies().delete("token");
}

type CreateAnimeParams = {
  userId: string;
  name: string;
  link: string;
  type: string;
  status: string;
  cover: string;
  description: string;
};
export async function addAnime(params: CreateAnimeParams) {
  try {
    await connectToDatabase();

    const { userId, name, link, type, status, cover, description } = params;

    const user: IUser | null = await User.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    const saved = await Saved.create({
      name,
      link,
      type,
      status,
      cover,
      description,
    });

    await User.findByIdAndUpdate(
      userId,
      {
        $push: { saved: saved._id },
      },
      { new: true }
    );

    revalidatePath("/");
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getSavedAnime(userId: string) {
  try {
    await connectToDatabase();

    const user: IUser | null = await User.findById(userId).populate({
      path: "saved",
      model: "Saved",
    });

    if (!user) {
      throw new Error("User not found");
    }

    const saved = user.saved.filter((saved: any) => saved.type === "anime");

    return saved;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getSavedManga(userId: string) {
  try {
    await connectToDatabase();

    const user: IUser | null = await User.findById(userId).populate({
      path: "saved",
      model: "Saved",
    });

    if (!user) {
      throw new Error("User not found");
    }

    const saved = user.saved.filter((saved: any) => saved.type === "manga");

    return saved;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteSeries(id: string) {
  try {
    await connectToDatabase();
    await Saved.deleteOne({ _id: id });

    revalidatePath("/");
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// update

interface UpdateAnimeParams {
  name: string;
  link: string;
  type: string;
  status: string;
  cover: string;
  description: string;
  id: string;
}

export async function updateAnime(params: UpdateAnimeParams) {
  try {
    await connectToDatabase();

    const { name, link, type, status, cover, description, id } = params;

    await Saved.updateOne(
      { _id: id },
      { name, link, type, status, cover, description }
    );

    revalidatePath("/");
  } catch (error) {
    console.log(error);
    throw error;
  }
}
