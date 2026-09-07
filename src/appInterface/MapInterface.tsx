import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";

interface MapInterfaceProps {
    onMapClick: (lat: number, lng: number, alt: number | null) => void;
}

interface ClickHandlerProps {
    onLocationSelect: (lat: number, lng: number, alt: number | null) => void;
}

function MapClickHandler({ onLocationSelect }: ClickHandlerProps) {
    useMapEvents({
        click: async (e) => {
            const lat = e.latlng.lat;
            const lng = e.latlng.lng;
            let alt: number | null = null;

            try {
             
                const response = await fetch(
                    `https://api.open-elevation.com/api/v1/lookup?locations=${lat},${lng}`
                );
                if (response.ok) {
                    const data = await response.json();
                    alt = data.results[0]?.elevation ?? null;
                }
            } catch (err) {
                console.error("Fetch elevation error:", err);
            }

            onLocationSelect(lat, lng, alt);
        },
    });
    return null;
}

export function MapInterface(props: MapInterfaceProps) {
    return (
        <div style={{ padding: "20px", border: "1px solid black", flex: 2, minHeight: "400px" }}>
            <MapContainer
                center={[50.0755, 14.4378]}
                zoom={13}
                style={{ height: "100%", width: "100%", minHeight: "350px" }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MapClickHandler onLocationSelect={props.onMapClick} />
            </MapContainer>
        </div>
    );
}