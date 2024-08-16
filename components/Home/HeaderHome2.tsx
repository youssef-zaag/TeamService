import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors'

const HeaderHome2 = () => {
  return (
    <View style={styles.box}>
      <Text style={{fontSize:40,fontFamily:'mon'}}>Find The Perfect Affair</Text>
      <Text style={{fontFamily:'mon-sb',color:'#a8a8a8',fontSize:15}}>Discover the best for you</Text>
    </View>
  )
}

export default HeaderHome2

const styles = StyleSheet.create({
    box:{
        width:'80%',
        marginLeft:15,
    }
})