import React from 'react';
import { showMessage } from 'react-native-flash-message';
import { Image, Text, View } from 'react-native'; // Added View component
import { getFontSizeByWindowWidth, calcHeight } from './res';
import OfflineIcon from "../assets/icons/offline.png";
const offlineMessage = () => {
  showMessage({
    message: '',
    type: 'danger',
    renderAfterContent: () => (
      <React.Fragment>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}> 
          <Text style={{ fontSize: getFontSizeByWindowWidth(12),color:"white"}}>You are offline</Text>
          <Image
            source={OfflineIcon}
            style={{ marginLeft: 5, width: calcHeight(2), height: calcHeight(2) }}
          />
        </View>
      </React.Fragment>
    ),
  });
};

export default offlineMessage;