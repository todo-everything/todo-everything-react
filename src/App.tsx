import { useState } from 'react'
import { AppProvider } from '~/providers/app'
import { AppRoutes } from '~/routes'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  )
}

export default App
