/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import type { Node } from 'react';
import { AppState, I18nManager } from 'react-native'
import { focusManager } from 'react-query'
import { Provider } from 'react-redux';
import store from './app/store/store'
import AuthNav from './app/stucks/AuthAppNav';
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'

focusManager.setEventListener(handleFocus => {
  const subscription = AppState.addEventListener('change', state => {
    handleFocus(state === 'active')
  })

  return () => {
    subscription.remove()
  }
})

// Create a client
const queryClient = new QueryClient()
const App: () => Node = () => {

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AuthNav />
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
