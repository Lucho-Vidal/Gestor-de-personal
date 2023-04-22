//aca solo se arranca la application
import app from "./app";
import { startConnection } from "./database";

startConnection();
app.listen(3000);
console.log("Server is running http://localhost:3000/");
