<template>
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
    </div>
    <div class="chatFooter">
      <form @submit.prevent="sendMessage()">
        <input
          v-model="messageContent"
          id="createMessage"
          placeholder="Ask me..."
        />
        <input type="submit" value="Send" />
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useChatStore } from '../stores/chat';

const chatStore = useChatStore();

const messageContent = ref('');
const messageBody = ref(null);
//Sends the message on form submit
function sendMessage() {
  if (messageContent.value == '') return;
  chatStore.createMessage(messageContent.value);
  chatStore.getResponse(messageContent.value);
  messageContent.value = '';
}

// TODO ... Add scroll to bottom on new message.Stll not working
watch(chatStore.messages, (newMess) => {
  if (newMess) {
    messageBody.value.scrollIntoView({ block: 'end', behavior: 'smooth' });
  }
});
</script>

<style>
#chatContainer {
  background-color: #5c626f;
  height: 800px;
  width: 40%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  position: relative;
}
.chatHeader {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  color: white;
  background-color: purple;
  text-align: center;
  font-size: 22px;
  font-weight: 700;
  font-family: cursive;
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
  /* padding: 5px; */
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  width: 95%;
  margin: 0 auto;
}
.chatBody {
  overflow-y: scroll;
  height: 84%;
}
#createMessage {
  width: 80%;
  /* padding: 10px;
  border-radius: 5px; */
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
  background-color: green;
  border: 0;
  border-radius: 5px;
  color: white;
  padding: 12px;
  margin-bottom: 10px;
  font-family: sans-serif;
}
input:not(#createMessage):hover {
  opacity: 0.5;
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
}

.messageRow.user .message {
  background-color: #43cc47;
}
.messageRow.bot .message {
  background-color: #1982fc;
}
.chatBody::-webkit-scrollbar {
  width: 0px;
  height: 100%;
}
</style>
