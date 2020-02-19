let usage = `
<Tooltip
  popoverWidth="200px"
  placement="left"
  :forceShow="forceShow"
  @update:forceShow="forceShowUpdate"
  @onMouseOver="onMouseOver"
  @onMouseOut="onMouseOut"
>
  <div slot="popover">This is a tooltip content</div>
  <div slot="reference">
    <Button>Left</Button>
  </div>
</Tooltip>

<Tooltip
  popoverWidth="560px"
  poperHeight="175px"
  poperPadding="20px 40px 50px 30px"
  poperMargin="0 0 0 30px"
  poperBoxSizing="border-box"
  placement="right-start"
  type="custom"
  :forceShow="forceShow"
  :forceHide="true"
  @update:forceShow="forceShowUpdate"
>
  <div slot="popover">
    ...
  </div>
  <div slot="reference">
    <Button padding="40px 10px">Custom Tooltip</Button>
  </div>
</Tooltip>
    
<Tooltip type="mini">
  <div>This is the mini Tooltip content</div>
  <div>Second line of mini tooltip</div>
</Tooltip>
`.slice(1);

export default {
  usage
};
