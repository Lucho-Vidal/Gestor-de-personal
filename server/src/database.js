
import {connect} from 'mongoose'

export const startConnection = async () => {
        try {
            const db = await connect("mongodb://127.0.0.1/trenesArgentinos");
            console.log('DB is connected:',db.connection.name);
        } catch (error) {
            console.log(error+"------DEBUG");
        }
    };