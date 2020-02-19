<template>
  <div class="description">
    <Collapser
      :opened.sync="openedProps"
      v-if="description[compnentName].properties.length"
      label="Properties"
    >
      <ul>
        <li v-for="property in description[compnentName].properties">
          <b>{{ property.name }}</b
          >: <i>{{ property.type }}</i> - {{ property.description }}
          <span v-if="property.default"
            ><b>By default: </b><u>{{ property.default }}</u></span
          >
          <ul v-if="property.subProperty">
            <li v-for="subProperty in property.subProperty">
              <b>{{ subProperty.name }}</b
              >: <i>{{ subProperty.type }}</i> - {{ subProperty.description }}
            </li>
          </ul>
        </li>
      </ul>
    </Collapser>

    <Collapser
      :opened.sync="openedEvents"
      v-if="description[compnentName].events.length"
      label="Events"
    >
      <ul>
        <li v-for="property in description[compnentName].events">
          <b>{{ property.name }}</b
          >: <i>{{ property.type }}</i> <span v-if="property.type">-</span>
          {{ property.description }}
          <ul v-if="property.subProperty">
            <li v-for="subProperty in property.subProperty">
              <b>{{ subProperty.name }}</b
              >: <i>{{ subProperty.type }}</i> - {{ subProperty.description }}
            </li>
          </ul>
        </li>
      </ul>
    </Collapser>

    <Collapser
      :opened.sync="openedSlots"
      v-if="
        description[compnentName].slots &&
          description[compnentName].slots.length
      "
      label="Slots"
    >
      <ul>
        <li v-for="property in description[compnentName].slots">
          <b>{{ property.name }}</b
          >: <i>{{ property.type }}</i> <span v-if="property.type">-</span>
          {{ property.description }}
          <ul v-if="property.subProperty">
            <li v-for="subProperty in property.subProperty">
              <b>{{ subProperty.name }}</b
              >: <i>{{ subProperty.type }}</i> - {{ subProperty.description }}
            </li>
          </ul>
        </li>
      </ul>
    </Collapser>
  </div>
</template>

<script>
import description from './description';
import Collapser from '../components/Collapser';

export default {
  components: { Collapser },
  name: 'Description',
  props: {
    compnentName: String
  },
  data: () => ({
    description,
    openedProps: false,
    openedEvents: false,
    openedSlots: false
  })
};
</script>
