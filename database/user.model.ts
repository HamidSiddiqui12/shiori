import { Document, Schema, model, models } from "mongoose";

export interface IUser extends Document {
  username: string;
  password: string;
  saved: Schema.Types.ObjectId[];
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
  saved: [
    {
      type: Schema.Types.ObjectId,
      ref: "Saved",
    },
  ],
});

const User = models?.User || model<IUser>("User", UserSchema);

export default User;
