import FirebaseKeys from "../config/Firebasekeys";
import firebase from "firebase";
require("firebase/firestore");

import {Alert} from 'react-native'
import { ImageState } from "../screens/PostScreen/styles";

class Fire {
  constructor() {
    firebase.initializeApp(FirebaseKeys);
  }

  addPost = async ({ text, localUri, uri, name, apellido, pais, likes, selectedItemObjects}) => {
    // const id = uuid.v4();
    const remoteUri = await this.uploadPhotoAsync(
      localUri,
      `photos/${this.uid}/${localUri}`
     
    );
    const avatarUri = await this.uploadPhotoAsync(uri, `avatars/${this.uid}`);
    return new Promise((res, rej) => {
      this.firestore
        .collection("posts")
        .add({
          // id: id,
          name,
          apellido,
          avatar: avatarUri,
          text,
          selectedItemObjects,
          uid: this.uid,
          pais,
          likes,
          timestamp: this.timestamp,
          imagestate: remoteUri,
        })
        .then(ref => {
          res(ref);
        })
        .catch(error => {
          rej(error);
        });
    });
  };


  addTab = async ({ text, name, apellido}) => {
    // const id = uuid.v4();
    return new Promise((res, rej) => {
      this.firestore
        .collection("tabs")
        .add({
          name,
          apellido,
          text,
          uid: this.uid,
          timestamp: this.timestamp,
 
        })
        .then(ref => {
          res(ref);
        })
        .catch(error => {
          rej(error);
        });
    });
  };





  uploadPhotoAsync = async (uri, filename) => {
    return new Promise(async (res, rej) => {
      const response = await fetch(uri);
      const file = await response.blob();

      let upload = firebase
        .storage()
        .ref(filename)
        .put(file);

      upload.on(
        "state_changed",
        snapshot => {},
        err => {
          rej(err);
        },
        async () => {
          const url = await upload.snapshot.ref.getDownloadURL();
          res(url);
        }
      );
    }).catch(error => {
      console.error(error);
    });
  };

  createUser = async user => {
    let remoteUri = null;

    try {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password);

      let db = this.firestore.collection("users").doc(this.uid);

      db.set({
        name: user.name,
        apellido: user.apellido,
        email: user.email,
        desc: user.desc,
        pais: user.pais,
        avatar: null
      });

      if (user.avatar) {
        remoteUri = await this.uploadPhotoAsync(
          user.avatar,
          `avatars/${this.uid}`
        );
        db.set({ avatar: remoteUri }, { merge: true });
      }
    } catch (error) {
    Alert.alert("Correo ya esta registrado")
    }
  };

  updateUser = async user => {

    let remoteUri = null;
    let db = this.firestore.collection("users").doc(this.uid)
   
    db.update({
      name: user.name,
      apellido: user.apellido,
      desc: user.desc,
      avatar: null,

    });

   if (user.avatar) {
        remoteUri = await this.uploadPhotoAsync(
          user.avatar,
          `avatars/${this.uid}`
        );
        db.set({ avatar: remoteUri }, { merge: true });
      }
  };



  get firestore() {
    return firebase.firestore();
  }

  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }
 
  get timestamp() {
    return Date.now();
  }
  
  get idtab(){
    return (firebase.firestore().doc(id))
  }
}

Fire.shared = new Fire();
export default Fire;