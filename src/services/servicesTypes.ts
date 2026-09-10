import { ImageCoord, GeoCoord } from "src/types";


export type CartesianCoord = [number, number, number];

export type FlatImageGeo = {pix:[number,number][], geo: GeoCoord[]}

export type FlatImageCart = {pix:[number,number][], cart: CartesianCoord[]}

