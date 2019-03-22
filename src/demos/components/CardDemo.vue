<template>
  <div class="row-col">
    <h3>Card</h3>

    Basic styled component: background, padding, shadow.

    <pre v-highlightjs="usage"><code class="html"></code></pre>

    <div style="margin-bottom: 16px">
      <Card>Hello, World!</Card>
    </div>

    <div style="margin-bottom: 16px">
      <Card title="Information Personalities">
        <Button alt>Test Button</Button>
      </Card>
    </div>
    
    <div style="margin-bottom: 16px">
      <Card
        title="Information Personalities"
        extra="Discover offer"
        description="Change your registration information, such as name, number, and address."
      />
    </div>

    <div style="margin-bottom: 16px">
      <Card
        title="Information personalities"
        extra="Discover offer"
        description="Change your registration information, such as name, number, and address."
      >
        <template #cover>
          <img src="/card.png" />
        </template>
      </Card>
    </div>

    <div style="margin-bottom: 16px">
      <Card
        :completed="true"
        type="task"
        taskNumber="27.16.19"
      >
        This task is completed
      </Card>
    </div>

    <div style="margin-bottom: 16px">
      <Card
        :completed="false"
        type="task"
        taskNumber="27.16.19"
      >
        This task is not completed
      </Card>
    </div>

    <div style="margin-bottom: 16px">
      <Card
        type="report"
        title="Chiffre d'affiries realise en 2018"
        reportValue="94.22"
        extra="don't 0,00 ce mois-ci"
      />
    </div>
  </div>
</template>

<script>
import Card from '../../components/Card.vue'
import Button from '../../components/Button.vue'

let usage = `
<Card>Hello, World!</Card>

<Card title="Information Personalities">
  <Button alt>Test Button</Button>
</Card>

<Card
  title="Information Personalities"
  extra="Discover offer"
  description="Change your registration information, such as name, number, and address."
/>

<Card 
  :completed="true"
  type="task"
  taskNumber="27.16.19"
>
  This task is completed
</Card>

<Card
  :completed="false"
  type="task"
  taskNumber="27.16.19"
>
  This task is not completed
</Card>

<Card
  type="report"
  title="Chiffre d'affiries realise en 2018"
  reportValue="94.22"
  extra="don't 0,00 ce mois-ci"
/>

`.slice(1)

export default {
  name: 'CardDemo',
  components: { Card, Button },
  data: () => ({ usage })
}
</script>
