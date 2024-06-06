import mongoose from "mongoose";

let isConnected: boolean = false;

export async function connectToDatabase() {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGO_URL) {
    return console.log("No key");
  }

  if (isConnected) {
    return console.log("isConnected");
  }

  try {
    await mongoose.connect(process.env.MONGO_URL, {
      dbName: "shiori",
    });
  } catch (err) {
    console.log("err", err);
  }
}
