import {GeoCoord, ImagePoint, MapPoint, MapPointId, PointLink} from "src/types"
import { flatten } from "./preprocessing";
import { FlatImageGeo } from "./servicesTypes";
import { GeoCartConvertor } from "./geoCartConvertor";

export interface cameraLocalizationTaskPayload{
    pointLinks: PointLink[];
    imagePoints: ImagePoint[];
    mapPoints: MapPoint[];
    imageResolution:ImagePoint[];
}

export interface cameraLocalizationTaskResult{
    cameraLocation: MapPoint;
}



export async function execute (args: cameraLocalizationTaskPayload): Promise<cameraLocalizationTaskResult>{

    const flattenedArgs :FlatImageGeo = flatten(args.pointLinks, args.imagePoints, args.mapPoints);

    const refGeo : GeoCoord = flattenedArgs.geo[0]; // TEMPORARY - later replace with average
    
    const converter = new GeoCartConvertor(refGeo);
    
    
    
    // TEMPORARY
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return {cameraLocation:{id:"a" as MapPointId, lat: 0, lng:0, alt:0}};
}


