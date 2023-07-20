import { Router } from "express";
import Itinerario from "../models/itinerario";
import Conductores from "../models/IPersonalCtor";
import INovedad from "../models/novedades"
import ITurno from "../models/ITurno";

const router = Router();

router.get("/turnos", async (req, res) => {
    const tasks = await ITurno.find();
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

router.get("/novedades",async (req, res) => {
    const novedades = await INovedad.find();
    res.json(novedades);
});
router.get("/ultimaNovedad",async (req, res) => {
    const novedades = await INovedad.find().sort({$natural:-1}).limit(1);
    res.json(novedades);
});

router.get("/novedades/:id",async (req,res) => {
    const novedad = await INovedad.findById(req.params.id);
    res.json(novedad);
});

router.post("/novedades",async (req,res) => {
    const {
        _id,
        legajo,
        apellido,
        nombres,
        puesto,
        base,
        tipoNovedad,
        fechaBaja,
        fechaAlta,
        HNA,
        detalle,
        remplazo
    } = req.body;
    const newNovedad = new INovedad({
        _id,
        legajo,
        apellido,
        nombres,
        puesto,
        base,
        tipoNovedad,
        fechaBaja,
        fechaAlta,
        HNA,
        detalle,
        remplazo
    })
    const savedNovedad = await newNovedad.save();
    res.json(savedNovedad);
});

router.put("/novedades/:id", async (req,res)=>{
    const updateNovedad = await INovedad.findByIdAndUpdate(req.params.id, req.body,{
        new: true,
    });
    res.json(updateNovedad);
});

router.delete("/novedades/:id", async (req,res) =>{
    const novedad = await INovedad.findByIdAndDelete(req.params.id);
    res.json(novedad);
})

export default router;
