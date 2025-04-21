import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
interface ButtonProps {
    variant?: "btn-primary" | "btn-secondary" | "btn-info" | "btn-success" | "btn-warning" | "btn-danger" | "btn-light" | "btn-dark" | "btn-outline-primary" | "btn-outline-secondary" | "btn-outline-info" | "btn-outline-success" | "btn-outline-warning" | "btn-outline-danger" | "btn-outline-light" | "btn-outline-dark";
    size?: "btn-sm" | "btn-md" | "btn-lg";
    disabled?: boolean;
    children?: React.ReactNode;
    widthFull?: boolean;
    icon?: React.ReactNode;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    fullRounded?: boolean;
    title?: string;
}
export const Button: React.FC<ButtonProps> = ({
    variant,
    size = "medium",
    disabled = false,
    children = '',
    widthFull = false,
    icon,
    onClick,
    type = "button",
    fullRounded = false,
    title,
}) => {
    gsap.registerPlugin(useGSAP);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const { contextSafe } = useGSAP({ scope: buttonRef });
    const handleClick = contextSafe((e: React.MouseEvent) => {
        const button = buttonRef.current;
        if (!button) return;
        const ripple = document.createElement("span");
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        Object.assign(ripple.style, {
            position: "absolute",
            width: `${size}px`,
            height: `${size}px`,
            left: `${x}px`,
            top: `${y}px`,
            background: "rgba(255, 255, 255, 0.5)",
            borderRadius: "9999px",
            pointerEvents: "none",
            transform: "scale(0)",
            opacity: "1",
            zIndex: "0",
        });
        button.appendChild(ripple);
        gsap.to(ripple, {
            scale: 2.5,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
            onComplete: () => ripple.remove(),
        });
        onClick?.();
    });

    return (
        <button
            ref={buttonRef}
            onClick={handleClick}
            className={`btn ${widthFull && 'w-full'} ${variant} ${size} ${disabled ? "btn-disabled" : "cursor-pointer"} ${fullRounded ? `rounded-full` :`rounded`} `}
            disabled={disabled}
            type={type}
            title={ title }
        >
            { icon ? 
                <span className="flex flex-row gap-2 items-center">
                    { icon }
                    { children }
                </span>
            : children }
        </button>
    );
};
