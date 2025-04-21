interface BodyRightBarProps {
    children: React.ReactNode   
}
export const BodyRightBar:React.FC<BodyRightBarProps> = ({
    children
}) => {
    return (
        <div className="py-3 ps-2 text-gray-600 dark:text-gray-200">
            { children }
        </div>
    )
}