export interface FragGrenade{
    type: 'Frag',
    name: string,
    damage: number,
    radius: number,
    delay: number
}

export interface FireGrenade{
    type: 'Fire',
    name: string,
    damage: number,
    radius: number,
    duration: number
}

export interface TriggerGrenade{
    type: 'Trigger',
    name: string,
    damage: number,
    radius: number,
    delay: number
}

export type Grenade = FragGrenade | FireGrenade | TriggerGrenade;