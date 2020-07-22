/* eslint-disable no-alert */
/* eslint-disable no-undef */
/* eslint-disable consistent-this */
/* eslint-disable react/no-did-mount-set-state */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Dimensions,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import firebase from 'firebase';
import {TextInput, FlatList} from 'react-native-gesture-handler';

const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;
export default class Mesaj extends Component {
  constructor(props) {
    super(props);
    this.state = {message: '', messageArray: [], firstArray: []};
    this.data = [];
    this.getData();
  }

  getData = () => {
    const self = this;
    firebase
      .database()
      .ref('messages')
      .on('child_added', (snapshot) => {
        self.state.firstArray.push({
          text: snapshot.val().text,
          name: snapshot.val().name,
        });
      });
  };

  send = () => {
    if (!this.state.message) {
      null;
    } else {
      const getUser = firebase.auth().currentUser.email;
      const user = getUser.substring(0, getUser.length - 4);
      firebase
        .database()
        .ref('messages')
        .push({
          text: `${this.state.message}`,
          name: `${user}`,
        });
      this.data.push(this.state.message);
      this.setState({message: ''});
    }
  };

  render() {
    return (
      <SafeAreaView style={{flex: 1, padding: 10, marginBottom: 5}}>
        <View style={{height: h * 0.85}}>
          <FlatList
            data={this.state.firstArray}
            renderItem={({item}) =>
              item.name ===
              firebase
                .auth()
                .currentUser.email.substring(0, firebase.auth().currentUser.email.length - 4) ? (
                <View key={item.id} style={styles.box}>
                  <Text style={{color: 'white'}}>{item.text}</Text>
                </View>
              ) : (
                <View key={item.id} style={styles.box2}>
                  <Text style={{color: 'white'}}>{item.text}</Text>
                </View>
              )
            }
            keyExtractor={(item) => item.id}
          />
        </View>
        <View style={styles.container}>
          <TextInput
            value={this.state.message}
            onChangeText={(message) => this.setState({message})}
            style={styles.mesaj}
            placeholder="Enter your text here.."
            placeholderTextColor="gray"
          />
          <TouchableOpacity onPress={this.send}>
            <Text style={styles.send}>Send</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  mesaj: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    width: w * 0.84,
    height: h * 0.0555,
    paddingLeft: 8,
    marginRight: 5,
    marginLeft: 5,
  },
  send: {
    fontSize: h * 0.024,
    color: '#0600ff',
  },
  container: {
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    alignItems: 'center',
    top: h * 0.905,
    position: 'absolute',
  },
  box: {
    backgroundColor: 'blue',
    marginLeft: w * 0.75,
    marginBottom: 10,
    borderRadius: 5,
    justifyContent: 'center',
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  box2: {
    backgroundColor: 'blue',
    marginRight: w * 0.75,
    marginBottom: 10,
    borderRadius: 5,
    justifyContent: 'center',
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
});
