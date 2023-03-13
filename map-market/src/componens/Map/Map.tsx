import "./Map.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../../utils/fix-map-icon";
import { useContext, useEffect, useState } from "react";
import { SearchContext } from "../../context/search.context";
import { SimpleAnnounceEntity } from "types";

export const Map = () => {
  const { search } = useContext(SearchContext);
  const [announcement, setAnnouncement] = useState<SimpleAnnounceEntity[]>([]);

  useEffect(() => {
    (async () => {
      const response = await fetch(
        `http://localhost:3001/announcement/search/${search}`
      );
      const announcements = await response.json();
      setAnnouncement(announcements);
      console.log(announcements);
    })();
  }, [search]);

  return (
    <div className="map">
      {search ? <h1>Your search: {search}</h1> : null}
      <MapContainer center={[50.0688456, 19.9143048]} zoom={15}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href='https://www.openstreetmap.org/opyright'>OpenStreetMap</a> & contributors"
        />
        {announcement.map((announcement) => (
          <Marker
            key={announcement.id}
            position={[announcement.latitude, announcement.longitude]}
          >
            <Popup>{announcement.id}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};
