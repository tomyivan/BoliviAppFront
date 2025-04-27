import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    useMapEvents,
    useMap,
  } from 'react-leaflet';
  import L from 'leaflet';
  import { useEffect, useState } from 'react';
  
  interface Coordinates {
    lat: number;
    lng: number;
  }
  
  const markerIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });
  
  const MapClickHandler = ({ setCoords }: { setCoords: (coords: Coordinates) => void }) => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setCoords({ lat, lng });
      },
    });
    return null;
  };
  
  const MapController = ({ coords }: { coords: Coordinates }) => {
    const map = useMap();
  
    useEffect(() => {
      if (coords) {
        map.setView(coords, 15);
      }
    }, [coords, map]);
  
    return null;
  };
  
  interface MapsProps {
    cordinates?: Coordinates | null;
    handleChange?: (coords: Coordinates) => void;
  }
  
  export const Maps: React.FC<MapsProps> = ({ cordinates, handleChange }) => {
    const [clickedCoords, setClickedCoords] = useState<Coordinates>({
      lat: -17.78629,
      lng: -63.18117,
    });
    const [ departamento, setDepartamento ] = useState<Coordinates | any>(null);
    useEffect(() => {
      if (cordinates) {
        setDepartamento(cordinates);        
        setClickedCoords(cordinates);
      }
    }, [cordinates]);
    
    return (
      <MapContainer
        zoom={13}
        scrollWheelZoom
        style={{ height: '500px', width: '100%' }}
        dragging={true}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapController coords={ departamento} />
        <MapClickHandler setCoords={
            (coords) => {
                setClickedCoords(coords);                
                if (handleChange) {
                handleChange(coords);
                }
            }
        } />
  
        <Marker position={clickedCoords} icon={markerIcon}>
          <Popup>Coordenadas seleccionadas</Popup>
        </Marker>
      </MapContainer>
    );
  };
  