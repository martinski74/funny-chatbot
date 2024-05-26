import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';
const url = import.meta.env.VITE_APP_URL;

export const useChatStore = defineStore('chat', () => {
  const messages = ref([]);
  const messageContent = ref('');

  const createMessage = (message) => {
    let id = 0;

    if (messages.value[messages.value.length - 1]) {
      id = messages.value[messages.value.length - 1].id + 1;
    }
    messages.value.push({
      id: id,
      message: message,
    });
  };

  async function getResponse(message) {
    const msgData = {
      message: message,
    };
    const { data } = await axios.post(url, msgData);
    const { response } = data;
    createMessage(response);
  }

  return { messages, messageContent, createMessage, getResponse };
});
