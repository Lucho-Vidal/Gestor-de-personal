
import {connect} from 'mongoose'

export const startConnection = async () => {
        try {
            //const db = await connect("mongodb://127.0.0.1/trenesArgentinos");
            const db = await connect("mongodb+srv://luccho277:hh2ibnBn!3NYCeG@gnpa.b3jyho6.mongodb.net/?retryWrites=true&w=majority")
            console.log('DB is connected:',db.connection.name);
        } catch (error) {
            console.log(error+"------DEBUG");
        }
    };