import React from 'react';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config';
import { RootNavigator } from './src/navigation/RootNavigator';
import { Provider } from 'react-redux';
import { store } from './src/store/store';

const App = () => {
  return (
    <Provider store={store}>
      <GluestackUIProvider config={config}>
        <RootNavigator />
      </GluestackUIProvider>
    </Provider>
  );
};

export default App;
