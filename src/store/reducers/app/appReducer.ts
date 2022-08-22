import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState, Tabs } from '../../../common/types/app/types';

const initialState: AppState = { activeTab: Tabs.DICTIONARY };

// const getWords = createAsyncThunk('app/getWords', () => {

// });

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    switchTab(state, action: PayloadAction<string>) {
      console.log('switchtab');
      state.activeTab = action.payload;
    },
  },
});

export default appSlice.reducer;
export const { switchTab } = appSlice.actions;
