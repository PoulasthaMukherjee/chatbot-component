import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  chatOpen: false,
  messages: [
    { id: 0, sender: 'bot', text: 'Hey there! What\'s your name?', time: new Date().toLocaleTimeString(), date: new Date().toLocaleDateString() }
  ],
  userName: '',
  inputValue: '',
};

const chatbotSlice = createSlice({
  name: 'chatbot',
  initialState,
  reducers: {
    toggleChat(state) {
      state.chatOpen = !state.chatOpen;
    },
    sendMessage(state) {
      if (state.inputValue.trim() === '') return;

      const newMessage = {
        id: state.messages.length,
        sender: 'user',
        text: state.inputValue,
        time: new Date().toLocaleTimeString(),
        date: new Date().toLocaleDateString(),
      };

      if (!state.userName) {
        state.userName = state.inputValue;
        state.messages.push(newMessage);
        state.messages.push({ 
          id: state.messages.length + 1, 
          sender: 'bot', 
          text: `Hi ${state.inputValue}, how can I help you today?`, 
          time: newMessage.time, 
          date: newMessage.date 
        });
      } else {
        state.messages.push(newMessage);
        state.messages.push({
          id: state.messages.length + 1,
          sender: 'bot',
          text: 'Here is a static response for now.',
          time: newMessage.time,
          date: newMessage.date,
        });
      }

      state.inputValue = '';
    },
    endConversation(state) {
      state.messages = [{ id: 0, sender: 'bot', text: 'Hey there! What\'s your name?', time: new Date().toLocaleTimeString(), date: new Date().toLocaleDateString() }];
      state.userName = '';
      state.chatOpen = false;
    },
    updateInputValue(state, action) {
      state.inputValue = action.payload;
    },
  },
});

export const { toggleChat, sendMessage, endConversation, updateInputValue } = chatbotSlice.actions;

export default chatbotSlice.reducer;