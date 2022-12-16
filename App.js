/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import type { Node } from 'react';
import { Provider } from 'react-redux';
import store from './app/store/store'
import AuthNav from './app/stucks/AuthAppNav';

const App: () => Node = () => {

  return (
    <Provider store={store}>
      <AuthNav />
    </Provider>
  );
};

export default App;
