import React from 'react';
import './app/i18n'; // Must be first
import { AppState } from 'react-native';
import {
  focusManager, MutationCache, QueryCache, QueryClient,
  QueryClientProvider,
} from 'react-query';
import { Provider } from 'react-redux';
import store from './app/store/store';
import AuthNav from './app/stucks/AuthAppNav';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeProvider } from './app/theme/ThemeContext';
import { userSignInSet } from './app/store/reducers/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardProvider } from 'react-native-keyboard-controller';

focusManager.setEventListener(handleFocus => {
  const subscription = AppState.addEventListener('change', state => {
    handleFocus(state === 'active');
  });

  return () => {
    subscription.remove();
  };

});

function App(): React.JSX.Element {

  //Create a cache querys for global error handling
  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: async (error: any) => {
        error.status === 401 ? store.dispatch(userSignInSet(false)) : null;
        await AsyncStorage.removeItem('accessToken');
      },
    }),
    mutationCache: new MutationCache({
      onError: async (error: any, _, __, _mutation) => { // cache-level mutations error handler
        error.status === 401 ? store.dispatch(userSignInSet(false)) : null;
        await AsyncStorage.removeItem('accessToken');
      },
    }),
  });

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <KeyboardProvider>
            <ThemeProvider>
              <AuthNav />
            </ThemeProvider>
          </KeyboardProvider>
        </GestureHandlerRootView>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
