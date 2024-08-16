import React, { useCallback, useMemo, useRef, useEffect } from 'react';
import { Dimensions, StyleSheet, Text, View,Image, TouchableOpacity } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { Link, router, useLocalSearchParams, useRouter } from 'expo-router';
import Carousel from 'react-native-snap-carousel';
import data from '@/data/data.json'
import { AntDesign, Entypo } from '@expo/vector-icons';









const { width: screenWidth } = Dimensions.get('window');


type Props={
  data:any
 }
 type item={
  item:any
 }

const MyCarousel = ({ data }:Props) => {
  const renderItem = ({ item }:item) => (
    <Link href={`/affairs/${item.id}`} asChild>

    <TouchableOpacity style={styles.card} activeOpacity={.9} >
<Image source={{uri:item.image}} style={styles.image}/>  
<View style={{height:'20%',width:'30%',position:'absolute',left:'0%',top:'7%',borderTopEndRadius:28,alignItems:'center',justifyContent:'center'}}> 
  <Text style={{fontFamily:'mon-s',color:'white',fontSize:24}}>{item.price}$</Text>

</View>

  </TouchableOpacity>
    <TouchableOpacity style={styles.card} activeOpacity={.9} >
<Image source={{uri:item.image}} style={styles.image}/>  
<View style={{height:'20%',width:'30%',position:'absolute',left:'0%',top:'7%',borderTopEndRadius:28,alignItems:'center',justifyContent:'center'}}> 
  <Text style={{fontFamily:'mon-s',color:'white',fontSize:24}}>{item.price}$</Text>

</View>

  </TouchableOpacity>
  </Link>
  );

  return (
    <Carousel
      hasParallaxImages
      data={data}
      renderItem={renderItem}
      sliderWidth={screenWidth}
      itemWidth={screenWidth - 40}
      layout={'stack'}

    />
  );
};

const Azerty = () => { const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();


  let ids: number[] = [];
  if (id) {
    try {
      ids = JSON.parse(id);
    } catch (error) {
      console.error('Error parsing JSON:', error);
    }
  }
  const filteredData = data.classifications
    .flatMap(classification => classification.homes)
    .filter(item => ids.includes(item.id));
   


      const ref = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['32%','35%','44%'], []);

  const renderBackdrop = useCallback(
    (props :any) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={2}
        disappearsOnIndex={-1}
        pressBehavior="close"
        onPress={back}
      />
    ),
    []
  );
  const back=()=>{
    router.back()

  }

  const handleSheetChange = (index:number) => {
    console.log('Bottom sheet index changed to:', index);
    if (index === -1) {
      router.back()
    }
  };

  useEffect(() => {
    ref.current?.present();
  }, []);

  return (
    <GestureHandlerRootView style={styles.root}>
      <BottomSheetModalProvider>
        <View style={styles.container}>
          <BottomSheetModal
            backgroundStyle={{ backgroundColor: '#F6F5F2' }}
            enableContentPanningGesture={false}
            onChange={handleSheetChange}
            backdropComponent={renderBackdrop}
            handleIndicatorStyle={{ width: 130, height: 6, }}
            overDragResistanceFactor={5}
            ref={ref}
            snapPoints={snapPoints}
            enablePanDownToClose={false}
          >
<MyCarousel data={filteredData}/>
          </BottomSheetModal>
        </View>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'lightgrey',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    width: screenWidth - 50,
    marginHorizontal: 8,
    height: screenWidth-screenWidth*.5,
    marginVertical:4
  
  },
  title: {
    fontSize: 24,
    color: 'black'
  } ,
   image:{
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    resizeMode: 'cover',
     top: 0,
      borderRadius: 25,
  }
});

export default Azerty;
