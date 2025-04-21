export interface SideBarList {
    icon: React.ReactNode;
    title: string;    
    subItems?: SideBarList[];
    drowpdown?: () => void;
    link?: string;
    query?: string;
}
