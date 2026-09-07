import { useAppInterface } from "./useAppInterface";

import { ImageMapList } from "./ImageMapList";
import { ImageInterface } from "./ImageInterface";
import { MapInterface } from "./MapInterface";
import { AppInterfaceControls } from "./AppInterfaceControls";

export default function AppInterface(){
    const { state, handle } = useAppInterface();

    return(
        <div style={{ 
            padding: "20px", 
            border: "1px solid black",

            }}>
            <div style={{ 
            display: "flex",
            flexWrap: "nowrap",
            height: "80vh",     
            }}>
                <ImageMapList 
                    pointLinks={state.pointLinks} 
                    imagePoints={state.imagePoints}
                    mapPoints={state.mapPoints}
                    focusedPointId={state.focusedPointId}
                    onEntryDeleteButtonClick={handle.entryDeleteButtonClick}
                    onEntryClick={handle.entryClick}
                />
                <ImageInterface 
                    onImageClick={handle.imageClick}
                />
                <MapInterface
                    onMapClick={handle.mapClick}
                />
            </div>
            <AppInterfaceControls
                onSend={handle.send}
            />
        </div>
    )

}