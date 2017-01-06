import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  Alert
} from 'react-native';
import MapView from 'react-native-maps';

const firebase = require('firebase');
var firebaseConfig = {
    apiKey: "AIzaSyA7uzSwiSxg4tR4VbvBIwiLV3J9PKA26eM",
    authDomain: "spotme-154704.firebaseapp.com",
    databaseURL: "https://spotme-154704.firebaseio.com",
    storageBucket: "spotme-154704.appspot.com",
    messagingSenderId: "568481781344"
  };
const firebaseApp = firebase.initializeApp(firebaseConfig);
this.itemsRef = firebaseApp.database().ref();

const onButtonPress = () => {
  /*signIn();*/
  /*logout();*/
  pushData();
};

async function signIn() {
  try {
    await firebaseApp.auth()
      .signInWithEmailAndPassword('email@gmail.com', 'pass12345');
    console.log('Signed In');
  } catch (e) {
    console.log(e.toString());
  }
}
async function logout() {
    try {
        await firebaseApp.auth().signOut();
    } catch (error) {
        console.log(error);
    }
}
async function pushData() {
    itemsRef.push({
      title: 'child.val().title',
      _key: 'child.key'
    });
}

var index = 0;
class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {markerArr: []};
    this.loadData();
  }

  loadData() {
    itemsRef.child('places').on('value',(snap) => {
      var items = [];
      snap.forEach((child) => {
        let temp = index++;
        this.state.markerArr.push({
          coordinate:{
            latitude: child.val().lat,
            longitude: child.val().long
          },
          title: child.val().title,
          desc: child.val().desc
        });
        this.setState({
          markerArr: this.state.markerArr
        })
      })
    })
  }

  render(){
    let Arr = this.state.markerArr.map((a, i) => {
      return <View key={i} style={{ height:40, borderBottomWidth:2, borderBottomColor: '#ededed' }}><Text>{ a }</Text></View>
    })
    return(
      <MapView
      style={styles.map}
       region={{
         latitude: 10.6936159,
         longitude: 122.5719469,
         latitudeDelta: 0.010,
         longitudeDelta: 0.021,
       }}>
       {this.state.markerArr.map((marker, i) =>(
          <MapView.Marker
            key={i}
            coordinate={marker.coordinate}
            title={marker.title}
            description={marker.desc}
          />
       ))}
     </MapView>
    );
  }
}

class SpotMe extends Component {
  constructor(props){
    super(props);
  }

  render() {
    const { region } = this.props;
    console.log(region);

    return (
      <View style={styles.container}>
        <View style={styles.toolBar}>
          <Text style={{flex:1,fontSize: 25, color: '#fff'}}>Spot.me</Text>
          <Button onPress={onButtonPress} title="Test Firebase" color="#841584" accessibilityLabel="Learn more about this purple button" />
        </View>
        <Map/>
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
    flex:.05,
    flexDirection: 'row',
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
