export interface Superheroe {
    id: string;
    name: string;
    description: string;
    origin: string;
    power: string;
    age: number;
}


export enum SuperheroPowerTypes {
    'Volar',
    'Fuerza sobrehumana',
    'Percepción extrasensorial',
    'Invisibilidad',
    'Precognición',
    'Teleportación',
    'Cambio de forma'
}