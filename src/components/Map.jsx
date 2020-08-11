import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";
import dropIcon from "../img/iconmonstr-drop-30-240.png";
import markerHereIcon from "../img/iconmonstr-location-16-240.png";
import { mapStylesDanielsWatersheds } from "../mapStyles/mapStyles"
import { useDispatch, useSelector } from "react-redux";
import { SET_MARKER } from "../reducers/index";

const mapStyles = mapStylesDanielsWatersheds;

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  // infoWindow.setPosition(pos);
  // infoWindow.setContent(
  //   browserHasGeolocation
  //     ? "Error: The Geolocation service failed."
  //     : "Error: Your browser doesn't support geolocation."
  // );
  // infoWindow.open(map);
  console.log("Error");
}
let currentPos = { lat: 3, lng: 1 };
let markerHere = {
  defaultAnimation: 2,
  key: "Here",
  position: {lat: 35.6590242, lng: 139.7217861}
}

async function getGeolocation() {
  if (navigator.geolocation) {
    await navigator.geolocation.getCurrentPosition(
      position => {
        currentPos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        // infoWindow.setPosition(pos);
        // infoWindow.setContent("Location found.");
        // infoWindow.open(map);
        // map.setCenter(pos);
        console.log("Succeed", currentPos);
        console.log("func currentPos.lat", currentPos.lat);
        console.log("func currentPos.lng", currentPos.lng);
      },
      () => {
        handleLocationError(/*true, infoWindow, map.getCenter()*/);
      }
    );
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(/*false, infoWindow, map.getCenter()*/);
  }
  // console.log("Succeed", pos);
  // return pos;
}

// withGoogleMap takes a react component and returns one. We call these "Higher Order Components"
const MyMap = withGoogleMap((props) => {
  let pos = { lat: 35.745629, lng: 139.613955 };
//   let currentPos = getGeolocation();

  //   console.log(currentPos.lat);
  if(currentPos.lat !== undefined) {
    pos = currentPos;
    console.log("if pos.lat", pos.lat);
    console.log("if pos.lng", pos.lng);
    markerHere.position.lat = pos.lat;
    markerHere.position.lat = pos.lng;

  }
  console.log("mymap currentPos.lat", currentPos.lat);
  console.log("mymap currentPos.lng", currentPos.lng);

  console.log("props.selected",props.selected);

  return (
    <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={13}
    center={{
      lat: pos.lat,
      lng: pos.lng
      // lat: 35.745629,
      // lng: 139.613955
    }}
    onClick={props.onMapClick}
    defaultOptions={{ styles: mapStyles }}
  >
    {props.markers.map((marker) => {
      console.log(marker);
      return (
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
        onClick={() => {
          console.log("Click",marker);
          props.dispatch(SET_MARKER(marker));
        }}
      />
      );
    })}
      {props.selected ? (
        <InfoWindow
          position={{
            lat: props.selected.position.lat,
            lng: props.selected.position.lng,
          }}
          onCloseClick={() => {
            props.dispatch(SET_MARKER(null));
          }}
        >
          <div>
            {/* <h2>Name: {props.selected.key}</h2> */}
            <p>
              <b>ID:{props.selected.info.id}</b> <br />
              <b>Name:{props.selected.info.name}</b> <br />
              <b>Address:{props.selected.info.address}</b> <br />
              <br />
            </p>
            <img src={props.selected.info.url}/>
          </div>
        </InfoWindow>
      ) : null}
      <Marker
        key={"Here"}
        {...markerHere}
        onRightClick={() => props.onMarkerRightClick(markerHere)}
        icon={{
          url:markerHereIcon,
          scaledSize: {
            width: 60,
            height: 60,
          },
        }}
    />
    </GoogleMap>
  )
});

// We use object destructuring here to shorten our code
export default function Map({ locations, getLocations }) {
  const changeLength = locations.length <= 0;
  const selected = useSelector((state) => state.selectMarker);
  const dispatch = useDispatch();
  // let currentPos = { lat: 3, lng: 1 };
  useEffect(() => {
    if (changeLength) {
      getLocations();
      currentPos = getGeolocation();
      console.log("effe locations", locations);
    }
  }, [changeLength, getLocations, currentPos, getGeolocation]);
  console.log("locations", locations);

  // useEffect(() => {
  //   currentPos = getGeolocation();
  //   console.log("effe currentPos.lat", currentPos.lat);
  // }, [ currentPos, getGeolocation ]);
  console.log("map currentPos.lat", currentPos.lat);
  console.log("map currentPos.lng", currentPos.lng);

  return (
    <MyMap
      className="test"
      containerElement={<div style={{ height: `100%` }} />}
      mapElement={<div style={{ height: `100%` }} />}
      onMapLoad={() => {}}
      onMapClick={() => {}}
      selected={selected}
      dispatch={dispatch}
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
