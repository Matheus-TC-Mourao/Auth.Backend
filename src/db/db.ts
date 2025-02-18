import mongoose from "mongoose";

const connect = async () => {

  if (!process.env.MONGO_URL) {
    throw new Error("MONGO_URL variable is not defined in the environment!");
  }

  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("Conecting to MongoDB");
    })
    .catch((error) => {
      console.log("Error: ", error);
    });

};

export default { connect };
