
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

export class Conductor extends Personal{
    
    private CML: boolean;
    private CKD: boolean;
    private RO: boolean;
    private MPN: boolean;
    private OL: boolean;
    private LCI: boolean;
    private ELEC: boolean;
    
    constructor(legajo: number,
        apellido: string,
        nombre: string,
        turno: string,
        franco: string,
        especialidad: string,
        dotacion: string,
        observaciones: string,
        orden: number,

        ){
        super(
            legajo,apellido,nombre,turno,franco,especialidad,dotacion,observaciones,orden
        )
        this.CML = false;
        this.CKD = false;
        this.RO = false;
        this.MPN = false;
        this.OL = false;
        this.LCI = false;
        this.ELEC = false;
    }
    

    public isCML(): boolean {
        return this.CML;
    }

    public setCML(CML: boolean): void {
        this.CML = CML;
    }

    public isCKD(): boolean {
        return this.CKD;
    }

    public setCKD(CKD: boolean): void {
        this.CKD = CKD;
    }

    public isRO(): boolean {
        return this.RO;
    }

    public setRO(RO: boolean): void {
        this.RO = RO;
    }

    public isMPN(): boolean {
        return this.MPN;
    }

    public setMPN(MPN: boolean): void {
        this.MPN = MPN;
    }

    public isOL(): boolean {
        return this.OL;
    }

    public setOL(OL: boolean): void {
        this.OL = OL;
    }

    public isLCI(): boolean {
        return this.LCI;
    }

    public setLCI(LCI: boolean): void {
        this.LCI = LCI;
    }

    public isELEC(): boolean {
        return this.ELEC;
    }

    public setELEC(ELEC: boolean): void {
        this.ELEC = ELEC;
    }   
}
export class Guarda extends Personal{
    
    
    constructor(legajo: number,
        apellido: string,
        nombre: string,
        turno: string,
        franco: string,
        especialidad: string,
        dotacion: string,
        observaciones: string,
        orden: number,

        ){
        super(
            legajo,apellido,nombre,turno,franco,especialidad,dotacion,observaciones,orden
        )
    }
}
export const guar = new Conductor(555,'Vidal','Luciano','6',"Domingo","desarrollado","PCT","",1)

