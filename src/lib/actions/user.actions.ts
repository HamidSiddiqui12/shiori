"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import SavedAnime from "../../../database/savedAnime.model";
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
  Name: string;
  Link: string;
  Type: string;
  Status: string;
  Image: string;
  description: string;
};
export async function addAnime(params: CreateAnimeParams) {
  try {
    await connectToDatabase();

    const { userId, Name, Link, Type, Status, Image, description } = params;

    const user: IUser | null = await User.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    const anime = await SavedAnime.create({
      Name,
      Link,
      Type,
      Status,
      Image,
      description,
      user: user._id,
    });

    user.savedAnime.push(anime._id);

    await user.save();

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
      path: "savedAnime",
      model: "SavedAnime",
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user.savedAnime;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteAnime(animeId: string) {
  try {
    await connectToDatabase();
    await SavedAnime.deleteOne({ _id: animeId });

    revalidatePath("/");
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// update

interface UpdateAnimeParams {
  animeId: string;
  Name: string;
  Link: string;
  Type: string;
  Status: string;
  Image: string;
  description: string;
}

export async function updateAnime(params: UpdateAnimeParams) {
  try {
    await connectToDatabase();
    const { Name, Link, Type, Status, Image, description, animeId } = params;

    const anime = await SavedAnime.findByIdAndUpdate(animeId, {
      Name,
      Link,
      Type,
      Status,
      Image,
      description,
    });

    if (!anime) {
      throw new Error("Anime not found");
    }

    revalidatePath("/");

    return anime;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
