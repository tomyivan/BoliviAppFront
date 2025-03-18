import React from "react"
import { FaEdit, FaFacebook, FaGoogle } from "react-icons/fa"
interface OptionsSingUpProps {
    handleOptionSingUp: (option:number) => void

}
export const OptionsSingUp:React.FC<OptionsSingUpProps> = ({
    handleOptionSingUp
}) => {
    return (
        <div className="flex flex-col justify-center items-center h-full ">
            <p className="text-gray-700 font-bold text-3xl">Registrate</p>            
            <section className="flex flex-col p-4 gap-4 font-bold text-gray-700 w-2/3">
                <div 
                    onClick={() => handleOptionSingUp(2)}
                className="flex items-center gap-2 transition-transform duration-300 ease-in-out transform hover:scale-105 bg-gray-600 p-3 rounded-full text-gray-100 cursor-pointer">
                    <FaEdit size={20} />
                    Registro Manual</div>
                <hr/>
                <div className="flex items-center gap-2 transition-transform duration-300 ease-in-out transform hover:scale-105 bg-red-600 p-3 rounded-full text-gray-100 cursor-pointer">
                    <FaGoogle size={20} />
                    Google
                </div>
                {/* <div className="flex items-center gap-2 transition-transform duration-300 ease-in-out transform hover:scale-105 bg-blue-600 p-3 rounded-full text-gray-100 cursor-pointer">	
                    <FaFacebook size={20} />
                    Facebook</div>              */}
            </section>  
            <p className="text-gray-700 font-bold">¿Ya tienes cuenta? <span className="text-blue-700 cursor-pointer" onClick={() => handleOptionSingUp(0)}>Ingresar</span></p> 
        </div>
    )
}