import { useState, useCallback, useMemo } from "react";
import {ImagePoint, ImagePointId, MapPoint, MapPointId, PointLink, PointLinkId} from "../types"


export function useAppInterface(){
    const [imagePoints, setImagePoints] = useState<ImagePoint[]>([]);
    const [mapPoints, setMapPoints] = useState<MapPoint[]>([]);
    const [pointLinks, setPointLinks] = useState<PointLink[]>([]);

    const [idConuter, setIdCounter] = useState(0);
    const [focusedPointId, setFocusedPointId] = useState<PointLinkId | null>(null);

    const state = {imagePoints, mapPoints, pointLinks, focusedPointId}

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

    const handleSend = () =>{
        alert("send was pressed")
    }

    const handle = useMemo(()=>({
        imageClick             : createPointLink,
        mapClick               : handleMapClick,
        entryDeleteButtonClick : deletePointLink,
        entryClick             : setFocusedPointId,
        send                   : handleSend
    }),[createPointLink,handleMapClick,deletePointLink,setFocusedPointId,handleSend])


    return {
        state,
        handle
    }
}