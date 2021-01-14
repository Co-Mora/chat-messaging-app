import React                    from 'react';
import { NavigationContainer }  from '@react-navigation/native';
import Navigation               from './app/navigation';
import { Provider }             from 'react-redux'
import configureStore           from './app/modules/store';

const App: React.FC = ({ }) => {
  return (
    <Provider store={configureStore()}>
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
