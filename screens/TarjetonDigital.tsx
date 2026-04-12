import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';

const TarjetonDigital: React.FC = () => {
  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: 'https://tuperfil.imss.gob.mx/' }}
        startInLoadingState={true}
        renderLoading={() => (
          <ActivityIndicator
            size="large"
            color="#0567A3"
            style={styles.loader}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loader: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -25 }, { translateY: -25 }],
  },
});

export default TarjetonDigital;
