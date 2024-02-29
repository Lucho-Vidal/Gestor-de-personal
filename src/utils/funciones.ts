// Validaciones:
export function esFechaMayor(dateMayor:string, dateMenor:string) {
    if(dateMayor!== undefined && dateMenor!== undefined){            
        const formattedDateMayor = new Date(dateMayor).toISOString().split('T')[0];
        const formattedDateMenor = new Date(dateMenor).toISOString().split('T')[0];
        return formattedDateMayor > formattedDateMenor
    }else{
        return false;
    }
}
export function esFechaMayorIgual(dateMayor:string, dateMenor:string) {
    if(dateMayor!== undefined && dateMenor!== undefined ){
        const formattedDateMayor = new Date(dateMayor).toISOString().split('T')[0];
        const formattedDateMenor = new Date(dateMenor).toISOString().split('T')[0];
        return formattedDateMayor >= formattedDateMenor;
    }else{
        return false;
    }
}
// export function esInicioRelevoMayorIgualFechaBaja(){
//     if (this.newNovedad.remplazo !== undefined ){
//         if (this.esFechaMayor(this.newNovedad.fechaBaja, this.newNovedad.remplazo?.[0].inicioRelevo)) {
//             this.message.message = "La fecha de inicio del relevo no puede ser anterior a la del inicio de la novedad";
//             this.message.activo = true;
//             this.message.status = 'danger'
//             return true;
//         }else{
//             return false;
//         }
//     }else{
//         return false;
//     }
// }
// export function esFechaBajaMayorFechaAlta(){
//     if(this.newNovedad.fechaAlta !== undefined){
//         if (this.esFechaMayor(this.newNovedad.fechaBaja, this.newNovedad.fechaAlta)) {
//             this.message.message = "La fecha de fin de la novedad no puede ser anterior a la del inicio de la novedad";
//             this.message.activo = true;
//             this.message.status = 'danger'
//             return true;
//         }else{
//             return false;
//         }
//     }else{
//         return false;
//     }
// }
// export function esFinRelevoMayorFinNovedad(){
//     if(this.newNovedad.remplazo == undefined){
//         return false;
//     }
//     if(this.newNovedad.remplazo.length === 0){
//         return false;
//     }
//     if(this.newNovedad.remplazo[this.newNovedad.remplazo.length - 1].finRelevo == ""){
//         return false;
//     }
//     if(this.newNovedad.fechaAlta){
//         if (this.esFechaMayor(this.newNovedad.remplazo[this.newNovedad.remplazo.length - 1].finRelevo , this.newNovedad.fechaAlta)) {
//             this.message.message = "La fecha de fin del relevo no puede ser posterior a la del fin de la novedad";
//             this.message.activo = true;
//             this.message.status = 'danger'
//             return true;
//         }
//     }
// }
// export function hayMasDeUnRelevo(){
//     if (this.newNovedad.remplazo !== undefined) {
//         let sinFechaFin = 0;
//         for (let i = 0; i < this.newNovedad.remplazo.length - 1; i++) {
//             if (!this.newNovedad.remplazo[i].finRelevo) {
//                 sinFechaFin++;
//             }
            
//             if (this.esFechaMayor(this.newNovedad.remplazo[i].finRelevo, this.newNovedad.remplazo[i + 1].inicioRelevo)) {
//                 this.message.message = "Un turno no puede ser relevado por dos personas el mismo día. Y los relevos deben están ordenados consecutivamente.";
//                 this.message.activo = true;
//                 this.message.status = 'danger'
//                 return true;
//             }
//         }
//         if (sinFechaFin > 1){
//             this.message.message = "No puede haber más de un relevo sin fecha de finalización";
//             this.message.activo = true;
//             this.message.status = 'danger'
//             return true;
//         }
//     }
//     return false;
// }
// export function terminaNovedadMismaFechaFinRelevo(){
//     if(this.newNovedad.remplazo !== undefined){
//             if (!this.newNovedad.HNA && !(this.newNovedad.remplazo[this.newNovedad.remplazo.length - 1].finRelevo)) {
//             this.newNovedad.remplazo[this.newNovedad.remplazo.length - 1].finRelevo = this.newNovedad.fechaAlta;
//         }
//     }
// }
// export function validaPersonalConNovedadActiva(personal: IPersonal) {
//     let encontrado = false;
    
//     for (const novedad of this.novedades) {
//         if (encontrado) {
//             break; // Salir del bucle si ya se encontró un caso
//         }

//         if (personal.turno.includes("Ciclo")) {

//             const tieneRelevoActivo = !novedad.novedadInactiva && novedad.remplazo.some((remp: Remplazo) =>
//                 remp && (!remp.finRelevo || this.esFechaMayorIgual(remp.finRelevo, this.today.toISOString())) && remp.legajo === personal.legajo
//             );

//             if (tieneRelevoActivo) {
//                 this.idNovedad = novedad._id;
//                 this.message.message = `El personal ${personal.apellido} ${personal.nombres} se encuentra relevando la novedad N°${novedad._id}. 
//                 Si desea proceder se finalizara su relevo automáticamente.`;
//                 this.message.status = 'warning'
//                 this.message.activo = true;
//                 this.cicloRelevando = true;
//                 encontrado = true;
//             }
//         }

//         if (novedad.legajo === personal.legajo) {
//             const estaDeBaja =
//                 !novedad.novedadInactiva &&
//                 ((novedad.HNA && this.esFechaMayorIgual(this.today.toString(), novedad.fechaBaja)) ||
//                     (this.esFechaMayorIgual(this.today.toString(), novedad.fechaBaja) && this.esFechaMayorIgual(novedad.fechaAlta, this.today.toString())));

//             if (estaDeBaja) {
//                 this.idNovedad = novedad._id;
//                 this.message.message = `Este personal ${personal.apellido} ${personal.nombres} se encuentra de baja por la siguiente novedad N°${novedad._id}. Por favor, finalice el relevo para poder continuar`;
//                 this.message.activo = true;
//                 this.message.status = 'danger'
//                 encontrado = true;
//             }
//         }
//     }
// }