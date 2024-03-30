import { connect } from "mongoose";
import env from "dotenv";

env.config();
export const startConnection = async () => {
    try {
        const db = await connect("mongodb://127.0.0.1/trenesArgentinos");
        //const db = await connect("mongodb://mongo/trenesArgentinos");
        // const dbURL = process.env.DATABASE_URL
        // const db = await connect(dbURL);
        console.log("DB is connected:", db.connection.name);
    } catch (error) {
        console.log(error + "------DEBUG");
    }
};
