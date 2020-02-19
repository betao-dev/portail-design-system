let usage = `
<TextArea v-model="messageText"
          :label="labelText"
          :placeholder="placeholder"
          :rows="5">
</TextArea>
<TextArea v-model="messageText"
          :label="secondlabelText"
          :placeholder="placeholder"
          :rows="5"
          :validators="validators">
</TextArea>
`.slice(1);

export default {
  usage
};
