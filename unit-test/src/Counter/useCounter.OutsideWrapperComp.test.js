import { render, screen,fireEvent } from '@testing-library/react';
import { useState } from 'react';
import { act } from 'react-dom/test-utils';
import useCounter from './useCounter';

test('useCounter', () => {
    const hookResult = {}
    const WrapperComponent = ()=>{
        const [step,setStep] = useState(1)
        Object.assign(hookResult, useCounter(),{step,setStep});
        return null
    }
  render(<WrapperComponent />);
  act(()=>{
    hookResult.increment(2)
  })
  expect(hookResult.counter).toBe(2)

  act(()=>{
    hookResult.decrement(1)
  })
  expect(hookResult.counter).toBe(1)
});

