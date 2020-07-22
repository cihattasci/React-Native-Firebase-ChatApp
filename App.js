import React, {Component} from 'react';
import firebase from 'firebase';
import {Router, Scene} from 'react-native-router-flux';
import Giris from './Stacks/Giris';
import Mesaj from './Stacks/Mesaj';

export default class App extends Component {
  constructor(props) {
    super(props);
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

  render() {
    return (
      <Router headerLayoutPreset="center">
        <Scene key="root">
          <Scene
            key={'Mesaj'}
            component={Mesaj}
            title="Mesajlar"
            hideNavBar={true}
          />
          <Scene
            initial
            key={'Giris'}
            component={Giris}
            title="Giriş Yap"
            hideNavBar={true}
          />
        </Scene>
      </Router>
    );
  }
}
