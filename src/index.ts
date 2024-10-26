export class Servicio {
  protected nombre: string;
  protected coste: number;
  public constructor(nombre: string, coste: number) {
    this.nombre = nombre;
    this.coste = coste;
  }
  //getters----
  getNombre() {
    return this.nombre;
  }
  getCoste() {
    return this.coste;
  }
  //setters----
  setNombre(nombre: string) {
    return (this.nombre = nombre);
  }
  setCoste(coste: number) {
    return (this.coste = coste);
  }
}
//----
let freeService = new Servicio("Internet", 0);
export abstract class Habitacion {
  protected servicios: Servicio[];
  protected numero: number;
  protected estado: boolean;
  protected precioBase: number;
  constructor(numero: number, estado: boolean, precioBase: number) {
    this.numero = numero;
    this.estado = estado;
    this.precioBase = precioBase;
    this.servicios = [freeService];
  }
  //getters----
  getNumero() {
    return this.numero;
  }
  getEstado() {
    return this.estado;
  }
  getPrecioBase() {
    return this.precioBase;
  }
  getServicios() {
    console.log(this.servicios);
  }
  //setters----
  setNumero(numero: number) {
    return (this.numero = numero);
  }
  setEstado(estado: boolean) {
    return (this.estado = estado);
  }
  setPrecioBase(precioBase: number) {
    return (this.precioBase = precioBase);
  }
  //methods----
  abstract calcularCosto(): void;
  abstract agregarServicios(servicio: Servicio): void;
  public reservar() {
    if (this.estado === true) {
      console.log("la habitacion " + this.getNumero() + " ya esta reservada");
      return;
    }
    this.setEstado(true);
    console.log("La habitacion " + this.getNumero() + " fue reservada");
  }
  public liberar() {
    this.setEstado(false);
    console.log("La habitacion " + this.getNumero() + " fue liberada");
  }
}
//----
export class habitacionEstandar extends Habitacion {
  constructor(numero: number, estado: boolean) {
    super(numero, estado, 2000);
  }
  //methods----
  public agregarServicios() {}
  public calcularCosto() {}
}
//----
let suiteFreeService = new Servicio("Caja de seguridad", 0);
export class habitacionSuite extends Habitacion {
  public constructor(numero: number, estado: boolean) {
    super(numero, estado, 5000);
    this.servicios.push(suiteFreeService);
  }
  public agregarServicios(servicio: Servicio) {
    const indice = this.servicios.includes(servicio);

    if (indice) {
      console.log("El servicio ya esta agregado");
      return;
    }

    this.servicios.push(servicio);
  }
  public calcularCosto() {
    let costoHabitacion = this.getPrecioBase();

    for (let i = 0; i < this.servicios.length; i++) {
      costoHabitacion += this.servicios[i].getCoste();
    }

    return costoHabitacion
  }
}

let nuevaSuite = new habitacionSuite(1, true);
let nuevoService = new Servicio("MiniBar", 2000);
nuevaSuite.agregarServicios(nuevoService);
nuevaSuite.getServicios();
let otroService = new Servicio("Aire acondicionado", 5000);
nuevaSuite.agregarServicios(otroService);
nuevaSuite.getServicios();
console.log(`El costo total de la habitación es: ${nuevaSuite.calcularCosto()}`);

