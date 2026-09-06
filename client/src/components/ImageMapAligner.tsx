import { useState } from "react";
import {ImagePoint, ImagePointId, MapPoint, MapPointId, PointLink, PointLinkId} from "@shared/types"

import { ImageMapList } from "./ImageMapList";
import { ImageInterface } from "./ImageInterface";
import { MapInterface } from "./MapInterface";

export function ImageMapAligner(){

    const [imagePoints, setImagePoints] = useState<ImagePoint[]>([]);
    const [mapPoints, setMapPoints] = useState<MapPoint[]>([]);
    const [pointLinks, setPointLinks] = useState<PointLink[]>([]);

    const [idConuter, setIdCounter] = useState(0);
    const [focusedPointId, setFocusedPointId] = useState<PointLinkId | null>(null);

    const createPointLink = (x:number,y:number) =>{
        let newImagePoint :ImagePoint = {
            id: "ip-"+idConuter as ImagePointId, 
            x: x, 
            y: y
        };
        let newMapPoint :MapPoint = {
            id: "mp-"+idConuter as MapPointId, 
            lat: null, 
            lng: null,
            alt: null
        };
        let newPointLink :PointLink = {
            id: "pl-"+idConuter as PointLinkId, 
            imagePointId: "ip-"+idConuter as ImagePointId, 
            mapPointId: "mp-"+idConuter as MapPointId
        };

        setImagePoints(prev => [...prev, newImagePoint]);
        setMapPoints(prev => [...prev, newMapPoint]);
        setPointLinks(prev => [...prev, newPointLink]);

        setIdCounter(idConuter + 1);
        setFocusedPointId(newPointLink.id);

        return {
            pointLinkId: newPointLink.id,
            mapPointId: newMapPoint.id,
            imagePointId: newImagePoint.id
        };
    }

    const deletePointLink = (toDelete: PointLinkId) => {
        let pl : PointLink | undefined = pointLinks.find(pl => pl.id === toDelete);

        if(pl){
            if(focusedPointId === toDelete){
                setFocusedPointId(null);
            }
            setPointLinks(prev => prev.filter(l => l.id !== toDelete));
            setImagePoints(prev => prev.filter(l => l.id !== pl.imagePointId));
            setMapPoints(prev => prev.filter(l => l.id !== pl.mapPointId));
        }
        else{
            alert("Cannot delete non-existing element: "+ toDelete );
        }
    }



    const handleImageClick = (x:number, y:number)=>{
        createPointLink(x,y);
    }

    const handleMapClick = (lat:number, lng:number, alt:number | null)=>{
        if(focusedPointId == null){
            alert("Select an entry from the list on the left");
            return;
        }

        const focusedPointLink = pointLinks.find(
            (pointLink)=>pointLink.id === focusedPointId
        )

        if(focusedPointLink == undefined) {
             alert("Focused PointLink does not exist");
             return;
        }

        const focusedMapPoint = mapPoints.find(
            (mapPoint)=>mapPoint.id === focusedPointLink.mapPointId
        )

        if(focusedMapPoint == undefined) {
             alert("Focused PointLink had no MapPoint assigned");
             return;
        }

        setMapPoints((prevMapPoints) =>
            prevMapPoints.map((mp) => {
                if (mp.id === focusedPointLink.mapPointId) {
                    return {
                        ...mp,
                        lat: lat,
                        lng: lng,
                        alt: alt,
                    };
                }
                return mp;
            })
        );
    }

    const handleEntryDeleteButtonClick = (id: PointLinkId)=>{
        deletePointLink(id);
    }

    const handleEntryClick = (id: PointLinkId)=>{
        setFocusedPointId(id);
    }

    return(
        <div style={{ 
            padding: "20px", 
            border: "1px solid black",
            display: "flex",
            flexWrap: "nowrap",
            height: "80vh",     
            }}>
            <ImageMapList 
                pointLinks={pointLinks} 
                imagePoints={imagePoints}
                mapPoints={mapPoints}
                focusedPointId={focusedPointId}
                onEntryDeleteButtonClick={handleEntryDeleteButtonClick}
                onEntryClick={handleEntryClick}
            />
            <ImageInterface 
                onImageClick={handleImageClick}
            />
            <MapInterface
                onMapClick={handleMapClick}
            />

        </div>
    )

}