import { useState, ChangeEvent, MouseEvent } from "react";

interface ImageInterfaceProps {
    onImageClick: (x: number, y: number) => void;
}

export function ImageInterface(props: ImageInterfaceProps) {
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setImageUrl(url);
        }
    };

    const handleImageClick = (event: MouseEvent<HTMLImageElement>) => {
        const img = event.currentTarget;
        
        const rect = img.getBoundingClientRect();

        const displayedX = event.clientX - rect.left;
        const displayedY = event.clientY - rect.top;

        const scaleX = img.naturalWidth / rect.width;
        const scaleY = img.naturalHeight / rect.height;

        const pixelX = Math.round(displayedX * scaleX);
        const pixelY = Math.round(displayedY * scaleY);

        props.onImageClick(pixelX, pixelY);
    };

    return (
        <div style={{ 
            padding: "20px", 
            border: "1px solid black",
            flex: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxSizing: "border-box",
            height: "100%",    
            minHeight: 0,      
            overflow: "hidden"

        }}>
            {!imageUrl ? (
                <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageChange} 
                />
            ) : (
                <div>
                    <img 
                        src={imageUrl} 
                        style={{ 
                        width: "auto",
                        height: "auto",
                        maxHeight: "100%",
                        maxWidth: "100%",
                        objectFit: "contain", 
                        cursor: "crosshair" }} 
                        onClick={handleImageClick}
                        alt="Target"
                    />
                </div>
            )}
        </div>
    );
}