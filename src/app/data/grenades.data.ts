import { Grenade } from "../models/grenade.model";

export const GRENADES: Grenade[] = [
  { type: 'frag',    name: 'Light Impact Grenade', damage: 30, radius: 2.5, delay: 0   },
  { type: 'frag',    name: 'Heavy Fuze',            damage: 80, radius: 7.5, delay: 3   },
  { type: 'frag',    name: 'Snap Blast',            damage: 70, radius: 7.5, delay: 3   },
  { type: 'fire',    name: 'Blaze',                 damage: 5,  radius: 10,  duration: 10 },
  { type: 'trigger', name: "Trigger 'Nade",         damage: 90, radius: 7.5, delay: 1.5 },
];