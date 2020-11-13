let usage = `
  <BottomSheet :opened.sync="opened" height="500px">
    <template #content>
      <div>
        <div>BottomSheet Title</div>
        <div>Content ...</div>
      </div>
    </template>
  </BottomSheet>
`.slice(1);

export default {
  usage
};
