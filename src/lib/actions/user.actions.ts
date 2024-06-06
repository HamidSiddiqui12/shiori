"use server";

import { Error } from "mongoose";
import User from "../../../database/user.model";
import { connectToDatabase } from "../mongoose";
import { CreateUserParams } from "./shared.types";

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

    const user = await User.find({ username });
    if (!user) {
      throw new Error("User not found");
    }
    if (user.password === password) {
      return true;
    }
    throw new Error("User not found");
  } catch (error) {
    console.log(error);
    throw error;
  }
}
