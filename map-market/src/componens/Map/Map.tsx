import "./Map.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../../utils/fix-map-icon";

export const Map = () => {
  return (
    <div className="map">
      <MapContainer center={[50.0688456, 19.9143048]} zoom={15}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href='https://www.openstreetmap.org/opyright'>OpenStreetMap</a> & contributors"
        />
        <Marker position={[50.0688456, 19.9143048]}>
          <Popup>Main view</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};
