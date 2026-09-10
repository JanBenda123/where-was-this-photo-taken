import { GeoCoord } from "src/types";

export class RefPointChoosingStrategy{
    static pickFirst(geoPoints: GeoCoord[]): GeoCoord{
        return geoPoints[0];
    }

    // static pickAverage(geoPoints: GeoCoord[]): GeoCoord{
    //     return
    // }

}