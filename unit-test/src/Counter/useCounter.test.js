import { renderHook, act } from '@testing-library/react-hooks'
import useCounter from './useCounter';

test('useCounter', () => {
    const {result} = renderHook(()=>useCounter())
    act(()=>{
      result.current.increment(2)
    })
    expect(result.current.counter).toBe(2)
    act(()=>{
      result.current.decrement(1)
    })
    expect(result.current.counter).toBe(1)
});

