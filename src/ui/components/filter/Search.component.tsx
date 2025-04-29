import { useEffect } from "react";

import { useSearchStore } from "../../store";
import { memo } from "react";
interface SearchProps {
    variant?: string;
    className?: string;
    placeholder?: string;    
}
export const Search:React.FC<SearchProps> = memo((
    {
        variant = 'inp-filled',
        className = '',
        placeholder = 'Buscar...',
    }
) => {
    const url = new URL(window.location.href);
    const { addSearch, eraserSearch, search} = useSearchStore(state => state);    
    const handleSearch = (e: HTMLInputElement) => {
        const search = e.value;
        addSearch(search);
        url.searchParams.set('q', search);
        window.history.replaceState(null, '', url.toString());
    }
    useEffect(() => {
        addSearch(url.searchParams.get('q') || '');
        return () => {
            eraserSearch();
        }
    }, [])
    return (
        <div className="w-full md:w-1/5 m-4">
              <input 
                type={'text'}
                className={`${variant} w-full ${ className }`}
                placeholder={placeholder}
                autoComplete="off"                
                onChange={(e) => handleSearch(e.target as HTMLInputElement)}
                value={search}
            />           
        </div>
    )
})
