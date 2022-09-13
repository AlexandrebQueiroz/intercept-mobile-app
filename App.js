import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react';
import { BackHandler, Platform, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

export default function App() {

  const webView = useRef(null);
  const [canGoBack, setCanGoBack] = useState(false);

  useEffect(() => {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', HandleBackPressed);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', HandleBackPressed);
      }
    }
  }, []); 

  const HandleBackPressed = () => {
    if (webView.current) {
      webView.current.goBack();
      return true; 
    }
    return false;
  }
  
  return <>
  <SafeAreaView 
    style={styles.container} 
    bounces={false} >

    <StatusBar
      backgroundColor="#9F9F9F"
      hidden={false} 
    />

    <WebView
      ref={webView}
      source={{ uri: "https://www.google.com.br/" }}
      originWhitelist={['*']}
      allowFileAccess={true}
      scalesPageToFit={true}
      javaScriptEnabled={true}
      geolocationEnabled={true}
      onNavigationStateChange={
        navState => setCanGoBack(navState.canGoBack)
      }
    />
  </SafeAreaView>

</>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#000000'
  }
});

