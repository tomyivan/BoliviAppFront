import { useLocation } from "react-router-dom"
import {  useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
export const Header = () => {
    const location = useLocation();
    const { id } = useParams<{ id: string }>();
    const [ title, setTitle ] = useState<string>('')
    const [ navigation, setNavigation ] = useState<{
        label: string,
        link?: string
    }[]>([])
    useEffect(() => {
        
        const path = location.pathname.split('/').filter((item) => item !== '');
        if( id !== undefined ) path.pop();
        const newTitle = path.length > 0 ? path[path.length - 1] : 'Inicio';
        setTitle(newTitle.charAt(0).toUpperCase() + newTitle.slice(1));
        setNavigation( path.map((item, index) => {
            return {
                label: item.charAt(0).toUpperCase() + item.slice(1),
                link: '/' + path.slice(0, index + 1).join('/')
            }
        }));
    }
    , [location.pathname]);
    return (
        <ul className="navigation-bar__container">
            <li className="text-2xl font-bold">{title}</li>
            <li>
                <ul className="flex flex-row gap-2 items-center font-semibold">
                    {
                        navigation.length === 0 ?
                            <span className="text-gray-600">Inicio</span> :  navigation.map((item, index) => (
                            <li key={index} className="flex flex-row gap-2 items-center">
                               { !(navigation.length - 1  === index )? <Link to={item.link ?? ''} className={` text-teal-700 hover:underline  transition-colors duration-300 ease-in-out`}>
                                    {item.label} /
                                </Link>:
                                    <span className="text-gray-600">
                                        {item.label}
                                    </span>
                                }
                                {/* <span className="text-teal-600"> {item.label}</span> */}
                            </li>
                        ))
                    }
                    
                </ul>
            </li>
        </ul>
    )
}