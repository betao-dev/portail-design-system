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
<TextArea
  v-model="emailText"
  :validators="validators"
  height="320px"
  alt
  :max-characters="2000"
></TextArea>
`.slice(1);

export default {
  usage
};
