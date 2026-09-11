import {ImagePoint, MapPoint, PointLink,PointLinkId} from "src/types"
import { ImageMapListEntry } from "src/appInterface/interfaceList/ImageMapListEntry";

interface ImageMapListProps {
    pointLinks: PointLink[];
    imagePoints: ImagePoint[];
    mapPoints: MapPoint[];
    focusedPointId: PointLinkId | null;
    onEntryDeleteButtonClick: (id: PointLinkId) => void;
    onEntryClick: (id: PointLinkId) => void;
}

export function ImageMapList(props: ImageMapListProps) {
    return (
        <div style={{ 
            padding: "20px", 
            border: "1px solid black",
            flex: 1,
            height: "100%",          
            boxSizing: "border-box",
            overflowY: "auto",    
            display: "flex",
            flexDirection: "column",
            gap: "10px"
        }}>
        {
            props.pointLinks.map((pointLink) => {
                const foundImagePoint = props.imagePoints.find(
                    (point) => point.id === pointLink.imagePointId
                );

                const foundMapPoint = props.mapPoints.find(
                    (point) => point.id === pointLink.mapPointId
                );

                if(foundImagePoint && foundMapPoint){
                    return (
                        <ImageMapListEntry 
                            pointLink = {pointLink} 
                            mapPoint = {foundMapPoint}
                            imagePoint = {foundImagePoint}
                            isFocused = {props.focusedPointId === pointLink.id} 
                            onDeleteButtonClick = {props.onEntryDeleteButtonClick}
                            onClick = {props.onEntryClick}
                        />
                    );
                };
            })
        }
        </div>
    );
}