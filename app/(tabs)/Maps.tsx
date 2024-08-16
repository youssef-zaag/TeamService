import { Dimensions, StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import  { Circle, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { customMapStyle } from '@/data/map';
import data from '@/data/data.json'
import Slider from '@react-native-community/slider';
import { router } from 'expo-router';
import MapView from 'react-native-map-clustering';


export default function App() {
  const haversine = require('haversine')


  const Tunisie={
    latitude:33.892166,
    longitude:9.561555499999,
    latitudeDelta:3,
    longitudeDelta:3


  }
  const [IdCercle, setIdCercle] = useState<number[]>([]);

  const [radius, setRadius] = useState(50000); 
  const [position,SetPosition]=useState(Tunisie)
  const [Progress,SetProgress]=useState(100)
  const min=0
  const max=100
  
  const isWithinCircle = (marker :any) => {
    const distance = haversine(position, marker, { unit: 'meter' });
    return distance <= radius;
  };
  const getIdsWithinCircle = () => {
    return data.classifications.flatMap((classification) =>
      classification.homes.filter(isWithinCircle).map((item) => item.id)
    );
  };


  const handleMarkerPress = (markerId: number) => {
    // Update IdCercle with IDs of markers within the circle
    const idsWithinCircle = getIdsWithinCircle();
    setIdCercle(idsWithinCircle);
    // Navigate with marker ID
    router.push({
      pathname: '/Azerty',
      params: { id: JSON.stringify(idsWithinCircle) } 
    });
  };

 
  return (

    <View style={styles.container}>
      
      <View style={styles.slider}>
        
       <Slider
       
       style={{}}
        value={Progress}
        minimumValue={min}
        maximumValue={max}
        onValueChange={(value) => setRadius(value*5550)}
        minimumTrackTintColor="black"
        maximumTrackTintColor="#d3d3d3"
        thumbTintColor="black"
      />
      </View>
      
      <MapView 
   clusterColor='black'
      animationEnabled={false}
      style={styles.map} provider={PROVIDER_GOOGLE} 
      initialRegion={Tunisie}
      customMapStyle={customMapStyle}
  onRegionChange={(newRegion) => {
SetPosition(newRegion)    }  }
     >
      <Circle
      center={position}
      radius={radius}
        strokeColor="rgba(211, 211, 211, 1.0)" 
  fillColor="rgba(211, 211, 211, 0.3)"
      
      
      />
      {data.classifications.flatMap((classification,index) =>
          classification.homes.filter(isWithinCircle).map((item,indexH) => (
            <Marker
            
            onPress={() => handleMarkerPress(item.id)}
              key={`${index}-${indexH}`}
              coordinate={{
                latitude: item.latitude,
                longitude: item.longitude
              }}
            >
              <View style={styles.customMarker}>
              <Text style={styles.markerText}>{item.price}$</Text>
              </View>
            </Marker>
          ))
          
        )}

   

        
        
     </MapView>
    

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  slider:{
    width:'78%',
    zIndex:999999,
    position:'absolute',
    left:'50%',
    top:'50%',
    transform: [{ rotate: '-90deg' }],

  }, 
  text:{
    fontSize:20,
    marginBottom:20,
    color:'#764ABC'
  }, customMarker: {
    width: 42,
    height: 30,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'white',
    borderColor:'black',
    borderWidth:2
  },
  markerText: {
    color: 'black',
fontFamily:'mon-s',
    fontSize:11
  },
  
  
 
});


