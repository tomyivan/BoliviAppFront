import { SubmitHandler, useForm } from "react-hook-form";
import { Form } from "../../components"
import { InputLabel } from "../../shared"
import { VerifyForm } from "../../../domain";
export const FormVerify:React.FC = () => {
    const { control, register, formState: {errors}, handleSubmit, watch } = useForm<VerifyForm>();   
    const onSubmit:SubmitHandler<VerifyForm> = (FormData) => {
        console.log(FormData);
    }
    return (
        <Form
            onSubmit={handleSubmit(onSubmit)}
            labelSend="Verificar"
        >
            <InputLabel 
                label="Código"
                type="text"   
                name={`code`}      
                register={register}
                errors={errors}                
                options={{ required: true }}
                placeholder="Ingrese el código"
            />
        </Form>
    )
}