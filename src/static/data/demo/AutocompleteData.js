let usage = `
<Autocomplete v-model="chosenDay"
              type="day"
              label="Day"
              keyboard="digital"
              :validators="validators"
              :daysMonth="28"
              required>
</Autocomplete>

<Autocomplete v-model="chosenMonth"
              type="month"
              label="Month"
              :validators="validators"
              required>
</Autocomplete>

<Autocomplete v-model="chosenYear"
              type="year"
              label="Year"
              :validators="validators"
              required>
</Autocomplete>

<Autocomplete v-model="chosenCustom"
              keyboard="alphabet"
              label="Custom"
              :data-list="dataList"
              :validators="validators">
</Autocomplete>
`.slice(1);

export default {
  usage
};
