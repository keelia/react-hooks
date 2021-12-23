import { render, screen,fireEvent } from '@testing-library/react';
import Counter from './Counter';

test('render Counter', () => {
  const {container:{firstChild:{firstChild:resultNode}}} = render(<Counter />);
  const stepIpt = screen.getByPlaceholderText(/steps/)
  const incrementBtn = screen.getByText(/Increment/)
  const decrementBtn = screen.getByText(/Decrement/)
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

