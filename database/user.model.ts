import { Document, Schema, model, models } from "mongoose";

export interface IUser extends Document {
  username: string;
  password: string;
  savedAnime: Schema.Types.ObjectId[];
}

export const UserSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  savedAnime: [
    {
      type: Schema.Types.ObjectId,
      ref: "Savedanime",
    },
  ],
});

const User = models?.User || model<IUser>("User", UserSchema);

export default User;
