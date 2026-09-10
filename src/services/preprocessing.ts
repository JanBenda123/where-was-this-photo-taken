import { GeoCoord, ImagePoint,  MapPoint,  PointLink } from "src/types"
import { CartesianCoord, FlatImageGeo } from "./servicesTypes";


/**
 * Flattens PointLink datastructure into an array.
 * @param pointLinks
 * @param imagePoints 
 * @param mapPoints
 * @returns Flattened array
 */
export function flatten(pointLinks: PointLink[], imagePoints: ImagePoint[], mapPoints: MapPoint[])
: FlatImageGeo {
    const pix: [number, number][] = [];
    const geo: GeoCoord[] = [];

    for (const pl of pointLinks) {
        const ip = imagePoints.find((ip) => ip.id === pl.imagePointId);
        const mp = mapPoints.find((mp) => mp.id === pl.mapPointId);

        if (ip == undefined || mp == undefined) {
            throw new Error("Error: invalid datastructure received");
        }
        if (mp.lat == null || mp.lng == null || mp.alt == null) {
            throw new Error("Error: unassigned map point received");
        }

        pix.push([ip.x, ip.y]);
        geo.push({
            lat: mp.lat,
            lng: mp.lng,
            alt: mp.alt,
        });
    }

    return { pix, geo };
}
