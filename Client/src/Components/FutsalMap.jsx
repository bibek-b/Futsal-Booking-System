import { MapContainer, Marker, Popup, TileLayer} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import customMarker from '../assets/uclball.png';

const position = [27.8292, 84.944];

const customIcon = new L.icon({
    iconUrl: customMarker,
    iconSize: [40, 40],
    iconAnchor: [20, 40]
})
export default function FutsalMap () {
    return (
        <div className='w-full h-110  overflow-hidden shadow-md'>
            <MapContainer
                center={position}
                zoom={17}
                scrollWheelZoom={false}
                doubleClickZoom={false}
                style={{width: "100%", height: "100%"}}
            >
            <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
            <Marker position={position} icon={customIcon}>
               <Popup>
                ArenaX Futsal <br />
                Gajuri Bazar, Dhading
               </Popup> 
            </Marker>
            </MapContainer>
           
        </div>
    );
}