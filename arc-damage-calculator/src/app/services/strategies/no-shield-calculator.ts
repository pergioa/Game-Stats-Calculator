import { HitCalculatorStrategy } from "../../models/hit-calculator-strategy.model";

export class NoShieldCalculator implements HitCalculatorStrategy {
    public calculate (target:{damage:number}, multiplier:number): number {
        return Math.ceil(100 / (target.damage * multiplier));
    }
}