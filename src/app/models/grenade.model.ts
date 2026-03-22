export interface FragGrenade{
    type: 'frag',
    name: string,
    damage: number,
    radius: number,
    delay: number
}

export interface FireGrenade{
    type: 'fire',
    name: string,
    damage: number,
    radius: number,
    duration: number
}

export interface TriggerGrenade{
    type: 'trigger',
    name: string,
    damage: number,
    radius: number,
    delay: number
}

export type Grenade = FragGrenade | FireGrenade | TriggerGrenade;