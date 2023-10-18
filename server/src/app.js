import express from "express";
import morgan from "morgan";
import pkg from "../package.json";
import path from "path";
import { createRoles } from "./libs/initialSetup";

import personales from "./routers/personal.routes";
import itinerario from "./routers/itinerario.routes";
import novedades from "./routers/novedades.routes";
import turno from "./routers/turno.routes";
import authRoutes from "./routers/auth.routes";
import usersRoutes from "./routers/user.routes";

const app = express();
createRoles();

app.set("pkg", pkg);

app.use(morgan("dev"));
app.use(express.json());

/* app.get("/", (req, res) => {
    res.json({
        name: app.get("pkg").name,
        author: app.get("pkg").author,
        description: app.get("pkg").description,
        version: app.get("pkg").version,
    });
}); */

app.use("/api", personales);
app.use("/api", itinerario);
app.use("/api", novedades);
app.use("/api", turno);
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);

app.use(express.static(path.join(__dirname,"..","..","dist")));
//console.log(path.join(__dirname,"..","dist"));

export default app;
