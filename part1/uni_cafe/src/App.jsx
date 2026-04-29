import { useState } from "react";


const Display = ({ counter }) => {
  return (
    <div>{counter}</div>
  )
}



const App = () => {
  const [counter, setCounter] = useState(0)
  
  const increment = () => {
    setCounter(counter + 1)
  }

  const reset = () => {
    setCounter(0)
  }
  return(
<div>
  <Display counter = {counter}></Display>

  <button onClick={increment}>Increment</button>
  <button onClick={reset}>Reset</button>
  </div>
  )
}

export default App