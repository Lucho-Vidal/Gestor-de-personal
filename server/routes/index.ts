import { Router } from "express";
import Indice from "../models/indice";
import Itinerario from "../models/itinerario";
import Conductores from "../models/IPersonalCtor";
import Guardas from "../models/IPersonalGda";

const router = Router();

router.get("/indices", async (req, res) => {
    const tasks = await Indice.find();
    res.json(tasks);
});

router.get("/itinerario", async (req, res) => {
    const tasks = await Itinerario.find();
    res.json(tasks);
});

router.get("/Personal/Ctor", async (req, res) => {
    const tasks = await Conductores.find();
    res.json(tasks);
});

router.get("/Personal/Gda", async (req, res) => {
    const tasks = await Guardas.find();
    res.json(tasks);
});

/* router.post("/tasks", async (req, res) => {
    const { title, description } = req.body;
    const newTask = new Task({ title, description });
    const savedTask = await newTask.save();
    res.json(savedTask);
});

router.get("/tasks/:id", async (req, res) => {
    const tasks = await Task.findById(req.params.id);
    res.json(tasks);
});

router.put("/tasks/:id", async (req, res) => {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
    res.json(updatedTask);
});

router.delete("/tasks/:id", async (req, res) => {
    const tasks = await Task.findByIdAndDelete(req.params.id);
    res.json(tasks);
});
 */
export default router;
