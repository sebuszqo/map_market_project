import "./Map.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../../utils/fix-map-icon";
import { useContext, useEffect } from "react";
import { SearchContext } from "../../context/search.context";

export const Map = () => {
  const { search } = useContext(SearchContext);

  useEffect(() => {
    console.log("Make request to search for", search);
  }, [search]);

  return (
    <div className="map">
      {search ? <h1>Your search: {search}</h1> : null}
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
