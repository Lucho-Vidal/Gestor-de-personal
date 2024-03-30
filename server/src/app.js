import express from "express";
import morgan from "morgan";
import cors from "cors";
import pkg from "../package.json";
import path from "path";
import { createRoles } from "./libs/initialSetup";

import personales from "./routers/personal.routes";
import itinerario from "./routers/itinerario.routes";
import novedades from "./routers/novedades.routes";
import turno from "./routers/turno.routes";
import authRoutes from "./routers/auth.routes";
import usersRoutes from "./routers/user.routes";
import registrosRoutes from "./routers/registro.routes";
import cambioTurnoRoutes from "./routers/cambioTurno.routes";


const app = express();
createRoles();

app.set("pkg", pkg);

app.use(morgan("dev"));
app.use(express.json());

const corsOptions = {
    origin: ["http://172.22.108.29:5173","http://172.22.108.29:8080"],
    // origin: "http://localhost:8080", // Reemplaza con la URL de tu frontend
    // origin: "http://172.22.108.29:5173/", // Reemplaza con la URL de tu frontend
    // origin: ["http://localhost:5173","http://localhost:8080","https://gnpa-trenesargentinos.web.app"], // Reemplaza con la URL de tu frontend
    //origin: "https://gnpa-trenesargentinos.web.app",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    optionsSuccessStatus: 204,
    credentials: true
};

app.use(cors(corsOptions));


app.use("/api", personales);
app.use("/api", itinerario);
app.use("/api", novedades);
app.use("/api", turno);
app.use("/api/auth", authRoutes);
app.use("/api", usersRoutes);
app.use("/api", registrosRoutes);
app.use("/api", cambioTurnoRoutes);


app.use(express.static(path.join(__dirname,"..","..","dist")));

export default app;
