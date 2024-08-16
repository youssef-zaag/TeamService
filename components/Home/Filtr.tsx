import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import data from '@/data/data.json'
import Item from './Item';
import * as Haptics from 'expo-haptics';
import { Link } from 'expo-router';

const Filtr = () => {
  
  

  
  
  const scroll= useRef<FlatList>(null)

  const [selectedItem, setSelectedItem] = useState<string>("Recent");
  const press=(item:any,index:number)=>{
    setSelectedItem(item.name)
    scroll.current?.scrollToIndex({ index, viewPosition: .2, animated: true });
    console.log(item.name)
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);


  }


  return (
    <View style={styles.Medium}>
      <View  style={styles.filter}
      >
      <FlatList
      ref={scroll}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ alignItems: 'center', gap: 5, paddingHorizontal: 18 }}

      data={data.classifications}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item,index})=>(
        <TouchableOpacity  style={[styles.ff ,selectedItem === item.name && styles.ffP]} onPress={()=>press(item,index)} >
          <Text style={[styles.TextF, selectedItem === item.name && styles.TextFP]}>{item.name}</Text>
        </TouchableOpacity>
      )}

      />
      </View>
      <Item filt={selectedItem} />
    </View>
  )
}

export default Filtr

const styles = StyleSheet.create({
    Medium:{
      height:'40%',

    },
    filter: {
      alignSelf:'center',
      height:80

      

    },
    ff:{
      height:50,
      marginHorizontal:6,
      paddingHorizontal:20,
      alignItems:'center',
      justifyContent:'center',
      borderRadius:150,
      backgroundColor:'#f7f7f7',

    },
    ffP:{
      backgroundColor:'black',

    },
    TextF:{
      fontFamily:'mon',
      fontSize:15,
      color:'grey'

    },
    TextFP:{
      color:'white'
    }

})