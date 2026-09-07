import { useState } from "react";
import {ImagePoint, ImagePointId, MapPoint, MapPointId, PointLink, PointLinkId} from "@shared/types"


import { useImageMapAligner } from "./useImageMapAligner";

import { ImageMapList } from "./ImageMapList";
import { ImageInterface } from "./ImageInterface";
import { MapInterface } from "./MapInterface";
import { ImageMapControls } from "./ImageMapControls";

export function ImageMapAligner(){
    const { state, handle } = useImageMapAligner();

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
            <ImageMapControls
                onSend={handle.send}
            
            />
        </div>
    )

}