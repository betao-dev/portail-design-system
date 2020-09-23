<template>
  <div class="row-col">
    <h3>Chips</h3>
    <p>The list items are displayed as 'chips'</p>

    <Description compnent-name="Chips"></Description>
    <Collapser :opened.sync="openUsage" label="Usage">
      <pre v-highlightjs="usage"><code class="html"></code></pre>
    </Collapser>

    <Chips
      class="ds-demo-chips"
      v-model="simpleChips"
      :searchable="searchable"
      @update:searchable="updateSearchable"
      :removable="true"
    >
      <template slot="search">
        <Input class="search-input" v-model="searchInput" ref="searchInput" />
        <Dropdown
          class="search-drop"
          :target="$refs.searchInput"
          :opened="true"
          position="bottom-middle"
        >
          <div class="search-drop-list-wrapper">
            <div
              @click="searchItemClick(searchItem)"
              v-for="(searchItem, index) of searchList"
              :key="index"
              class="search-item"
            >
              <div class="client-title">{{ searchItem.title }}</div>
              <div class="client-id">
                Identificant client: {{ searchItem.id }}
              </div>
            </div>
          </div>
        </Dropdown>
      </template>
      ></Chips
    >

    <Chips
      class="ds-demo-chips"
      v-model="chips"
      :removable="true"
      :placeholder="placeholder"
      :validators="validators"
    >
    </Chips>

    <Chips
      class="ds-demo-chips"
      v-model="emails"
      :validators="emailValidators"
      label="Email du destinataire :"
      alt
    >
      <template slot="right">
        <CheckBox v-model="sendCopy" label="M’envoyer une copie"></CheckBox>
      </template>
    </Chips>
  </div>
</template>

<script>
import Chips from '../../components/Chips.vue';
import Input from '../../components/Input';
import Dropdown from '../../components/Dropdown';
import CheckBox from '../../components/CheckBox';
import Description from '../../descriptions/Description';
import Collapser from '../../components/Collapser.vue';
import { ChipsData } from '../../static/index';

const EMAIL = /^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
/* eslint no-useless-escape: "off" */
const EMAIL2 = /^(([^<>()\[\]\\.,;:\s@"+]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default {
  name: 'ChipsDemo',
  components: { CheckBox, Chips, Input, Dropdown, Description, Collapser },
  data: () => ({
    openUsage: true,
    usage: ChipsData.usage,
    simpleChips: ['apple', 'banana', 'grapefruit'],
    chips: ['test@gmail.com'],
    emails: [
      'test@gmail.com',
      'sdfsdfsd',
      'france@gmail.com',
      'sdfdsfs',
      'test@gmail.com',
      'test@gmail.com',
      'test@gmail.com'
    ],
    label: 'Recipient email',
    placeholder: 'Add a recipient',
    searchable: false,
    searchInput: '',
    searchList: [
      { title: 'General Client', id: '1929322' },
      { title: 'Secondary Client', id: '0939283' }
    ],
    validators: [
      {
        name: 'required',
        message: 'The field is required',
        validator: value => !!value.length
      },
      {
        name: 'email',
        message: 'The email field must be a valid email',
        validator: value => EMAIL.test(value)
      }
    ],
    emailValidators: [
      {
        name: 'required',
        message: 'The field is required',
        validator: value => {
          return !!value.length;
        }
      },
      {
        name: 'email',
        message: 'The email field must be a valid email',
        validator: value => EMAIL2.test(value)
      }
    ],
    sendCopy: false
  }),
  methods: {
    searchItemClick(item) {
      this.simpleChips = [...this.simpleChips, item.title];
      this.searchInput = '';
      this.searchable = false;
    },
    updateSearchable(val) {
      this.searchable = val;
    }
  }
};
</script>

<style lang="less">
@import '../../styles/vars';

.search-input {
  width: 100%;
}

.search-drop {
  width: 100%;

  .search-drop-list-wrapper {
    width: 100%;
    padding: 0 15px;
    border-radius: 2px;
    border: solid 1px @color-gray-300;
    box-sizing: border-box;
    background-color: white;

    .search-item {
      padding: 15px 0;
      border-bottom: solid 2px @color-gray-300;

      &:last-child {
        border-bottom: none;
      }

      .client-title {
        font-size: 14px;
      }

      .client-id {
        font-size: 12px;
      }
    }
  }
}

.ds-demo-chips {
  margin-bottom: 20px;
}
</style>
