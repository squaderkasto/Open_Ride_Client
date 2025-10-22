import React, { useState, useCallback, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  DirectionsRenderer,
  InfoWindow,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 18.5204,
  lng: 73.8567,
};

const LocationPicker = ({
  setPickup,
  setDrop,
  pickup,
  drop,
  setMapLoaded = () => {},
}) => {
  const [markers, setMarkers] = useState([]);
  const [directions, setDirections] = useState(null);
  const [routeInfo, setRouteInfo] = useState(null);

  const handleMapClick = useCallback(
    (event) => {
      const clickedLocation = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };

      setMarkers((prev) => {
        if (prev.length >= 2) {
          setPickup(clickedLocation);
          setDrop(null);
          setRouteInfo(null);
          return [clickedLocation];
        }

        if (prev.length === 0) {
          setPickup(clickedLocation);
        } else {
          setDrop(clickedLocation);
        }

        return [...prev, clickedLocation];
      });
    },
    [setPickup, setDrop]
  );

  useEffect(() => {
    if (pickup && drop && window.google) {
      const directionsService = new window.google.maps.DirectionsService();

      directionsService.route(
        {
          origin: pickup,
          destination: drop,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === "OK") {
            setDirections(result);

            const leg = result.routes[0].legs[0];
            setRouteInfo({
              distance: leg.distance.text,
              duration: leg.duration.text,
              position: leg.end_location,
            });
          } else {
            console.error("Directions request failed due to", status);
            setDirections(null);
            setRouteInfo(null);
          }
        }
      );
    } else {
      setDirections(null);
      setRouteInfo(null);
    }
  }, [pickup, drop]);

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
        onClick={handleMapClick}
        onLoad={() => setMapLoaded(true)}
      >
        {markers.map((pos, index) => (
          <Marker
            key={index}
            position={pos}
            label={index === 0 ? "Pickup" : "Drop"}
          />
        ))}

        {directions && <DirectionsRenderer directions={directions} />}

        {routeInfo && (
          <InfoWindow position={routeInfo.position}>
            <div>
              <strong>Distance:</strong> {routeInfo.distance} <br />
              <strong>Duration:</strong> {routeInfo.duration}
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default LocationPicker;
