import { Document, Schema, model, models } from "mongoose";

export interface ISavedAnime extends Document {
  title: string;
  description: string;
  episodesWatched: number;
  genre: string;
  animeImage: string;
  animeName: string;
  animeLink: string;
  animeStatus: string;
  user: Schema.Types.ObjectId;
}

export const SavedAnimeSchema = new Schema<ISavedAnime>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  episodesWatched: {
    type: Number,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  animeImage: {
    type: String,
    required: true,
  },
  animeName: {
    type: String,
    required: true,
  },
  animeLink: {
    type: String,
    required: true,
  },
  animeStatus: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const SavedAnime =
  models?.SavedAnime || model<ISavedAnime>("SavedAnime", SavedAnimeSchema);

export default SavedAnime;
