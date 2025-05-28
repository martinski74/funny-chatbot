<template>
  <div class="page-container">
    <div class="background-animation"></div>
    <div class="fan-background"></div>
    <div id="chatContainer">
      <div class="chatHeader">
        <h5>Chat Bot</h5>
      </div>
      <div class="chatBody" ref="messageBody">
        <div
          class="messages"
          v-for="message in chatStore.messages"
          :key="message.id"
        >
          <div v-if="message.id % 2 == 0" class="messageRow user">
            <div class="message user">
              <p>{{ message.message }}</p>
            </div>
          </div>
          <div v-else class="messageRow bot">
            <div class="message bot">
              <p>{{ message.message }}</p>
            </div>
          </div>
        </div>
        <div v-if="chatStore.isLoading" class="messageRow bot">
          <div class="message bot loading">
            <p>...</p>
          </div>
        </div>
        <div v-if="chatStore.error" class="error-message">
          {{ chatStore.error }}
        </div>
      </div>
      <div class="chatFooter">
        <form @submit.prevent="sendMessage">
          <input
            v-model="messageContent"
            id="createMessage"
            placeholder="Ask me..."
            @keydown.enter="sendMessage"
            ref="inputRef"
          />
          <input
            type="submit"
            value="Send"
            :disabled="chatStore.isLoading || !messageContent.trim()"
          />
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue';
import { useChatStore } from '../stores/chat';

const chatStore = useChatStore();

const messageContent = ref('');
const messageBody = ref(null);
const inputRef = ref(null);
function sendMessage() {
  if (!messageContent.value.trim() || chatStore.isLoading) return;
  chatStore.createMessage(messageContent.value);
  chatStore.getResponse(messageContent.value);
  messageContent.value = '';
  inputRef.value && inputRef.value.focus();
}

watch(
  chatStore.messages,
  () => {
    nextTick(() => {
      if (messageBody.value) {
        messageBody.value.scrollTop = messageBody.value.scrollHeight;
      }
    });
  },
  { deep: true, immediate: true }
);
</script>

<style scoped>
.page-container {
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  background-color: #0a0a0a;
}

.background-animation {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, #1a5f7a, #6dd5ed, #2193b0, #4fc3f7);
  background-size: 400% 400%;
  filter: blur(80px);
  opacity: 0.7;
  animation: gradientAnimation 8s ease infinite;
}

.fan-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('/circuit-bg.jpg');
  background-size: cover;
  background-position: center;
  opacity: 0.6;
  z-index: 0;
  pointer-events: none;
  filter: contrast(1.1) brightness(1.1);
}

@keyframes gradientAnimation {
  0% {
    background-position: 0% 50%;
  }
  25% {
    background-position: 50% 0%;
  }
  50% {
    background-position: 100% 50%;
  }
  75% {
    background-position: 50% 100%;
  }
  100% {
    background-position: 0% 50%;
  }
}

#chatContainer {
  background-color: rgba(92, 98, 111, 0.75);
  height: 800px;
  width: 40%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  position: relative;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(5px);
  z-index: 1;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.chatHeader {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  color: white;
  background-color: purple;
  text-align: center;
  font-size: 22px;
  font-weight: 700;
  font-family: cursive;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}
.chatHeader > h5 {
  margin: 15px;
}
.chatFooter {
  position: absolute;
  bottom: 0px;
  width: 100%;
}
.chatFooter form {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  width: 95%;
  margin: 0 auto;
}
.chatBody {
  overflow-y: scroll;
  scroll-behavior: smooth;
  padding-bottom: 10px;
  height: 84%;
  -ms-overflow-style: none;
  scrollbar-width: none;
}
#createMessage {
  width: 80%;
  appearance: none;
  border: none;
  outline: none;
  display: block;
  padding: 10px 15px;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 700;
}
input:not(#createMessage) {
  background-color: #4caf50;
  border: 0;
  border-radius: 8px;
  color: white;
  padding: 12px 24px;
  margin-bottom: 10px;
  font-family: sans-serif;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
input:not(#createMessage):hover {
  background-color: #45a049;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}
input:not(#createMessage):active {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}
input:not(#createMessage):disabled {
  background-color: #cccccc;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
  opacity: 0.7;
}
.messageRow {
  display: flex;
  justify-content: flex-end;
}

.messageRow.bot {
  justify-content: flex-start;
}
.message p {
  color: white;
  padding: 0px 15px 0px 15px;
  font-family: sans-serif;
}
.message {
  border-radius: 50px;
  text-align: center;
  margin: 10px;
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.messageRow.user .message {
  background-color: #43cc47;
}
.messageRow.bot .message {
  background-color: #1982fc;
}
.chatBody::-webkit-scrollbar {
  display: none;
}

.message.loading {
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.6;
  }
}

.error-message {
  color: #ff4444;
  text-align: center;
  padding: 10px;
  margin: 10px;
  background-color: rgba(255, 68, 68, 0.1);
  border-radius: 8px;
}

input:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
</style>
