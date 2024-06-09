import { Document, Schema, model, models } from "mongoose";

export interface ISaved extends Document {
  description: string;
  cover: string;
  name: string;
  link: string;
  status: string;
  type: "anime" | "manga";
  user: Schema.Types.ObjectId;
}

export const SavedAnimeSchema = new Schema<ISaved>({
  description: {
    type: String,
    required: true,
  },

  cover: {
    type: String,
    required: true,
  },

  name: {
    type: String,
    required: true,
  },

  link: {
    type: String,
    required: true,
  },

  status: {
    type: String,
    required: true,
  },

  type: {
    type: String,
    required: true,
  },

  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Saved = models?.Saved || model<ISaved>("Saved", SavedAnimeSchema);

export default Saved;
