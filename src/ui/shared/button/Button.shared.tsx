import '../../../assets/css/button.css';
import { useRef } from 'react';
import React from 'react';
export interface ButtonProps {
    children: React.ReactNode;
    variant?: 'btn-primary' | 'btn-secondary' | 'btn-success' | 'btn-danger' | 'btn-warning' | 'btn-info' | 'btn-outline-primary'| 'btn-outline-secondary' | 'btn-outline-success' | 'btn-outline-danger' | 'btn-outline-warning' | 'btn-outline-info';
    onLoad?: boolean;
    type?: 'button' | 'submit' | 'reset';
    title?: string;
    size?: 'sm' | 'md' | 'lg';
    widthFull?: boolean;
    content?: 'center'| 'start' | 'end';
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Button: React.FC<ButtonProps> = ({ children, variant, onLoad = false, size = 'md', onClick, type='button', title, widthFull, content }) => {
    const btn = useRef<HTMLButtonElement | null>(null); // Proporcionar el tipo para useRef

    const handleRippleEffect = (e: React.MouseEvent<HTMLButtonElement>) => {
        const button = btn.current;
        if (button) {
            const ripple = document.createElement("span");
            ripple.classList.add("ripple");
            button.appendChild(ripple);
            const x = e.clientX - button.getBoundingClientRect().left;
            const y = e.clientY - button.getBoundingClientRect().top;
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            setTimeout(() => {
                ripple.remove();
            }, 600);
        }
    };

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        handleRippleEffect(e);
        if (onClick) {
            onClick(e);
        }
    };

    // Utilizar un objeto de clases para una mejor legibilidad
    const buttonClasses = `btn ${variant} cursor-pointer ${size === 'sm' ? 'text-sm py-1.5 px-1.5' : ''} ${onLoad ? 'cursor-not-allowed opacity-40' : ''} ${widthFull ? 'w-full' : ''} ${content === 'center' ? 'flex  justify-center' : content === 'start' ? 'flex  justify-start' : content === 'end' ? 'flex justify-end' : ''}`;
    return (
        <button
            className={buttonClasses}
            ref={btn}
            onClick={handleClick}
            disabled={onLoad}
            type={type}
            title={title}
        >
            {children}
        </button>
    );
};