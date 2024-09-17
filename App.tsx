import React from 'react';
import {SafeAreaView, useWindowDimensions} from 'react-native';
import PermissionWrapper from './components/PermissionWrapper';
import ImageGallery from './components/ImageGallery';

const App: React.FC = () => {
  const {height} = useWindowDimensions();
  return (
    <SafeAreaView style={{height}}>
      <PermissionWrapper>
        <ImageGallery />
      </PermissionWrapper>
    </SafeAreaView>
  );
};

export default App;
