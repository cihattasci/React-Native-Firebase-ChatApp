/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  TextInput,
  StyleSheet,
  Button,
  SafeAreaView,
  ActivityIndicator,
  View,
  KeyboardAvoidingView,
  Text,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import firebase from 'firebase';

export default class Giris extends Component {
  constructor(props) {
    super(props);
    this.state = {username: '', password: '', loading: false};
    const firebaseConfig = {
      apiKey: 'AIzaSyD9X8VQbIemCr51_LA8sLU3n2iLuvwTJpY',
      authDomain: 'chatapp-fa89c.firebaseapp.com',
      databaseURL: 'https://chatapp-fa89c.firebaseio.com',
      projectId: 'chatapp-fa89c',
      storageBucket: 'chatapp-fa89c.appspot.com',
      messagingSenderId: '1050665548716',
      appId: '1:1050665548716:web:6e82046e9d2c4e1ce41809',
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  }

  giris = () => {
    this.setState({loading: true});
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.username, this.state.password)
      .then(() => {
        Actions.Mesaj();
        this.setState({loading: false, username: '', password: ''});
      })
      .catch((error) => {
        alert(error);
        this.setState({loading: false, password: ''});
      });
  };

  kayit = () => {
    this.setState({loading: true});
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.username, this.state.password)
      .then(() => {
        alert('Kayıt Başarılı');
        Actions.Mesaj();
        this.setState({loading: false, username: '', password: ''});
      })
      .catch((error) => {
        alert(error);
        this.setState({loading: false, password: ''});
      });
  };

  render() {
    const isLoading = this.state.loading ? (
      <ActivityIndicator size="large" color="black" />
    ) : (
      <View>
        <View style={{marginBottom: 10}}>
          <Button title="Giriş Yap" onPress={this.giris} />
        </View>
        <Button title="Kayıt Ol" onPress={this.kayit} />
      </View>
    );
    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView>
          <TextInput
            keyboardType="email-address"
            placeholder="E-mail"
            placeholderTextColor="gray"
            value={this.state.username}
            onChangeText={(username) => this.setState({username})}
            style={styles.input}
          />
          <TextInput
            secureTextEntry={true}
            placeholder="Password"
            placeholderTextColor="gray"
            value={this.state.password}
            onChangeText={(password) => this.setState({password})}
            style={styles.input}
          />
        </KeyboardAvoidingView>
        {isLoading}
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  input: {
    textAlign: 'left',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    height: 50,
    width: 300,
    paddingLeft: 10,
    marginBottom: 25,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
