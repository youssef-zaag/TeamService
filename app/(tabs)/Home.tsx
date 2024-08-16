import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HeaderHome from '@/components/Home/HeaderHome'
import Filtr from '@/components/Home/Filtr'

const Home = () => {
  return (
    <View style={{flex:1,backgroundColor:'white'}}>
    <HeaderHome/>
    <Filtr/>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})