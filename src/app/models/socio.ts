export class Socio {
    idSocio: string;
    dni: string;
    nombre: string;
    apellidos: string;

    constructor(id_socio: string, dni: string, nombre: string, apellidos: string){

        this.idSocio = id_socio;
        this.dni = dni;
        this.nombre = nombre;
        this.apellidos = apellidos;

    }
}