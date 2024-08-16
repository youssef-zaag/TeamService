import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity, Animated } from 'react-native';
import React, { useEffect, useRef } from 'react';
import data from '@/data/data.json';
import { MaterialIcons } from '@expo/vector-icons'
import { Link, router, useNavigation, useRouter } from 'expo-router';


interface Props {
  filt: string; 
}
interface Home {
  id:number
  image: string
  price: string
  name: string
  location: string
  description: string
  bedrooms:number,
  bathrooms:number ,
   parking: boolean,
   wifi: boolean,
   pool: boolean
}

const Item: React.FC<Props> = ({ filt }) => {
  const router = useRouter();
  const H = data.classifications.filter(
    classification => classification.name === filt
  );
  const scrollX = useRef(new Animated.Value(0)).current;



  return (
    <View>
      {H.map((classification, index) => (
        <View key={index}>
          <Animated.FlatList
            style={styles.flat}
            contentContainerStyle={{}}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={classification.homes}
            onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
              useNativeDriver: true
            })}
            keyExtractor={(item :Home, index:number) => item.id.toFixed()} // Ensure unique keys
            renderItem={({ item, index }) => {
              if(index>3){
                index=index*1.15
              }
              const inputRange = [
                (index - 1) * 250,
                index * 250,
                (index + 1) * 250
              ];
              const translateX = scrollX.interpolate({
                inputRange,
                outputRange: [-20 * 0.7, 0, 20 * 0.7]
              });

              return (
                <View style={styles.home}>
                  
                  <Animated.Image source={{ uri: item.image }} style={[styles.image,{
                    
                    transform: [{
                        translateX
                      }]
                    
                  }]} />
                  <View style={{ flexDirection: 'row', position: "absolute", justifyContent: 'space-between', alignItems: 'center', width: "100%", height: '25%', bottom: 5 }}>
                  <Link href={`/affairs/${item.id}`} asChild>
                  <TouchableOpacity   style={{ backgroundColor: 'white', width: '55%', height: '65%', marginLeft: 25, borderRadius: 30, alignItems: 'center', justifyContent: 'center' }}>
                      <Text style={{ fontSize: 13, fontFamily: 'mon-s' }}>View Home</Text>
                    </TouchableOpacity>
                    </Link>

                    <TouchableOpacity style={{ backgroundColor: 'white', width: '20%', height: '65%', marginRight: 25, borderRadius: 2000, alignItems: 'center', justifyContent: 'center' }}>
                      <MaterialIcons name="favorite-border" size={24} color="black" />
                    
                    </TouchableOpacity>

                  </View>

                  <View style={{ position: "absolute", width: '100%', height: "40%", top: 0, right: 10, alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
                    <View style={{ width: '65%', height: "100%", justifyContent: 'center', left: 25 }}>
                      <Animated.Text style={{ fontFamily: 'mon', fontSize: 24, color: 'white' }}>{item.name}</Animated.Text>
                    </View>
                    <Animated.Text style={{ fontFamily: 'mon', fontSize: 24, color: 'white' }}> ${item.price}</Animated.Text>
                  </View>
                </View>
              );
            }}
          />
        </View>
      ))}
    </View>
  );
};

export default Item;

const styles = StyleSheet.create({
  home: {
    marginHorizontal: 20,
    marginVertical: 10,
    width: 250,
    borderRadius: 25,
  },
  flat: {
    height: '100%',
  },
  image:{
    width: '100%',
                    height: '100%',
                    alignSelf: 'center',
                    resizeMode: 'cover',
                    top: 0,
                    borderRadius: 25,
  }
});
