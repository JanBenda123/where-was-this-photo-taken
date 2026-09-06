import {ImagePoint, MapPoint, PointLink,PointLinkId} from "@shared/types"

interface ImageMapListEntryProps {
    pointLink: PointLink;
    imagePoint: ImagePoint;
    mapPoint: MapPoint;
    isFocused: boolean;
    onDeleteButtonClick: (id: PointLinkId) => void;
    onClick: (id: PointLinkId) => void;

}


export function ImageMapListEntry(props: ImageMapListEntryProps) {
    return (
        <div style={{ padding: "20px", border: !props.isFocused ? "1px solid black": "3px solid red" }}
            onClick={()=>{props.onClick(props.pointLink.id)}}
        >
            id: {props.imagePoint.id} <br />
            x: {props.imagePoint.x} y: {props.imagePoint.y} <br />
            lat: {props.mapPoint.lat} <br />
            lng: {props.mapPoint.lng}<br />
            <button onClick={() => props.onDeleteButtonClick(props.pointLink.id)}>
                Delete
            </button>

        </div>
    );
}