import { HitCalculatorStrategy } from "../../models/hit-calculator-strategy.model";
import { Shield } from "../../models/shield.model";

export class ShieldedCalculator implements HitCalculatorStrategy {
    
    constructor(private shield: Shield){}
    
    public calculate(target: {damage:number} ): number {
        let hits = 0;
        let hp = 100;
        let shieldCharge = this.shield.totalCharge;
        while (hp >0) {
            let hitDamage = target.damage;

            if(shieldCharge > 0){
                hitDamage = target.damage * (1 - this.shield.mitigation);
                shieldCharge -= target.damage;
            }

            hp -= hitDamage;
            hits++;
        }
        return hits;
    }
}