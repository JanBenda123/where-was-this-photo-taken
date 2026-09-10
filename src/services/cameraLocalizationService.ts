import { GeoCoord, ImagePoint, MapPoint, MapPointId, PointLink, ImageCoord } from "src/types"
import { flatten } from "./preprocessing";
import { FlatImageCart, FlatImageGeo } from "./servicesTypes";
import { GeoCartConvertor } from "./converters/geoCartConvertor";
import { RefPointChoosingStrategy } from "./converters/refPointChoosingStrategy";
import { LocalizationModel } from "./solver/localizationModel";
import { LocalizationTrainer } from "./solver/localizationTrainer";


export interface cameraLocalizationTaskPayload{
    pointLinks: PointLink[];
    imagePoints: ImagePoint[];
    mapPoints: MapPoint[];
    imageResolution:ImageCoord;
}

export interface cameraLocalizationTaskResult{
    cameraLocation: MapPoint;
}


export async function execute (args: cameraLocalizationTaskPayload): Promise<cameraLocalizationTaskResult>{

    const flattenedArgs : FlatImageGeo = flatten(args.pointLinks, args.imagePoints, args.mapPoints);

    const refGeo : GeoCoord = RefPointChoosingStrategy.pickFirst(flattenedArgs.geo);
    
    const converter = new GeoCartConvertor(refGeo);

    const flattenedConverted : FlatImageCart = {
        pix: flattenedArgs.pix,
        cart: flattenedArgs.geo.map(converter.geoToCart) // converts everything to local cartesian
    }


    const model = new LocalizationModel(args.imageResolution);
    const trainer = new LocalizationTrainer(model,flattenedConverted);

    trainer.train();

    console.log(model.getParams());

    trainer.dispose();

    

    
    
    
    // TEMPORARY
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return {cameraLocation:{id:"a" as MapPointId, lat: 0, lng:0, alt:0}};
}


