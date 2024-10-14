import { configureStore } from '@reduxjs/toolkit';
import chatbotReducer from './chatbotSlice';

const store = configureStore({
  reducer: {
    chatbot: chatbotReducer,
  },
});

export default store;