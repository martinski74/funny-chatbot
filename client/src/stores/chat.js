import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';

const url = import.meta.env.VITE_APP_URL;

export const useChatStore = defineStore('chat', () => {
  const messages = ref([]);
  const isLoading = ref(false);
  const error = ref(null);

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
    try {
      isLoading.value = true;
      error.value = null;

      const msgData = {
        message: message,
      };
      const { data } = await axios.post(url, msgData);
      const { response } = data;
      createMessage(response);
    } catch (err) {
      error.value =
        err.message || 'An error occurred while communicating with the bot.';
      console.error('Error getting bot response:', err);
    } finally {
      isLoading.value = false;
    }
  }

  return {
    messages,
    isLoading,
    error,
    createMessage,
    getResponse,
  };
});
