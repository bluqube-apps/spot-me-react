/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import MapView from 'react-native-maps';

export default class SpotMe extends Component {
  render() {
    const { region } = this.props;
    console.log(region);

    return (
      <View style={styles.container}>
        <View style={styles.toolBar}>
          <Text style={{fontSize: 25, color: '#fff'}}>Spot.me</Text>
        </View>
        <MapView
        style={styles.map}
         region={{
           latitude: 37.78825,
           longitude: -122.4324,
           latitudeDelta: 0.015,
           longitudeDelta: 0.0121,
         }}>
       </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  toolBar: {
    height: 60,
    alignSelf: 'stretch',
    padding: 10,
    justifyContent: 'center',
    backgroundColor: '#00b0ff'
  },
  map: {
    flex: 1,
    alignSelf: 'stretch',
  }
});

AppRegistry.registerComponent('SpotMe', () => SpotMe);
