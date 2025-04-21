import { useEffect, useState } from "react";
import { SideBarList } from "../../../domain";
import { useNavigate, useLocation } from "react-router-dom";
interface BodySidebarProps {
    isCollapsed: boolean;
    list: SideBarList[];
}
export const BodySidebar:React.FC<BodySidebarProps> = ({
    isCollapsed, list
}) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState<string>('');
    const navigate = useNavigate();
    const location = useLocation();
    const toggleDropdown = (title:string) => {
        if (isDropdownOpen === title) {
            setIsDropdownOpen('');
            return;
        }
        setIsDropdownOpen(title);
    };
    useEffect(() => {        
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            const isInsideSubGroup = target.closest('[role="sub-group"]');            
            if (!isInsideSubGroup) {
                setIsDropdownOpen("");
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);
    return (
        <ul
            role="body"
            className={`sidebar__body ${ isCollapsed ? 'overflow-hidden':'overflow-y-auto'} `}
        >
            {
                list.map((item) => (
                    <li key={item.title} className="flex flex-col">
                        <div
                            className={`sidebar__body-item ${ location.pathname === item.link && `sidebar__item-active` } ${isCollapsed && 'justify-center'}`}
                            onClick={item.subItems? () => toggleDropdown(item.title) : 
                                item.link? () => navigate(`${item.link}${item.query ?? ''}`) : undefined
                            }
                            role={item.subItems ? 'sub-group' : 'item'}
                            
                        >
                            <div role="icon">
                                {item.icon}
                            </div>
                            <span className={`${isCollapsed ? 'hidden' : 'block'}`}>{item.title}</span>
                        </div>
                
                        {item.subItems && item.subItems.length > 0 && (
                            <ul

                                className={`sidebar__body__subitem-container ${ isCollapsed? 'p-2':'ps-8' }
                                    ${
                                        isCollapsed
                                        ? isDropdownOpen === item.title
                                            ? "sidebar__subgroups-collapse"
                                            : "hidden"
                                        : isDropdownOpen === item.title
                                        ? "max-h-[200px]"
                                        : "max-h-0"
                                    }
                                `}

                                id={item.title}
                                role="sub-group"
                            >
                                {item.subItems.map((subItem, subIndex) => (
                                    <li key={subItem.title + subIndex} className="sidebar__body__subitem"
                                        onClick={ () => {
                                            if (subItem.link) {
                                                navigate(`${subItem.link}${item.query ?? ''}`);
                                            }
                                            setIsDropdownOpen('');
                                        }}
                                    >
                                        <div role="icon">{subItem.icon}</div>
                                        <span>{subItem.title}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))
            }

        </ul>
    );
};