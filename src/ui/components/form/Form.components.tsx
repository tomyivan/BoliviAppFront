import React, { useState } from "react"
import { Button } from "../../shared"

interface FormProps {
    children: React.ReactNode,
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void> | Promise<Boolean>,
    labelSend?: string,
    onCancel?: () => void,
}
export const Form:React.FC<FormProps> = ({children, onSubmit, labelSend = 'Enviar', onCancel }) => {
    const [isPending, setIsPending] = useState<boolean>(false);
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {        
        setIsPending(true); 
        e.preventDefault();
        await onSubmit(e);
        setIsPending(false);
    }
 
    return (
        <form onSubmit={handleSubmit} className="flex flex-col ">
            { 
                children
            }
            <div className="flex gap-2">
                <Button type="submit" size="sm" variant="btn-outline-success" widthFull
                    onLoad={isPending}
                >
                    {labelSend}
                </Button>
                { onCancel && <Button type="reset" size="sm" variant="btn-outline-danger" onClick={onCancel} widthFull>
                    Cancelar 
                </Button>}
            </div>
        </form>
    )
}