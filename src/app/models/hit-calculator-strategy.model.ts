export interface HitCalculatorStrategy {
    calculate(target:{damage:number}, multiplier: number):number
}