
import './App.css'
import { Card } from './components/Card'
import { Props } from './state/Props'

function App() {
  const propsData = Props();
  return (
    <>
      <Card Props= {propsData}/>
    </>
  )
}

export default App
