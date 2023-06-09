class Personal {
    protected legajo: number;
    protected apellido: string;
    protected nombre: string;
    protected turno: string;
    protected franco: string;
    protected especialidad: string;
    protected dotacion: string;
    protected observaciones: string;
    protected orden: number;

    constructor(
        legajo: number,
        apellido: string,
        nombre: string,
        turno: string,
        franco: string,
        especialidad: string,
        dotacion: string,
        observaciones: string,
        orden: number
    ) {
        this.legajo = legajo;
        this.apellido = apellido;
        this.nombre = nombre;
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
        return this.nombre;
    }

    public setNombre(nombre: string): void {
        this.nombre = nombre;
    }

    public getTurno(): string {
        return this.turno;
    }

    public setTurno(turno: string): void {
        this.turno = turno;
    }

    public getFranco(): string {
        return this.franco;
    }

    public setFranco(franco: string): void {
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

export class Conductor extends Personal {
    private conocimiento : conocimientos = {
        CML:false,
        CKD: false,
        RO: false,
        MPN: false,
        OL: false,
        LCI: false,
        ELEC: false,
    };
    
    constructor(
        legajo: number,
        apellido: string,
        nombre: string,
        turno: string,
        franco: string,
        especialidad: string,
        dotacion: string,
        observaciones: string,
        orden: number,
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
            orden);
        this.conocimiento.CML = false;
        this.conocimiento.CKD = false;
        this.conocimiento.RO = false;
        this.conocimiento.MPN = false;
        this.conocimiento.OL = false;
        this.conocimiento.LCI = false;
        this.conocimiento.ELEC = false;
    }
}
type conocimientos = {
    CML: boolean;
    CKD: boolean;
    RO: boolean;
    MPN: boolean;
    OL: boolean;
    LCI: boolean;
    ELEC: boolean;
};
export class Guarda extends Personal {
    constructor(
        legajo: number,
        apellido: string,
        nombre: string,
        turno: string,
        franco: string,
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
