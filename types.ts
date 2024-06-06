import { Schema } from "mongoose";

export interface UserInterface {
  _id: Schema.Types.ObjectId;
  username: string;
  password: string;
  savedAnime: Schema.Types.ObjectId[];
}
