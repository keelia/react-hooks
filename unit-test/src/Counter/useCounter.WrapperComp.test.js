import { render, screen,fireEvent } from '@testing-library/react';
import { useState } from 'react';
import useCounter from './useCounter';

test('useCounter', () => {
    const WrapperComponent = ()=>{
        const {counter,increment,decrement} = useCounter();
        const [step,setStep] = useState(1)
        return (
            <>
                <span id="result">{counter}</span>
                <input id="stepIpt" type="number" value={step} onChange={e=>setStep(e.target.value)}/>
                <button id="incrementBtn" onClick={e=>increment(step)}>Increment by {step}</button>
                <button id="decrementBtn" onClick={e=>decrement(step)}>Decrement by {step}</button>
            </>
        )
    }
  render(<WrapperComponent />);
  const stepIpt = document.getElementById('stepIpt')
  const incrementBtn = document.getElementById('incrementBtn')
  const decrementBtn = document.getElementById('decrementBtn')
  const resultNode = document.getElementById('result')

  expect(stepIpt).toBeInTheDocument();
  expect(incrementBtn).toBeInTheDocument();
  expect(decrementBtn).toBeInTheDocument();
  expect(resultNode).toBeInTheDocument();

  fireEvent.click(incrementBtn);
  expect(resultNode.textContent).toBe('1')

  fireEvent.click(decrementBtn);
  expect(resultNode.textContent).toBe('0')

  fireEvent.change(stepIpt,{target:{value:'3'}})
  fireEvent.click(incrementBtn);
  expect(resultNode.textContent).toBe('3')
});

