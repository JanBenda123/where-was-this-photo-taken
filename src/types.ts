export type ImagePointId = string & {readonly __brand: unique symbol};
export type MapPointId = string & {readonly __brand: unique symbol};
export type PointLinkId = string & {readonly __brand: unique symbol};


export interface ImageCoord{
  x: number;
  y: number;
}


export interface GeoCoord{
  lat: number;
  lng: number;
  alt: number;
}


type Nullable<T> = {
  [P in keyof T]: T[P] | null;
}

export interface ImagePoint extends ImageCoord{
  id: ImagePointId;
}

export interface MapPoint extends Nullable<GeoCoord> {
  id: MapPointId;
}

export interface PointLink {
  id: PointLinkId;
  imagePointId: ImagePointId;
  mapPointId: MapPointId | null;
}