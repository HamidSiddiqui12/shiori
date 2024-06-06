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
  animeName: string;
  animeLink: string;
  animeStatus: string;
  animeImage: string;
  description: string;
};
export async function addAnime(params: CreateAnimeParams) {
  try {
    await connectToDatabase();

    const {
      userId,
      animeName,
      animeLink,
      animeStatus,
      animeImage,
      description,
    } = params;

    const user: IUser | null = await User.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    const anime = await SavedAnime.create({
      animeName,
      animeLink,
      animeStatus,
      animeImage,
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
  animeName: string;
  animeLink: string;
  animeStatus: string;
  animeImage: string;
  description: string;
}

export async function updateAnime(params: UpdateAnimeParams) {
  try {
    await connectToDatabase();
    const {
      animeName,
      animeLink,
      animeStatus,
      animeImage,
      description,
      animeId,
    } = params;

    const anime = await SavedAnime.findByIdAndUpdate(animeId, {
      animeName,
      animeLink,
      animeStatus,
      animeImage,
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
