import { useState } from "react"
import useCounter from "./useCounter"

const Counter = props=>{
    const [step,setStep] = useState(1)
    const { counter, decrement, increment} = useCounter()
    return (<div>
        <div id="counter">{counter}</div>
        <div>
            <input placeholder="steps" type="number" value={step} onChange={e=>setStep(e.target.value)}/>
        </div>
        <div><button onClick={e=>increment(step)}>Increment by {step}</button></div>
        <div><button onClick={e=>decrement(step)}>Decrement by {step}</button></div>
    </div>)
}

export default Counter;