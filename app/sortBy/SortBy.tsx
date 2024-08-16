import { Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { router } from 'expo-router';
import { AntDesign, Entypo, Feather, MaterialCommunityIcons, MaterialIcons, Octicons } from '@expo/vector-icons';
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import LottieView from 'lottie-react-native';


const windowWidth = Dimensions.get('window').width;
const BUTTON_WIDTH = windowWidth / 2.5;

const SortBy = () => {
  const [index, setIndex] = useState(0);
  const translate = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: withSpring(BUTTON_WIDTH * index) }],
    };
  });
  useEffect(() => {
    console.log(index);
  }, [index]);
  const [Type, setType] = useState<String>("All");
  const [Rooms,SetRooms]=useState<number>(0)
  const [Bathroom,SetBathroom]=useState<number>(1)
  const [values, setValues] = useState([0, 800]);

  const handleValuesChange = (values:any) => {
    setValues(values);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Entypo name="chevron-left" size={40} color="black" />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Sort By</Text>
        </View>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.Anim}>
          <Animated.View style={[styles.animatedView, translate]} />
          <TouchableOpacity onPress={() => setIndex(0)} style={styles.button}>
            <Text style={[styles.ButtonText, index === 1 && { color: 'black' }]}>For Rent</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIndex(1)} style={styles.button}>
            <Text style={[styles.ButtonText, index === 0 && { color: 'black' }]}>For Sale</Text>
          </TouchableOpacity>
        </View >
        {index===0 &&(<TouchableOpacity style={{position:'absolute',top:'86%',zIndex:9999999,}}>
        <LottieView
        style={{
          width: windowWidth/4,
          height: windowWidth/4,
        }}
        autoPlay
        loop={false}
        speed={1.2}
        source={require('@/assets/lottie/done.json')}
      />
        </TouchableOpacity>)}
        {index===1 &&(<TouchableOpacity style={{position:'absolute',top:'86%',zIndex:9999999,}}>
        <LottieView
        style={{
          width: 100,
          height: 100,
        }}
        autoPlay
        loop={false}
        speed={1.2}
        source={require('@/assets/lottie/done.json')}
      />
        </TouchableOpacity>)}
      
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          {index === 0 && (
            <View style={styles.as}>
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Text style={styles.ContainerText}>Property Type</Text>
              </View>
              <View style={styles.spacedView}>
                <TouchableOpacity
                  onPress={() => setType("App")}
                  style={[styles.comp2, Type === "App" && { backgroundColor: 'black' }]}
                >
                  <MaterialIcons name="apartment" size={27} color={Type === "App" ? "white" : "black"} />
                  <Text style={[styles.comp2Text, Type === "App" && { color: 'white' }]}>Apartment</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setType("House")}
                  style={[styles.comp2, Type === "House" && { backgroundColor: 'black' }]}
                >
                  <MaterialIcons name="home" size={27} color={Type === "House" ? "white" : "black"} />
                  <Text style={[styles.comp2Text, Type === "House" && { color: 'white' }]}>House</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setType("Penthouse")}
                  style={[styles.comp2, Type === "Penthouse" && { backgroundColor: 'black' }]}
                >
                  <MaterialCommunityIcons name="warehouse" size={27} color={Type === "Penthouse" ? "white" : "black"} />
                  <Text style={[styles.comp2Text, Type === "Penthouse" && { color: 'white' }]}>Penthouse</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setType("Villa")}
                  style={[styles.comp2, Type === "Villa" && { backgroundColor: 'black' }]}
                >
                  <MaterialIcons name="villa" size={27} color={Type === 'Villa' ? "white" : "black"} />
                  <Text style={[styles.comp2Text, Type === "Villa" && { color: 'white' }]}>Villa</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setType("Office")}
                  style={[styles.comp2, Type === "Office" && { backgroundColor: 'black' }]}
                >
                  <MaterialCommunityIcons name="office-building-outline" size={27} color={Type === "Office" ? "white" : "black"} />
                  <Text style={[styles.comp2Text, Type === "Office" && { color: 'white' }]}>Office</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setType("collocation")}
                  style={[styles.comp2, Type === "collocation" && { backgroundColor: 'black' }]}
                >
                  <Octicons name="people" size={24} color={Type === "collocation" ? "white" : "black"} />
                  <Text style={[styles.comp2Text, Type === "collocation" && { color: 'white' }]}>Collocation</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setType("All")}
                  style={[styles.comp2, Type === "All" && { backgroundColor: 'black' }]}
                >
                  <Entypo name="reply-all" size={24} color={Type === "All" ? "white" : "black"} />
                  <Text style={[styles.comp2Text, Type === "All" && { color: 'white' }]}>All</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
           {index === 0 && (
            <View style={styles.as}>
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Text style={styles.ContainerText}>Price Range</Text>
              <View style={{marginVertical:16}}>

              <Text style={{fontFamily:'mon-sb',fontSize:16}}>${values[0]} - ${values[1]}</Text>
              </View>
             <MultiSlider
        values={values}
        min={0}
        max={800}
        step={20}
        onValuesChange={handleValuesChange}
        sliderLength={windowWidth*0.74}
        selectedStyle={{ backgroundColor: 'lightgrey' }} // Color of the selected part of the track
        unselectedStyle={{ backgroundColor: 'lightgrey',height:4,top:26,borderRadius:20 }} // Color of the unselected part of the track
        containerStyle={{ height: 60  }} // Container style for the slider
        trackStyle={{ height: 55, backgroundColor: 'white' }}
        customMarker={()=>
        (
          <View style={styles.marker}>
<Feather name="minus" size={30} color="white" />
      </View>
        )
        }
        // Track style with background color
        // Marker style with black border and centered position
        pressedMarkerStyle={{ backgroundColor: 'grey' }} // Style when the marker is pressed
      />
              </View>
              </View>)}
          {index === 0 && (
            <View style={styles.as}>
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Text style={styles.ContainerText}>Property Rooms</Text>
              </View>
              <View style={styles.spacedView}>
                <View style={styles.roomsContainer}>
                  <View style={styles.roomsInnerContainer}>
                    <TouchableOpacity onPress={()=>{SetRooms(Rooms+1)}}>
                      <Octicons name="chevron-up" size={30}  />
                    </TouchableOpacity>
                    <Text style={styles.roomsText}>S+{Rooms}</Text>
                    <TouchableOpacity onPress={()=>{if(Rooms>0)SetRooms(Rooms-1)}}>
                      <Octicons name="chevron-down" size={30} color={Rooms===0 ?'grey':'black'} />
                    </TouchableOpacity>
                  </View>
                  <View style={{width:'100%',alignItems:'center',justifyContent:'center',marginTop:'5%'}}>
                  <Text style={{fontFamily:'mon-sb',fontSize:16}}>Rooms</Text>
                  </View>
                </View>
                <View style={styles.roomsContainer}>
                  <View style={styles.roomsInnerContainer}>
                    <TouchableOpacity onPress={()=>{SetBathroom(Bathroom+1)}}>
                      <Octicons name="chevron-up" size={30} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.roomsText}>{Bathroom}</Text>
                    <TouchableOpacity onPress={()=>{if(Bathroom>1)SetBathroom(Bathroom-1)}}>
                      <Octicons name="chevron-down" size={30}color={Bathroom===1 ?'grey':'black'}/>
                    </TouchableOpacity>
                  </View>
                  <View style={{width:'100%',alignItems:'center',justifyContent:'center',marginTop:'5%'}}>
                  <Text style={{fontFamily:'mon-sb',fontSize:16}}>Bathroom</Text>
                  </View>
                </View>
              </View>
            </View>
          )}
         
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: '10%',
    paddingHorizontal: '5%',
  },
  backButton: {
    width: 60,
    height: 60,
    backgroundColor: '#f7f7f7',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    position: 'absolute',
    left: '45%',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  titleText: {
    fontSize: 20,
    fontFamily: 'mon-s',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    marginTop: '5%',
  },
  Anim: {
    width: '80%',
    backgroundColor: '#f7f7f7',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '8%',
    borderRadius: 30,
  },
  animatedView: {
    height: '95%',
    backgroundColor: 'black',
    width: '50%',
    borderRadius: 30,
    position: 'absolute',
  },
  button: {
    height: '95%',
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ButtonText: {
    fontSize: 16,
    fontFamily: 'mon',
    color: 'white',
  },
  scrollContent: {
    paddingBottom: 20,
    alignItems:'center'
  },
  ContainerText: {
    fontSize: 20,
    fontFamily: 'mon',
  },
  spacedView: {
    width: '100%',
    marginTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  comp2: {
    height: 90,
    width: '30%',
    backgroundColor: '#f3f3f3',
    borderRadius: 27,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
  comp2Text: {
    color: 'black',
    fontSize: 12,
    fontFamily: 'mon-s',
  },
  as: {
    backgroundColor: '#f7f7f7',
    width: '95%',
    marginTop: '8%',
    borderRadius: 26,
    alignItems: 'center',
    paddingBottom: 20,
  },
  roomsContainer: {
    backgroundColor: '#f3f3f3',
    height: 200,
    width: '48%',
    borderRadius: 30,
  },
  roomsInnerContainer: {
    alignSelf: "center",
    height: '60%',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '7%',
  },
  roomsText: {
    fontSize: 30,
    fontFamily: 'mon-s',
  },
  marker: {
    height: windowWidth * 0.15,  // Making marker size responsive
    width: windowWidth * 0.15,   // Making marker size responsive
    borderRadius: (windowWidth * 0.15) / 2,  // Making marker circular
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    top: 26}
  
});

export default SortBy;
