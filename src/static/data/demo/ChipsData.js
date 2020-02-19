let usage = `
<Chips v-model="simpleChips" :searchable="searchable" @update:searchable="updateSearchable" :removable="true">
  <template slot="search">
    <Input class="search-input" v-model="searchInput" ref="searchInput" />
    <Dropdown class="search-drop" :target="$refs.searchInput" :opened="true" position="bottom-middle">
      <div class="search-drop-list-wrapper">
        <div @click="searchItemClick(searchItem)" v-for="(searchItem, index) of searchList" :key="index" class="search-item">
          <div class="client-title">{{ searchItem.title }}</div>
          <div class="client-id">Identificant client: {{ searchItem.id }}</div>
        </div>
      </div>
    </Dropdown>
  </template>
</Chips>

<Chips v-model="chips"
       :removable="true"
       :label="label"
       :placeholder="placeholder"
       :validators="validators"
       @update:chips="updateChips">
</Chips>
`.slice(1);

export default {
  usage
};
