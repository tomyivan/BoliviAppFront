import { useRouteError } from 'react-router-dom';
import { Link } from 'react-router-dom';
// import errorPage from "/errorPage.jpg";
interface RouteError {
  status?: number;
  statusText?: string;
  message?: string;
}

export const ErrorPage = () => {
  const error = useRouteError() as RouteError; // Asegurarse de que el error es del tipo esperado

  return (
    <div className="flex justify-center flex-col items-center" style={{ height: '100vh' }}>
        {/* <img src={''} alt="Error" height={'60%'}/> */}
        <h1>Oops!</h1>
        <p>{error.status || 'Código de error no disponible'}</p>
        <p>Ocurrió un error, intenta más tarde.</p>
        <p>
            <i>{error.statusText || error.message || 'Mensaje de error no disponible'}</i>
        </p>
        <Link to="/" className='font-semibold text-blue-600 hover:opacity-70'>Volver al inicio</Link>
    </div>
  );
};

