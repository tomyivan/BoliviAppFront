
import { router } from './ui/router/router'
import { RouterProvider } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
function App() {
  return (
    <>
      <ToastContainer 
        autoClose={2000}/>
      <RouterProvider router={router} fallbackElement={<p>Cargando...</p>} />
    </>
  )
}

export default App
