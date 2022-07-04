import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

// import { Icon } from '@iconify/react'
// import locationIcon from '@iconify/icons-mdi/map-marker'
import icon from './local-maps.png';

import './Map.css';

const LocationPin = ({ text }) => (
  <div className="pin">
    <img src={icon}></img>
    {/* <Icon icon={locationIcon} className="pin-icon" /> */}
    <p className="pin-text">{text}</p>
  </div>
)


// const location = {
//   lat: lat,
//   lng: lng,
//   // lat: 1,
//   // lng: 2,
// }https://sort.vps-kinghost.net/api/select/immobile/' + id


const Maps = ({ latI, lngI, zoomLevel }) => (
  console.log(latI + "    " + parseFloat(lngI)),
  < div className="map" >
    <div className="google-map">
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyBswLCO_NJ1ZPqCfxFr6aNX0pyaw1SyhvM' }}
        defaultCenter={{ lat: latI, lng: lngI }}
        defaultZoom={zoomLevel}
      >
        <LocationPin
          lat={latI}
          lng={lngI}
        />
      </GoogleMapReact>
    </div>
  </div >
)

export default Maps;