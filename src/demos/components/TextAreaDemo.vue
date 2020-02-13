<template>
  <div class="row-col">
    <h3>TextArea</h3>
    Custom textarea component

    <Description compnent-name="TextArea"></Description>

    <Collapser :opened.sync="openUsage" label="Usage">
      <pre v-highlightjs="usage"><code class="html"></code></pre>
    </Collapser>

    <div class="general-wrapper">
      <div class="textarea-wrapper">
        <TextArea v-model="messageText"
                  :label="labelText"
                  :placeholder="placeholder"
                  :maxCharacters="500"
                  :rows="5">
        </TextArea>
      </div>
      <div class="textarea-wrapper">
        <TextArea v-model="messageText"
                  :label="secondlabelText"
                  :placeholder="placeholder"
                  :rows="5"
                  :validators="validators">
        </TextArea>
      </div>
    </div>
  </div>
</template>

<script>
import TextArea from '../../components/TextArea.vue';
import Description from '../../descriptions/Description.vue';
import Collapser from '../../components/Collapser.vue';
import {TextAreaData} from '../../static/index'

export default {
    name: 'TextAreaDemo',
    components: {TextArea, Description, Collapser},
    data: () => ({
      openUsage: true,
      usage: TextAreaData.usage,
      messageText: null,
      labelText: 'Textarea',
      secondlabelText: 'Textarea with errors',
      placeholder: 'Placeholder',
      validators: [
        {
          name: 'required',
          message: 'The textarea is required',
          validator: value => !!value
        },
        {
          name: 'min-length',
          message: 'The textarea length is required to be equal 10 or more symbols',
          validator: value => value && value.length >= 10
        }
      ]
    })
}
</script>

<style lang="less" scoped>
  .general-wrapper {
    display: flex;
    justify-content: space-between;

    .textarea-wrapper {
      display: inline-block;
      width: 400px;
    }
  }

</style>
