import { useEffect, useRef } from "react";
import { BodyRightBar } from "./Body.components";
import { HeaderRightBar } from "./Header.components";
import gsap from "gsap";

interface RightBarProps {
    isOpen: boolean;
    handleHidden: () => void;
}

export const RightBar: React.FC<RightBarProps> = ({
    isOpen,
    handleHidden,
}) => {
    const overlayRef = useRef<HTMLDivElement>(null);
    const rightBarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen) {
            gsap.to(overlayRef.current, {
                opacity: 0.5,
                pointerEvents: "auto",
                duration: 0.3,
                ease: "power2.out",
            });
            gsap.to(rightBarRef.current, {
                width: "300px",
                duration: 0.3,
                ease: "power2.out",
            });
        } else {
            gsap.to(overlayRef.current, {
                opacity: 0,
                pointerEvents: "none",
                duration: 0.3,
                ease: "power2.in",
            });
            gsap.to(rightBarRef.current, {
                width: "0px",
                duration: 0.3,
                ease: "power2.in",
            });
        }
    }, [isOpen]);

    return (
        <>
            <div
                ref={overlayRef}
                onClick={handleHidden}
                className="w-screen h-screen opacity-0 bg-black/35 backdrop-blur-sm fixed"
            ></div>
            <div
                ref={rightBarRef}
                className="right-bar__container"
            >
                <HeaderRightBar />
                <BodyRightBar >
                    <div className="flex flex-col gap-2">
                        <h2 className="text-lg font-bold text-gray-700 dark:text-gray-200">Right Bar</h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400">This is the right bar content.</p>
                    </div>
                </BodyRightBar>
            </div>
        </>
    );
};