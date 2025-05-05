import { useRef, useState } from "react";
import { Button } from "../../shared";
import { useAddPresident } from "../../hooks";
interface EventUploadImgProps {
    idPresident: number;
    loadEventImage?: () => void;
}
export const PresidentUploadImg: React.FC<EventUploadImgProps> = ({
    idPresident,
    loadEventImage
}) => {
    const { addPresidentImage } = useAddPresident();
    const [images, setImages] = useState<File[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);
    const dropRef = useRef<HTMLDivElement>(null);

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const files = Array.from(event.dataTransfer.files).filter(file =>
            file.type.startsWith("image/")
        );
        setImages(prev => [...prev, ...files]);
    };
    const successUpload = (uploadedImage: File) => {
        setImages(prev => prev.filter(image => image !== uploadedImage));
        if (loadEventImage) {
            loadEventImage();
        }
    }
    const handleUpload = async () => {
        images.forEach(image => {
            addPresidentImage(idPresident, image, () => successUpload(image));
        });
    };
    return (
        <div className="flex flex-col w-full px-4 gap-4">            
            <div
                onDrop={handleDrop}
                onDragOver={e => e.preventDefault()}
                className="border-2 border-dashed border-gray-400 rounded-lg p-4 flex justify-center items-center h-64 text-gray-600 cursor-pointer "
                onClick={(event) => {
                    if (!dropRef.current?.contains(event.target as Node)) {
                        inputRef.current?.click();
                    }
                }}
            >
                {
                    images.length === 0 ? (
                        <p>Arrastra tus imágenes aquí o haz clic para seleccionar</p>
                    ) : (
                        <div className="flex gap-2">
                            {images.map((image, index) => (
                                <div key={index} className="relative border rounded overflow-hidden">
                                    <span
                                        ref={dropRef}
                                        onClick={() => setImages(prev => prev.filter((_, i) => i !== index))}
                                        className="absolute top-0 right-0 shadow-2xl bg-gray-900 text-gray-200 w-full h-6 flex items-center justify-center cursor-pointer"
                                    >
                                        Quitar
                                    </span>
                                    <img
                                        src={URL.createObjectURL(image)}
                                        alt={`Preview ${index}`}
                                        className="w-full h-64 object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    )
                }
            </div>
            <input
                hidden
                type="file"
                multiple
                accept="image/*"
                ref={inputRef}
                onChange={e => {
                    if (e.target.files) {
                        const files = Array.from(e.target.files).filter(file =>
                            file.type.startsWith("image/")
                        );
                        setImages(prev => [...prev, ...files]);
                    }
                }}
                className="bg-blue-500 text-white py-2 px-4 rounded cursor-pointer"
            />
            <Button
                type="button"
                variant="btn-primary"
                onClick={handleUpload}
            >
                Subir
            </Button>


        </div>
    )
}