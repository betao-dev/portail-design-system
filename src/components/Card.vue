<!--
  Basic styled component: background, padding, shadow.

  Usage:

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
-->
<template>
  <div class="card">
    <div class="card-header">
      <slot name="cover"></slot>
    </div>

    <template v-if="type === 'task'">
      <div class="card-body">
        <div class="complete-status">
          <Button v-if="completed" class="completed-button" icon="check_circle_outline">Done</Button>
          <Button v-else class="uncompleted-button" icon="info">Needs Response</Button>
          <div className="task-number">{{ taskNumber }}</div>
        </div>
        <div :class="{'completed': completed}">
          <slot></slot>
        </div>
      </div>
    </template>

    <template v-else-if="type === 'report'">
      <div class="card-body">
        <div class="card-title">{{ title }}</div>
        <template v-if="reportValue">
          <div class="report-content">
            <Icon size="20px" padding="8px 16px 8px 0" arrow_upward/>
            <span class="font-desktop-h-2-red report-value">{{ reportValue }}</span>
          </div>
          <div class="report-footer">{{ extra }}</div>
        </template>
      </div>
    </template>

    <template v-else>
      <div class="card-body">
        <template v-if="title">
          <div class="card-title">{{ title }}</div>
        </template>

        <template v-if="description">
          <div class="card-description">{{ description }}</div>
        </template>

        <slot></slot>

        <template v-if="extra">
          <div class="card-footer">{{ extra }}</div>
        </template>
      </div>
    </template>
  </div>
</template>

<script>
import Icon from './Icon.vue'

export default {
  name: 'Card',
  components: { Icon },
  props: {
    type: {
      type: String
    },
    title: {
      type: String
    },
    description: {
      type: String
    },
    extra: {
      type: String
    },
    completed: {
      type: Boolean
    },
    taskNumber: {
      type: String
    },
    reportValue: {
      type: String
    }
  }
}
</script>

<style lang="less">
@import '~@/styles/vars';

.card {
  border-radius: @card-br;
  background-color: @color-white;
  box-shadow: @card-shadow;

  .card-header {
    img {
      width: 100%;
    }
  }
  
  .card-body {
    padding: @card-padding;

    .card-title {
      margin-bottom: @card-spacing-unit;
    }

    .card-description {
      color: @color-gray-300;
    }

    .card-footer {
      margin-top: @card-spacing-unit * 2;
    }

    .complete-status {
      display: flex;
      justify-content: space-between;
      margin-bottom: @card-spacing-unit;
      color: @color-gray-500;

      .completed-button {
        border-radius: @card-spacing-unit * 2;
        padding: 5px 12px;
      }

      .uncompleted-button {
        border-radius: @card-spacing-unit * 2;
        padding: 5px 12px;
        background: @color-red;
      }
    }

    .completed {
      text-decoration: line-through;
      color: @color-gray-500;
    }

    .report-content {
      margin-bottom: @card-spacing-unit * 2;
      display: flex;
      align-items: center;

      .report-value {
        color: @color-red;
        font-size: @vu * 6;
      }
    }

    .report-footer {
      font-size: @vu * 3;
    }
  }
}
</style>
