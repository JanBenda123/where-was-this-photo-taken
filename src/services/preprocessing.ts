import {GeoCoord, ImageCoord, ImagePoint, ImagePointId, MapPoint, MapPointId, PointLink, PointLinkId} from "src/types"


type FlatImageGeo = {pix:ImageCoord, geo: GeoCoord}[]

type CartesianCoord = [number, number, number];

export function preprocessing(){
    /**
     * Flattens PointLink datastructure into an array.
     * @param pointLinks
     * @param imagePoints 
     * @param mapPoints
     * @returns Flattened array
     */
    const flatten = (pointLinks: PointLink[], imagePoints: ImagePoint[], mapPoints: MapPoint[])
     :FlatImageGeo=>{
         
        return pointLinks.map((pl)=>{
            const ip = imagePoints.find((ip) => ip.id === pl.imagePointId);
            const mp = mapPoints.find((mp) => mp.id === pl.mapPointId);
            if(ip==undefined || mp == undefined) {
                throw new Error("Error: invalid datastructure recieved")
            }
            if (mp.lat==null|| mp.lng == null || mp.alt == null){
                throw new Error("Error: unassigned map point recieved")
            }
            return {
                pix: {
                    x: ip.x,
                    y: ip.y,
                },
                geo: {
                    lat: mp.lat, 
                    lng: mp.lng,
                    alt: mp.alt,
                },
            };
        });
    }

    /**
     * Converts geographic coordinate to local cartesian coordinate using linear approximation of WGS 84 Earth model in referece point
     * @param geo geographic coordinate to be converted to Cartesian coordinetes
     * @param refGeo reference geographic coordinate to build linear approxiamtion about
     * @returns cartesian coordinates of provided geographic coordinate
     */
    const geoToCartesian = (geo: GeoCoord, refGeo:GeoCoord): CartesianCoord =>{
        const dLat = (geo.lat - refGeo.lat) * Math.PI / 180;
        const dLng = (geo.lng - refGeo.lng) * Math.PI / 180;
        const dAlt = (geo.alt - refGeo.alt);

        const a = 6378137                   // Equatorial diameter of Earth
        const e_squared = 0.00669437999014; // Earth excentricity

        const M = (1 - e_squared * Math.sin(Math.PI / 180 * refGeo.lat)) ** 1/2;
        const jacobiLng = (a / M + refGeo.alt) * Math.cos(Math.PI / 180 * refGeo.lat);
        const jacobiLat = a  * (1-e_squared) / (M ** 3)  + refGeo.alt
        
        return [jacobiLng * dLng, jacobiLat * dLat, dAlt]
    }




}