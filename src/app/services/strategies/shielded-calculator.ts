import { Gun } from "../../models/gun.model";
import { HitCalculatorStrategy } from "../../models/hit-calculator-strategy.model";
import { Shield } from "../../models/shield.model";

export class ShieldedCalculator implements HitCalculatorStrategy {
    
    constructor(private shield: Shield){}
    
    public calculate(gun: Gun): number {
        let hits = 0;
        let hp = 100;
        let shieldCharge = this.shield.totalCharge;
        while (hp >0) {
            let hitDamage = gun.damage;

            if(shieldCharge > 0){
                hitDamage = gun.damage * (1 - this.shield.mitigation);
                shieldCharge -= gun.damage;
            }

            hp -= hitDamage;
            hits++;
        }
        return hits;
    }
}