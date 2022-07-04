import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

import icon from '../../assets/images/local-maps.png';

import './MapsAll.css';

const LocationPin = ({ showMap }) => (
  // showMap === '0' || showMap == null || showMap == '' ? (
  //   <div></div>
  // ) : (
  <div className="pin">
    <img src={icon}></img>
  </div>
  // )
)



const MapsAll = ({ content, zoomLevel, showMap }) => (
  console.log(content),
  < div className="map" >
    <div className="google-map-search">
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyBswLCO_NJ1ZPqCfxFr6aNX0pyaw1SyhvM' }}
        yesIWantToUseGoogleMapApiInternals
        defaultCenter={{ lat: -27.006857468654108, lng: -48.64765317777967 }}
        defaultZoom={zoomLevel}
      >
        {/* {content?.filter(imovel => imovel.lat != '0').map((filteredMap, index) => ( */}
        <LocationPin
          lat={content.lat}
          lng={content.lng}
        />
        {/* ))} */}
      </GoogleMapReact>
    </div>
  </div >
)

export default MapsAll;