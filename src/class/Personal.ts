import { IConductor, IConocimientos } from "@/interfaces/IConductores";

abstract class Personal {
    legajo: number;
    apellido: string;
    nombres: string;
    turno: string;
    franco: number;
    especialidad: string;
    dotacion: string;
    observaciones: string;
    orden: number;

    constructor(
        legajo: number,
        apellido: string,
        nombre: string,
        turno: string,
        franco: number,
        especialidad: string,
        dotacion: string,
        observaciones: string,
        orden: number
    ) {
        this.legajo = legajo;
        this.apellido = apellido;
        this.nombres = nombre;
        this.turno = turno;
        this.franco = franco;
        this.especialidad = especialidad;
        this.dotacion = dotacion;
        this.observaciones = observaciones;
        this.orden = orden;
    }

    public getLegajo(): number {
        return this.legajo;
    }

    public setLegajo(legajo: number): void {
        this.legajo = legajo;
    }

    public getApellido(): string {
        return this.apellido;
    }

    public setApellido(apellido: string): void {
        this.apellido = apellido;
    }

    public getNombre(): string {
        return this.nombres;
    }

    public setNombre(nombre: string): void {
        this.nombres = nombre;
    }

    public getTurno(): string {
        return this.turno;
    }

    public setTurno(turno: string): void {
        this.turno = turno;
    }

    public getFranco(): number {
        return this.franco;
    }

    public setFranco(franco: number): void {
        this.franco = franco;
    }

    public getEspecialidad(): string {
        return this.especialidad;
    }

    public setEspecialidad(especialidad: string): void {
        this.especialidad = especialidad;
    }

    public getDotacion(): string {
        return this.dotacion;
    }

    public setDotacion(dotacion: string): void {
        this.dotacion = dotacion;
    }

    public getObservaciones(): string {
        return this.observaciones;
    }

    public setObservaciones(observaciones: string): void {
        this.observaciones = observaciones;
    }

    public getOrden(): number {
        return this.orden;
    }

    public setOrden(orden: number): void {
        this.orden = orden;
    }
}

export class Conductor extends Personal implements IConductor{
    conocimientos: IConocimientos = {
        CML: false,
        CKD: false,
        RO: false,
        MPN: false,
        OL: false,
        LCI: false,
        ELEC: false,
    };
    /* conocimientos: conocimientos; */

    constructor(
        legajo: number,
        apellido: string,
        nombre: string,
        turno: string,
        franco: number,
        especialidad: string,
        dotacion: string,
        observaciones: string,
        orden: number,
        conocimientos: IConocimientos
    ) {
        super(
            legajo,
            apellido,
            nombre,
            turno,
            franco,
            especialidad,
            dotacion,
            observaciones,
            orden
        );
        this.conocimientos = conocimientos;
        /* this.conocimientos.CML = false;
        this.conocimientos.CKD = false;
        this.conocimientos.RO = false;
        this.conocimientos.MPN = false;
        this.conocimientos.OL = false;
        this.conocimientos.LCI = false;
        this.conocimientos.ELEC = false; */
    }
}

/* type conocimientos = {
    CML: boolean;
    CKD: boolean;
    RO: boolean;
    MPN: boolean;
    OL: boolean;
    LCI: boolean;
    ELEC: boolean;
}; */
export class Guarda extends Personal {
    constructor(
        legajo: number,
        apellido: string,
        nombre: string,
        turno: string,
        franco: number,
        especialidad: string,
        dotacion: string,
        observaciones: string,
        orden: number
    ) {
        super(
            legajo,
            apellido,
            nombre,
            turno,
            franco,
            especialidad,
            dotacion,
            observaciones,
            orden
        );
    }
}
