import { Gun } from "./gun.model";

export interface HitCalculatorStrategy {
    calculate(gun: Gun):number
}