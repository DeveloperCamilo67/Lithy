import Contants from "expo-constants";
import * as Permissions from "expo-permissions";
import {Alert} from 'react-native'

class UserPermissions {
  getCameraPermission = async () => {
    if (Contants.platform.android) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status != "granted") {
        Alert.alert("Necesitamos que acepte los permisos para utilizar Lithy");
      }
    }
  };

  getPermissionsAudio = async () => {
    if (Contants.platform.android) {
      const { status } = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
      if (status != "granted") {
        Alert.alert("Necesitamos que acepte los permisos para utilizar Lithy");
      }
    }
  };
}
export default new UserPermissions();