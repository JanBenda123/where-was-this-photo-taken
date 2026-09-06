export type ImagePointId = string & {readonly __brand: unique symbol};
export type MapPointId = string & {readonly __brand: unique symbol};
export type PointLinkId = string & {readonly __brand: unique symbol};

export interface ImagePoint {
  id: ImagePointId;
  x: number;
  y: number;
}

export interface MapPoint {
  id: MapPointId;
  lat: number | null;
  lng: number | null;
  alt: number | null;
}

export interface PointLink {
  id: PointLinkId;
  imagePointId: ImagePointId;
  mapPointId: MapPointId;
}