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
import { useForm } from "react-hook-form";


const MapComponent = () => {

    const [markers, setMarkers] = React.useState([]);
    const [selectd, setSelected] = React.useState(null);
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

    const onSaveMarkerData = (e, d) => {
        setMarkers(current => [
            ...current, {
                lat: e.latLng.lat(),
                lng: e.latLng.lng(),
                time: new Date().getTime(),
                name: d.placeName,
                des: d.placeDescription
            }
        ]);
        $('.popup').fadeOut();
    }

    const mapRef = React.useRef();
    const onMapLoad = React.useCallback(map => {
        mapRef.current = map;
        /* eslint-disable no-console */
        console.log(map);
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

    // on marker clicked
    const onMarkerClicked = m => {
        setSelected(m);
        /* eslint-disable no-console */
        console.log(m);
    }

    //------- Start Form 
    const { register, handleSubmit, errors, reset } = useForm();
    const onSubmit = handleSubmit((data, e) => {
        /* eslint-disable no-console */
        console.log(JSON.stringify(data));
        onSaveMarkerData(createMarker, data);
        e.target.reset();
    });
    const onReset = () =>{
        $('.popup').fadeOut();
        reset();
    }
    //------- End Form 

    return (
        <>
            <div className="mapContainer">
                <div className="popup">
                    <form className="form" onSubmit={onSubmit}>
                        <div className="row">
                            <label>Place Name</label>
                            <input
                                name="placeName"
                                placeholder="place name"
                                ref={register({ required: true})}
                            />
                            {errors.placeName && errors.placeName.ref.value === '' && <p>Is required</p>}
                        </div>
                        <div className="row">
                            <label>Place Description</label>
                            <textarea
                                name="placeDescription"
                                placeholder="place Description"
                                ref={register}
                            />
                        </div>
                        <div className="footerBtn">
                            <button type="submit">Save</button>
                            <button type="reset" onClick={onReset}>Cancel</button>
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
                                onMarkerClicked(marker);
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



