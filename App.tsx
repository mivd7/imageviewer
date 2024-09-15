import React from 'react';
import {Button, SafeAreaView} from 'react-native';
import PermissionWrapper from './components/PermissionWrapper';
import ImageGallery from './components/ImageGallery';

const App: React.FC = () => {
  return (
    <SafeAreaView>
      <PermissionWrapper>
        <ImageGallery />
      </PermissionWrapper>
    </SafeAreaView>
  );
};

export default App;
