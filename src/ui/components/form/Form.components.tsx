import React, { useState } from "react"
import { Button } from "../../shared"

interface FormProps {
    children: React.ReactNode,
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise< void > | Promise<Boolean>,
    labelSend?: string,
    onCancel?: () => void,
    title?: string
}
export const Form:React.FC<FormProps> = ({
    children,
    onSubmit,
    labelSend = 'Enviar',
    onCancel,
    title
}) => {
    const [ isPending, setIsPending ] = useState(false)
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        setIsPending(true)
        e.preventDefault()
        await onSubmit(e)
        setIsPending(false)
    }
    return (
        <form onSubmit={handleSubmit} className="flex flex-col">
                {
                    title && (
                        <h2 className="text-3xl text-gray-700 font-bold mb-4 text-center ">{title}</h2>
                    )   
                }
                {
                    children
                }
            <div className="flex flex-col md:flex-row gap-2 mt-2">
                <Button type='submit' 
                    disabled={isPending}
                    variant="btn-primary"
                    widthFull
                >
                    { labelSend }
                </Button>
                {
                    onCancel && (
                        <Button type='button' 
                            disabled={isPending}
                            variant="btn-secondary"
                            onClick={onCancel}
                            widthFull
                        >
                            Cancelar
                        </Button>
                    )
                }
            </div>
        </form>
    )
    
}