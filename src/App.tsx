import { useState } from 'react'
import './App.css'
import Habit from './components/Habit'

function App() {
  const [count, setCount] = useState(0)
  return (
    <Habit></Habit>
  )
}

export default App
