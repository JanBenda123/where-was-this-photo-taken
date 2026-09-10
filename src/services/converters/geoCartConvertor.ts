import { GeoCoord } from "src/types";
import { CartesianCoord } from "./servicesTypes";


export class GeoCartConvertor{
    private refGeo: GeoCoord;   // WGS 84 coordinates of the reference point
    private jacobiLng: number; 
    private jacobiLat: number;

    /**
     * Initializes the converter by pre-computing Jacobi matrix coefficients around the reference point.
     * Math model details: docs/maths.md
     * @param refGeo Reference origin point in which to linearize
     */
    constructor(refGeo: GeoCoord){
        this.refGeo = refGeo;

        const a = 6378137                   // Equatorial diameter of Earth in meters
        const e_squared = 0.00669437999014; // Earth excentricity

        const sinLat = Math.sin(Math.PI / 180 * refGeo.lat);
        const cosLat = Math.cos(Math.PI / 180 * refGeo.lat);
        const M = Math.sqrt(1 - e_squared * sinLat * sinLat);

        this.jacobiLng = (a / M + refGeo.alt) * cosLat;
        this.jacobiLat = a  * (1-e_squared) / (M ** 3)  + refGeo.alt
    }

    /**
     * Converts geographic coordinate to local cartesian coordinate
     * @param geo geographic coordinate to be converted to artesian coordinetes
     * @returns cartesian coordinates of provided geographic coordinate
     */
    public geoToCart(geo: GeoCoord): CartesianCoord {
        const dLat = (geo.lat - this.refGeo.lat) * Math.PI / 180;
        const dLng = (geo.lng - this.refGeo.lng) * Math.PI / 180;
        const dAlt = (geo.alt - this.refGeo.alt);

        return [this.jacobiLng * dLng, this.jacobiLat * dLat, dAlt]        
    }

    /**
     * Converts local cartesian coordinate to geographic coordinate
     * @param cart local cartesian coordinate to be converted to geographic coordinetes
     * @returns geographic coordinates of provided local cartesian coordinate
     */
    public cartToGeo(cart: CartesianCoord): GeoCoord {
        let dLat = cart[1] / this.jacobiLat;
        let dLng = cart[0] / this.jacobiLng;
        let dAlt = cart[2];

        dLat *= 180 / Math.PI;
        dLng *= 180 / Math.PI;

        return {
            lng: this.refGeo.lng + dLng, 
            lat: this.refGeo.lat + dLat, 
            alt: this.refGeo.alt + dAlt
        }        
    }
}