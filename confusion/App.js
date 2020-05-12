import React from 'react';
import Main from './component/MainComponents';
import {ConfigureStore} from './redux/configureStore';
import {Provider} from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react'
import { Loading } from './component/LoadingComponent';

const { persistor, store } = ConfigureStore();
export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate 
          loading={<Loading />}
          persistor={persistor}>
          <Main />
        </PersistGate>
      </Provider>
    
    );
  }
}