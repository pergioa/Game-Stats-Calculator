export interface HitCalculatorStrategy {
    calculate(target:{damage:number}):number
}