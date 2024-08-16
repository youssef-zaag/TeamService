import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { useLocalSearchParams } from 'expo-router';
import data from '@/data/data.json'
import ParallaxScrollView from './aaa';
import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { customMapStyle } from '@/data/map';
const HM = () => {
  const { id } = useLocalSearchParams<{ id: string}>();
  const item = data.classifications.flatMap(c => c.homes).find(home => home.id.toString()===id);
 const text=useRef<Text>(null)
 const [expanded, setExpanded] = useState(false)
 
 const getDescription = () => {
  if (!item?.description) return '';
  const words = item.description.split(' ');
  if (words.length <= 50 || expanded) {
    return item.description;
  }
  return words.slice(0, 20).join(' ') 
}
  return (
<>  
    <ParallaxScrollView backgroundColor={'black'} parallaxHeaderHeight={450}  
    renderBackground={
      ()=>
       <Image source={{ uri: item?.image }} style={styles.image}/>
    }
    stickyHeaderHeight={115}
    contentContainerStyle={{}}
    renderStickyHeader={()=>(
      <View style={{height:140,justifyContent:'center',alignItems:'center'}}
       >
        <Text  style={{color:'white',fontSize:26,fontFamily:'mon-s'}} >Take it now</Text>
      </View>
    )}
   
    >
      <View style={{backgroundColor:'white',borderTopStartRadius:38,borderTopEndRadius:38,top:'-10%',padding:30,flex:1}}>
        <View style={styles.title}>
<Text style={{fontSize:35, fontFamily:'mon'}}>{item?.name}</Text>
        </View>
        <Text  style={{fontSize:16,fontFamily:'mon',marginTop:12}}>📍{item?.location}</Text>
        <View style={{flex:1,marginTop:10}} >
        <Text ref={text} style={{fontSize:13,fontFamily:'mon',marginTop:10,color:'grey',    lineHeight: 22,
}}>{getDescription()}   {item?.description && item.description.split(' ').length > 50 && (
  <TouchableOpacity onPress={() => setExpanded(!expanded)} style={{}} >
    <Text style={{fontFamily:'mon-s',fontSize:11}} >{expanded ? 'Read less' : 'Read more ...'}</Text>
  </TouchableOpacity>
)}</Text>
      

        </View>
        <ScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{height:90}} horizontal style={{height:100,marginTop:30,width:350+4}}>
<View style={styles.equipment}>
<Ionicons name="bed-outline" size={28} color="black" />
  <Text style={styles.EquipT}>{item?.bedrooms} Bedroom(s)</Text>
  </View>   
  <View style={styles.equipment}>
  <MaterialCommunityIcons name="bathtub-outline" size={28} color="black" />
    <Text style={styles.EquipT}>{item?.bathrooms} Bathroom(s)</Text>
  </View>     


  { item?.parking===true &&<View style={styles.equipment}>
  <Ionicons name="car-sport-outline" size={28} color="black" />
    <Text style={styles.EquipT}> Place Parking</Text>
    
  </View>  }
  { item?.wifi===true &&<View style={styles.equipment}>
  <Ionicons name="wifi-outline" size={28} color="black" />
    <Text style={styles.EquipT}>Wifi Available</Text>
    
  </View>  }
  { item?.pool===true &&<View style={styles.equipment}>
  <FontAwesome5 name="swimming-pool" size={24} color="black" />
      <Text style={styles.EquipT}>Pool Available</Text>
    
  </View>  }

 
    </ScrollView>    
    <View style={{backgroundColor:'grey',height:250,marginTop:25,borderRadius:30}}>
      <MapView style={styles.map} provider={PROVIDER_GOOGLE} 
            customMapStyle={customMapStyle}

      initialRegion={{
    longitude: parseFloat(item?.longitude?.toString() || '0'),
    latitude: parseFloat(item?.latitude?.toString() || '0'),
    latitudeDelta: parseFloat(item?.latitudeDelta?.toString() || '0.0922'),
    longitudeDelta: parseFloat(item?.longitudeDelta?.toString() || '0.0421'),
  }}  >
  <Marker coordinate={{
    latitude: parseFloat(item?.latitude?.toString() || '0'),
    longitude: parseFloat(item?.longitude?.toString() || '0'),


  } } />
  </MapView>

    </View>

    </View>
   
    
  

</ParallaxScrollView>
<View style={styles.bottom}>
  <View style={styles.bottomT}>
    <View style={{height:'100%',backgroundColor:'white',width:'45%',justifyContent:'center',paddingHorizontal:2}}>
    <Text style={{fontSize:22,fontFamily:'mon'}}>${item?.price}.53k</Text>
    <Text style={{fontSize:10,fontFamily:'mon-s',color:'#9F9AA1'  }}>Per month with tax</Text>
    </View>
    <TouchableOpacity style={styles.TouchB}><Text style={{fontSize:18,fontFamily:'mon',color:'white'}}>Book Now</Text></TouchableOpacity>
  </View>
</View>
    </>
  )
}

export default HM

const styles = StyleSheet.create({
  image:{
    width: '100%',
   height: '100%',
     resizeMode: 'cover',
  },
  title:{
    width:'70%',
    height:100,
    justifyContent:'center'

  },
  header:{
    backgroundColor:'grey',
  },
  bottom:{
    width:'100%',
    height:'13%',
    backgroundColor:'white',
    alignItems:'center',
    justifyContent:'center',
    

  },
  bottomT:{
    height:'90%',
    width:'90%',
    alignItems:'center',
  justifyContent:'space-between',
  flexDirection:'row',
  paddingHorizontal:10

  },
  TouchB:{
    backgroundColor:'black',
    height:'70%',
    width:'55%',
    alignItems:'center',
    justifyContent:'center',
    borderRadius:30


  },
  equipment:{gap:10,flex:1,backgroundColor:'#f7f7f7',borderRadius:30,alignItems:'center',justifyContent:'space-between',width:170,margin:10,flexDirection:'row',paddingHorizontal:20}
  ,
  EquipT:{
    fontFamily:'mon-s',
    fontSize:11
  }, map: {
    width: '100%',
    height: '100%',
  
  },
})