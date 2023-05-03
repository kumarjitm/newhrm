import {configureStore} from '@reduxjs/toolkit';

import {authSlice} from '@app/store/reducers/auth';
import {uiSlice} from '@app/store/reducers/ui';
import {createLogger} from 'redux-logger';
import { serviceSlice } from './reducers/services';

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    ui: uiSlice.reducer,
    services: serviceSlice.reducer
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware().concat(createLogger())
  ]
});

export default store;
