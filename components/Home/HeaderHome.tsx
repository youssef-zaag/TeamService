import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { AntDesign, FontAwesome } from '@expo/vector-icons'
import HeaderHome2 from './HeaderHome2'
import { router } from 'expo-router'

const HeaderHome = () => {
  return (
    <View style={{height:'33%'}}>
      <View style={styles.header1}>
        <TouchableOpacity onPress={()=> router.push('/sortBy/SortBy')} style={styles.headerIcon}>
          <AntDesign name="appstore-o" size={26} color="black" />
          </TouchableOpacity>

        <TouchableOpacity style={styles.headerIcon}><FontAwesome name="search" size={24} color="black" /></TouchableOpacity>
      </View>
      <HeaderHome2/>
    </View>
  )
}

export default HeaderHome

const styles = StyleSheet.create({
    header1:{
        alignItems:'center',
        justifyContent:'space-between',
        flexDirection:'row',
        marginTop:'13%',
        paddingHorizontal:20,
    },
    headerIcon:{
        width:60,
        height:60,
        backgroundColor:'#f7f7f7',
        borderRadius:500,
        alignItems:'center',
        justifyContent:'center'
    }
})