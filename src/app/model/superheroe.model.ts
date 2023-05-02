export interface Superheroe {
    id: string;
    name: string;
    description: string;
    origin: string;
    power: string;
    age: number;
}


export enum SuperheroPowerTypes {
    FLY = 'Volar',
    STRENGTH = 'Fuerza sobrehumana',
    SENSES = 'Percepción extrasensorial',
    INVISIBLE = 'Invisibilidad',
    CONGITIVE = 'Precognición',
    TELEPORT = 'Teleportación',
    SHAPE = 'Cambio de forma'
}