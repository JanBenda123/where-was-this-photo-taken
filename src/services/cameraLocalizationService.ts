import {ImagePoint, ImagePointId, MapPoint, MapPointId, PointLink, PointLinkId} from "src/types"

export interface cameraLocalizationTaskPayload{
    pointLinks: PointLink[];
    imagePoints: ImagePoint[];
    mapPoints: MapPoint[];
    imageResolution:ImagePoint[];
}

export interface cameraLocalizationTaskResult{
    cameraLocation: MapPoint;
}

export function cameraLocalizationService(){

    const execute = async (payload: cameraLocalizationTaskPayload): Promise<cameraLocalizationTaskResult>=>{

        await new Promise((resolve) => setTimeout(resolve, 1000));

        return {cameraLocation:{id:"a" as MapPointId, lat: 0, lng:0, alt:0}};
    }

    return (execute);
}