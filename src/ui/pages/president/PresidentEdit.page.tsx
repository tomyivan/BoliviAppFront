import { useEffect, useState } from "react";
import { useGetPresident } from "../../hooks";
import { useParams } from "react-router-dom";
import { PresidentDTO } from "../../../domain";
import { FormPresident } from "../../modules";
export const PresidentEditPage = () => {
    const { getPresidentById } = useGetPresident();
    const { id } = useParams<{ id: string }>();
    const [ president, setPresident ] = useState<PresidentDTO>();
    const loadData = async () => {
        if (!id) return ;
        const response = await getPresidentById(Number(id));
        setPresident(response);
    }
    useEffect(() => {
        loadData();
    },[id]);
    return (
        <section className="flex flex-col h-full w-full px-4 pb-4">
            <FormPresident 
                data={president}
                onCancel={() => window.history.back()}
            />
        </section>
    );
}