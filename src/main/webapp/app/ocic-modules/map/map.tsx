import React from 'react';
import { IRootState } from "app/shared/reducers";
import * as $ from 'jquery';

import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow,
    LoadScript,
    Autocomplete
} from '@react-google-maps/api';

import mapStyles from './mapStyle';

const MapComponent = () => {

    const [markers, setMarkers] = React.useState([]);
    const [selectd, setSelected] = React.useState(null);
    const [placeName, setPlaceName] = React.useState('');
    const [placeDes, setPlaceDes] = React.useState('');
    const [createMarker, setCreateMarker] = React.useState([]);


    const GOOGLE_MAP_KEY = 'AIzaSyDkbETKNDtUAZvH0-jPdFW3JBxYWnMElPk';
    const mapContainerStyle = {
        width: "100vw",
        height: "100vh"
    }
    const center = {
        lat: 27.137368,
        lng: 30.663226
    }
    const options = {
        // styles: mapStyles,
        disableDefaultUI: false,
        zoomControl: true,
        zoom: 6
    }

    const onMapClick = React.useCallback(event => {
        $('.popup').fadeIn();
        setCreateMarker(event);
    }, []);


    const onSaveMarkerData = e => {
        setMarkers(current => [
            ...current, {
                lat: e.latLng.lat(),
                lng: e.latLng.lng(),
                time: new Date().getTime(),
                name: placeName,
                des: placeDes
            }
        ]);
        $('.popup').fadeOut();
    }

    const mapRef = React.useRef();
    const onMapLoad = React.useCallback(map => {
        mapRef.current = map;
    }, []);


    // for drag and drop marker
    const onDrop = (latLng, i) => {
        /* eslint-disable no-console */
        console.log(latLng.latLng.lat(), i, markers);
        const mark = [...markers];
        const selectMark = [mark[i]];
        selectMark[0].lat = latLng.latLng.lat();
        selectMark[0].lng = latLng.latLng.lng();
        mark[i] = selectMark[0];
        setMarkers(mark);
        /* eslint-disable no-console */
        console.log(markers);
    }

    return (
        <>
            <div className="mapContainer">
                <div className="popup">
                    <form className="form">
                        <div className="row">
                            <label>Place Name</label>
                            <input
                                name="place name"
                                value={placeName}
                                onChange={e => setPlaceName(e.target.value)}
                            />
                        </div>
                        <div className="row">
                            <label>Place Description</label>
                            <textarea
                                name="place Description"
                                value={placeDes}
                                onChange={e => setPlaceDes(e.target.value)}
                            />
                        </div>
                        <div className="footerBtn">
                            <button type="button" onClick={() => onSaveMarkerData(createMarker)}>Save</button>
                            <button type="button" onClick={() => $('.popup').fadeOut()}>Cancel</button>
                        </div>
                    </form>
                </div>
                <LoadScript
                    googleMapsApiKey={GOOGLE_MAP_KEY}
                >
                    <GoogleMap
                        mapContainerStyle={mapContainerStyle}
                        onLoad={onMapLoad}
                        center={center}
                        options={options}
                        onClick={onMapClick}
                    >
                        {markers.map((marker, i) => <Marker
                            key={i}
                            position={{
                                lat: marker.lat,
                                lng: marker.lng
                            }}
                            // position={results[0].geometry.location}
                            icon={{
                                url: '../../../content/images/All.png',
                                scaledSize: new window.google.maps.Size(35, 66),
                                anchor: new window.google.maps.Point(15, 15)
                            }}
                            onClick={() => {
                                setSelected(marker);
                                /* eslint-disable no-console */
                                console.log(marker);
                            }}

                            draggable={true}
                            animation={google.maps.Animation.DROP}
                            onDragEnd={d => onDrop(d, i)}
                        />
                        )}

                        {selectd ? (<InfoWindow
                            position={{ lat: selectd.lat, lng: selectd.lng }}
                            onCloseClick={() => setSelected(null)}
                            options={{ disableAutoPan: true }}>
                            <div>
                                <h2>
                                    {selectd.name}
                                </h2>
                            </div>
                        </InfoWindow>) : null}
                    </GoogleMap>
                </LoadScript>
            </div>
        </>
    );
}

export default MapComponent;

// AIzaSyDkbETKNDtUAZvH0-jPdFW3JBxYWnMElPk



