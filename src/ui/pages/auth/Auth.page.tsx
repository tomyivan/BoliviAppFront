import { FormLogin, FormSingUp, OptionsSingUp } from "../../modules"
import { useState } from "react";
export const AuthPage = () => {
    const [ singUp, setSingUp ] = useState<Number>(0);

    return (
        <div className="bg-gray-100">
            <div className="flex justify-center items-center w-[100%] h-[100vh]">
                <div className="flex justify-center items-center ">                                     
                        <div className="flex flex-col md:flex-row w-[350px] md:w-[900px] h-[550px] bg-white rounded-lg shadow-xl">
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