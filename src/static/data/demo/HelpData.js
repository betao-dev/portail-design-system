let usage = `
<Button ref="help" padding="30px" alt-two>
  Custom Tooltip
</Button>
<Help :target="$refs.help" :position="position" :margin="20">
  <div class="ds-help-content">
    New Tooltip
  </div>
</Help>

<Button ref="helpDark" padding="30px" alt-two>
  Dark Custom Tooltip
</Button>
<Help :target="$refs.helpDark" :position="position" :margin="20" dark>
  <div class="ds-help-content">
    New Tooltip
  </div>
</Help>
`.slice(1);

export default {
  usage
};
