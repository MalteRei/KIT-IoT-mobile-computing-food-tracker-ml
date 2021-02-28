import { isLabeledStatement } from "typescript";

interface IPrediction {
    label: string,
    confidence: number
}

export default IPrediction;