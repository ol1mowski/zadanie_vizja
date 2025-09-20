import { useState } from 'react'

const App = () => {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      
      <h1 className="text-4xl font-bold text-gray-800 mb-8">
        Vite + React 19 + TypeScript + Tailwind CSS
      </h1>
      
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <button 
          onClick={() => setCount((count) => count + 1)}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 mb-4"
        >
          Licznik: {count}
        </button>
        <p className="text-gray-600">
          Edytuj <code className="bg-gray-100 px-2 py-1 rounded text-sm">src/App.tsx</code> i zapisz, aby przetestować HMR
        </p>
      </div>
  
    </div>
  )
}

export default App
