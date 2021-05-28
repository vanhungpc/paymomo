/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Platform,
  Button
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import RNMomosdk from 'react-native-momosdk';

const merchantname = "CGV Cinemas";
const merchantcode = "CGV01";
const merchantNameLabel = "Nhà cung cấp";
const billdescription = "Fast and Furious 8";
const amount = 50000;
const enviroment = "0"; //"0": SANBOX , "1": PRODUCTION

const Section = ({children, title}): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  // TODO: Action to Request Payment MoMo App
const onPress = async () => {
  let jsonData = {};
  jsonData.enviroment = enviroment; //SANBOX OR PRODUCTION
  jsonData.action = "gettoken"; //DO NOT EDIT
  jsonData.merchantname = merchantname; //edit your merchantname here
  jsonData.merchantcode = merchantcode; //edit your merchantcode here
  jsonData.merchantnamelabel = merchantNameLabel;
  jsonData.description = billdescription;
  jsonData.amount = 5000;//order total amount
  jsonData.orderId = "ID20181123192300";
  jsonData.orderLabel = "Ma don hang";
  jsonData.appScheme = "momocgv20170101";// iOS App Only , match with Schemes Indentify from your  Info.plist > key URL types > URL Schemes
  console.log("data_request_payment " + JSON.stringify(jsonData));
  if (Platform.OS === 'android'){
    let dataPayment = await RNMomosdk.requestPayment(jsonData);
    momoHandleResponse(dataPayment);
  }else{
    RNMomosdk.requestPayment(jsonData);
  }
}

const  momoHandleResponse = async (response) => {
  console.log("momoHandleResponse ==== ", response)
try{
  if (response && response.status == 0) {
    //SUCCESS continue to submit momoToken,phonenumber to server
    let fromapp = response.fromapp; //ALWAYS:: fromapp == momotransfer
    let momoToken = response.data;
    let phonenumber = response.phonenumber;
    let message = response.message;

  } else {
    //let message = response.message;
    //Has Error: show message here
  }
}catch(ex){}
}

  return (
    <View style={{flex:1, backgroundColor:'white', justifyContent:'center'}}>
        <Button title={"Pay MOMO"} onPress={onPress}/>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
