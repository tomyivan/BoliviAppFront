import { useEffect, useRef } from "react";
import { Button } from "../../shared"
import { X } from "lucide-react";
import gsap from "gsap";
interface ModalProps {
    showModal: boolean;
    setShowModal: (show: boolean) => void;
    title?:string,
    children: React.ReactNode;    
}
export const Modal:React.FC<ModalProps> = ({
    showModal,
    setShowModal,
    title,
    children
}) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const closeModal = () => {
        if (modalRef.current && overlayRef.current) {
            gsap.to(modalRef.current, { opacity: 0, y: -20, duration: 0.3 });
            gsap.to(overlayRef.current, { opacity: 0, duration: 0.3, onComplete: () => setShowModal(false) });
        }
    };
    useEffect(() => {
        if (showModal && modalRef.current && overlayRef.current) {
            gsap.fromTo(
                modalRef.current,
                { opacity: 0, y: -20 },
                { opacity: 1, y: 0, duration: 0.3 }
            );
            gsap.fromTo(
                overlayRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 0.3 }
            );
        }
    }, [showModal]);
    return ( showModal && (
        <>
            <div
                ref={overlayRef}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                onClick={closeModal}
                aria-hidden="true"
            ></div>
            <div
                ref={modalRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
                className="fixed inset-0 flex items-center justify-center z-50 "
            >
                <div className="bg-gray-100 rounded-lg shadow-lg p-6 w-auto">
                    <div className="flex justify-between items-center mb-4 border-b border-gray-400 pb-2">
                        <h2
                            id="modal-title"
                            className="text-lg font-semibold text-gray-700"
                        >
                            { title }
                        </h2>
                        <Button
                            size="btn-sm"
                            onClick={closeModal}
                            fullRounded
                            aria-label="Close Modal"
                        >
                            <X size={20} />
                        </Button>
                    </div>
                    <div className="text-gray-600" role="modal-body">
                        { children }
                    </div>
                </div>
            </div>
        </>
    ))
}