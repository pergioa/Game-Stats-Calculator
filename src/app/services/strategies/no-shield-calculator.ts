import { Gun } from "../../models/gun.model";
import { HitCalculatorStrategy } from "../../models/hit-calculator-strategy.model";

export class NoShieldCalculator implements HitCalculatorStrategy {
    public calculate = (gun: Gun): number => Math.ceil(100 / gun.damage);
}