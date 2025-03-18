import { toast } from "react-toastify";
import { FormLogin, FormSingUp, OptionsSingUp } from "../../modules"
import { useState, useEffect } from "react";
export const AuthPage = () => {
    const [ singUp, setSingUp ] = useState<Number>(0);
    const [ token, setToken ] = useState<string | null>(null);
    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            if (event.origin !== import.meta.env.VITE_BASEURL) return; // Asegura que el mensaje venga del backend
            event.data.token !== 'undefined'? toast.success(event.data.msg || "Bienvenido") :toast.error(event.data.msg || "Error en la autenticación");              
                      
            localStorage.setItem("token", event.data.token);
            localStorage.setItem("msg", event.data.msg);        
        };
        window.addEventListener("message", handleMessage);
        return () => window.removeEventListener("message", handleMessage);
      }, []);

  

      const handleSingGoogle = () => {
        const authWindow = window.open(
        `${import.meta.env.VITE_BASEURL}/api/v1/p/auth/redirect/google`,
          "GoogleAuth",
          "width=600,height=700"
        );
      };
    // const handleSingGoogle = () =>{
    //     const width = 600;
    //     const height = 700;
    //     const left = window.innerWidth / 2 - width / 2;
    //     const top = window.innerHeight / 2 - height / 2;
    //     const authWindow = window.open(
    //         `${import.meta.env.VITE_BASEURL}/api/v1/p/auth/redirect/google`, // URL del backend para autenticación con Google
    //         "GoogleAuth",
    //         `width=${width},height=${height},top=${top},left=${left}`
    //       );
        
    //       const checkWindow = setInterval(() => {
            
    //         if (!authWindow || authWindow.closed) {
    //           clearInterval(checkWindow);
    //           // Revisar si el token se guardó en localStorage
    //           const token = localStorage.getItem("token");
    //           if (token) {
    //             console.log("Autenticación exitosa:", token);
    //           } else {
    //             console.log("Autenticación fallida o cancelada.");
    //           }
    //         }
    //       }, 1000);
    //     // window.location.href = `${import.meta.env.VITE_BASEURL}/api/v1/p/auth/redirect/google`;
    // }
    return (
        <div className="bg-gray-100">
            <div className="flex justify-center items-center w-[100%] h-[100vh]">
                <div className="flex justify-center items-center ">                                     
                        <div className="flex flex-col md:flex-row w-[350px] md:w-[950px] h-[600px] bg-white rounded-lg shadow-xl">
                            <div className="md:w-1/2 md:h-full h-1/4 bg-center bg-cover bg-no-repeat relative rounded-l-lg" style={{
                                backgroundImage: `url(./TAPA.webp)`,
                                // background: `red`
                            }}>  
                                {/* <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 " >
                                    <p className="text-gray-700 text-5xl font-bold text-center">
                                        BoliviApp</p>
                                </div> */}
                            </div>
                            <div className="md:w-1/2 w-full relative h-full">
                               { singUp === 0? <FormLogin 
                                    handleSingGoogle={handleSingGoogle}
                                    handleOptionSingUp={() => setSingUp(1)}
                                />:
                                    singUp === 1? <OptionsSingUp
                                        handleOptionSingUp={(option:number) => setSingUp(option)}
                                    /> : 
                                    singUp === 2? 
                                        <FormSingUp
                                            handleOptionSingUp={() => setSingUp(0)}
                                        />
                                    : null
                                }
                            </div>
                        </div>
                </div>
            </div>
        </div>
    )
};