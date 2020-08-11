import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import dropIcon from "../img/iconmonstr-drop-30-240.png";
import { mapStylesDanielsWatersheds } from "../mapStyles/mapStyles"
const mapStyles = mapStylesDanielsWatersheds;

// withGoogleMap takes a react component and returns one. We call these "Higher Order Components"
const MyMap = withGoogleMap((props) => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={13}
    defaultCenter={{ lat: 35.745629, lng: 139.613955 }}
    onClick={props.onMapClick}
    defaultOptions={{ styles: mapStyles }}
  >
    {props.markers.map((marker) => (
      <Marker
        key={marker.key}
        {...marker}
        onRightClick={() => props.onMarkerRightClick(marker)}
        clickable={true}
        icon={{
          url:dropIcon,
          scaledSize: {
            width: 30,
            height: 30,
          },
        }}
      />
    ))}
  </GoogleMap>
));

// We use object destructuring here to shorten our code
export default function Map({ locations, getLocations }) {
  const changeLength = locations.length <= 0;
  useEffect(() => {
    if (changeLength) {
      getLocations();
    }
  }, [changeLength, getLocations]);

  return (
    <MyMap
      className="test"
      containerElement={<div style={{ height: `100%` }} />}
      mapElement={<div style={{ height: `100%` }} />}
      onMapLoad={() => {}}
      onMapClick={() => {}}
      markers={locations}
      onMarkerRightClick={() => {}}
    />
  );
}

// This looks new? Can you guess what this does?
Map.propTypes = {
  getLocations: PropTypes.func.isRequired,
  locations: PropTypes.array.isRequired,
};
