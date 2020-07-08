let usage = `
<Button big>Big</Button>&nbsp;
<Button icon="add">Left Icon</Button>&nbsp;
<Button icon-right="expand_more">Right Icon</Button>&nbsp;
<Button alt>Alt</Button>&nbsp;
<Button icon="add" alt>Alt icon</Button>&nbsp;
<Button plain>Plain </Button>&nbsp;
<Button disabled>Disabled</Button>&nbsp;
<Button icon="menu" big plain></Button>&nbsp;
<Button icon="menu" big></Button>&nbsp;
<Button icon="menu" small plain>Small Button</Button>&nbsp;
<Button mobile-bottom>Mobile Button</Button>&nbsp;
<Button icon="menu" plain></Button>&nbsp;
<Button icon="menu"></Button>&nbsp;
<Button link="https://github.com/highqualitycode" plain>Click here</Button>
<Button link="https://github.com/highqualitycode" icon="account_circle">Github</Button>&nbsp;
<Button link="https://github.com/highqualitycode" icon="insert_chart" small link-ico>Full Report</Button>&nbsp;
<Button padding="15px 40px">Add</Button>
<Button padding="13px 40px" alt-two>Cancel</Button>
<Button icon="add_circle" icon-color="primary" color="primary" plain-two space-between="4px">Add New Item</Button>
<Button color="red" link="https://github.com/highqualitycode" icon="insert_chart" small link-ico>Full Report</Button>&nbsp;
<Button padding="13px 40px" gray>Gray</Button>
<!-- OR -->
<button class="ds-button ds-button-primary">
  Button Label
</button>
`.slice(1);

export default {
  usage
};
