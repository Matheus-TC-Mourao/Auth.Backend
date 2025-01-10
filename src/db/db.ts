import mongoose from "mongoose";

const connect = async () => {
  try {
    mongoose.connect(process.env.MONGO_URL!);
    console.log("Conecting to MongoDB");
  } catch (error) {
    console.log("Error: ", error);
  }
};

export default { connect };
