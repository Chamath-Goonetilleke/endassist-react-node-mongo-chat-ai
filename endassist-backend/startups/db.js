import mongoose from 'mongoose'

export default function (){
    const db = process.env.MONGODB_URL;
    mongoose
      .connect(db)
      .then(() => {
        console.log(`Connected to ${db}.`);
      })
      .catch((err) => {
        console.log(err);
      });
}