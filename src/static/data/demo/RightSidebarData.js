let usage = `
  <RightSidebar :opened="showSidebar">
    <div slot="content">
      <div class="sidebar-header">
        <div class="title">Sidebar Title</div>
        <div class="close" @click="toggleRightSidebar">
          <Icon size="14px" color="white" close />
        </div>
      </div>
    </div>
  </RightSidebar>
`.slice(1);

export default {
  usage
};
