import { FormPresident } from "../../modules";
import { useNavigate } from "react-router-dom";
export const PresidentAddPage = () => {
    const navigate = useNavigate();
    return (
        <section className="flex flex-col h-full w-full px-4 pb-4 ">
            <FormPresident 
                onCancel={() => navigate('/inicio/presidentes')}
            />
        </section>
    );
}