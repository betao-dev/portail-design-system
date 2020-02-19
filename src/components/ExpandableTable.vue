<template>
  <div class="ds-expand-table-wrapper">
    <div class="ds-expand-table-header">
      <div
        class="ds-column-header"
        v-for="(column, index) in columns"
        :key="index"
        :style="getFlex(column)"
      >
        <span>{{ column.title }}</span>
        <span v-if="column.sortable" class="icons-wrapper">
          <div @click="sortAsc(column)">▲</div>
          <div @click="sortDsc(column)">▼</div>
        </span>
      </div>
    </div>

    <div class="ds-expand-table-body-wrapper">
      <div
        class="ds-expand-table-row"
        v-for="(data, dataIndex) in dataSource"
        :key="dataIndex"
      >
        <template v-if="!rowExpanded(data)">
          <Card class="ds-data-wrapper" @click="toggleExpand(data)">
            <span
              v-for="(column, index) in columns"
              :style="getFlex(column)"
              :key="index"
            >
              {{ getCellValue(data, column) }}
            </span>
          </Card>
        </template>

        <template v-else>
          <div class="ds-data-expanded">
            <Card @click="toggleExpand(data)" class="ds-expanded-header">
              <span :style="getFlex(columns[0])">
                {{ getCellValue(data, columns[0]) }}
              </span>

              <span :style="getFlex(columns[1])">
                {{ getCellValue(data, columns[1]) }}
              </span>

              <span class="icons-wrapper">
                <Button
                  icon="edit"
                  iconColor="#757575"
                  @click.stop="editAction(data)"
                  plain
                />
                <Button
                  icon="email"
                  iconColor="#757575"
                  @click.stop="sendMailAction(data)"
                  plain
                />
                <Button
                  icon="find_in_page"
                  iconColor="#757575"
                  @click.stop="overviewAction(data)"
                  plain
                />
                <Button
                  icon="print"
                  iconColor="#757575"
                  @click.stop="printAction(data)"
                  plain
                />
                <Button
                  icon="file_download"
                  iconColor="#757575"
                  @click.stop="downloadAction(data)"
                  plain
                />
                <Button
                  icon="content_copy"
                  iconColor="#757575"
                  @click.stop="copyAction(data)"
                  plain
                />
                <Button
                  icon="delete"
                  iconColor="#757575"
                  @click.stop="removeAction(data)"
                  plain
                />
                <Button
                  icon="restore_page"
                  iconColor="#757575"
                  @click.stop="convertAction(data)"
                  plain
                />
              </span>
            </Card>

            <Card class="ds-expanded-body">
              <div
                v-if="data.number && data.invoice_date && data.status"
                class="number-date"
              >
                <span
                  ># {{ data.number }} -
                  {{ data.invoice_date | shortDate }}</span
                >

                <div class="badge-wrapper">
                  <template v-if="!data.is_draft">
                    <Badge :color="getColor(data)">{{
                      `${data.new_status || data.status}` | capitalize
                    }}</Badge>
                  </template>
                  <template v-else>
                    <Badge :color="getColor(data)">{{ 'Draft' }}</Badge>
                  </template>
                </div>
              </div>

              <div v-if="data.invoice_duedate" class="expanded-cell">
                <strong>{{ 'Expiration date: ' }}</strong>
                <span>{{ data.invoice_duedate | shortDate }}</span>
              </div>

              <div v-if="data.emailed_date" class="expanded-cell">
                <strong>{{ 'Date of dispatch: ' }}</strong>
                <span>{{ data.emailed_date | shortDate }}</span>
              </div>

              <div
                v-if="data.payment_type && data.payment_type.value"
                class="expanded-cell"
              >
                <strong>{{ 'Payment type: ' }}</strong>
                <span>{{ data.payment_type.value }}</span>
              </div>

              <div
                v-if="data.client && data.client.title"
                class="expanded-cell"
              >
                <strong>{{ 'Client: ' }}</strong>
                <span>{{ data.client.title }}</span>
              </div>

              <div class="expanded-cell">
                <span v-if="data.has_tva && data.totalTTC">
                  <strong>{{ 'Total TTC: ' }}</strong>
                  <span> {{ data.totalTTC() }}</span>
                </span>

                <span v-if="!data.has_tva && data.totalTTC">
                  <strong>{{ 'Total: ' }}</strong>
                  <span>{{ data.totalTTC() }}</span>
                  <span>{{ ' ' }}</span>
                </span>

                <small
                  style="color: #73C077;"
                  v-if="data.deposit && data.deposit.prepaid_amount"
                >
                  <strong>
                    <span>(</span>
                    <span>{{ 'including ' }}</span>
                    <span>{{ data.deposit.prepaid_amount }}</span>
                    <span v-if="data.deposit.has_percentage">%</span>
                    <span v-else>€ </span>
                    <span>{{ 'deposit' }}</span>
                    <span>) </span>
                  </strong>
                </small>

                <small style="color: #73C077;" v-if="data.has_disbursement">
                  <strong>
                    <span>(</span>
                    <span>{{ 'With ' }}</span>
                    <span>{{ data.total_disbursement }}</span>
                    <span>€</span>
                    <span>{{ 'of disbursement ' }}</span>
                    <span>)</span>
                  </strong>
                </small>
              </div>

              <div v-if="data.emailed_date" class="expanded-cell">
                <span>{{ 'Emailed to client ' }}</span>
                <span>{{ data.emailed_date | shortDate }}</span>
              </div>

              <div v-else class="expanded-cell">
                {{ 'Not emailed to client' }}
              </div>
            </Card>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import Card from './Card';
import Button from './Button';
import Badge from './Badge';
import { get, isEqual } from 'lodash';

export default {
  name: 'ExpandableTable',
  components: { Card, Button, Badge },
  props: {
    dataSource: Array,
    columns: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      expandedRow: null
    };
  },
  methods: {
    getFlex(column) {
      if (column.width) {
        return {
          flexBasis: column.width
        };
      } else {
        return {
          flex: 1
        };
      }
    },
    toggleExpand(data) {
      if (isEqual(data, this.expandedRow)) {
        this.expandedRow = null;
      } else {
        this.expandedRow = data;
      }
    },
    rowExpanded(row) {
      if (isEqual(row, this.expandedRow)) {
        return true;
      } else {
        return false;
      }
    },
    getColor() {
      return 'primary';
    },
    getCellValue(value, column) {
      let extractVal = `${column.prefix || ''} ${get(value, column.key) ||
        ''} ${column.suffix || ''}`;
      if (column.filter) {
        extractVal = column.filter(extractVal);
      }

      return extractVal;
    },
    sortAsc(column) {
      this.dataSource.sort((a, b) =>
        get(a, column.key) >= get(b, column.key) ? 1 : -1
      );
    },
    sortDsc(column) {
      this.dataSource.sort((a, b) =>
        get(a, column.key) <= get(b, column.key) ? 1 : -1
      );
    },
    editAction(data) {
      this.$emit('edit', data);
    },
    sendMailAction(data) {
      this.$emit('sendMail', data);
    },
    overviewAction(data) {
      this.$emit('overview', data);
    },
    printAction(data) {
      this.$emit('print', data);
    },
    downloadAction(data) {
      this.$emit('download', data);
    },
    copyAction(data) {
      this.$emit('copy', data);
    },
    removeAction(data) {
      this.$emit('remove', data);
    },
    convertAction(data) {
      this.$emit('convert', data);
    }
  }
};
</script>

<style lang="less" scoped>
@import '../styles/vars';

.ds-expand-table-wrapper {
  .ds-expand-table-header {
    @media screen and (max-width: 551px) {
      display: none;
    }

    display: flex;
    height: 20px;
    color: @color-gray-500;
    font-family: Lato;
    font-size: 14px;
    line-height: 20px;
    padding: 0 24px 16px;
    cursor: default;
    background-color: transparent;
    box-shadow: none;

    .ds-column-header {
      text-align: right;
      display: flex;
      justify-content: flex-end;
      align-items: center;

      .icons-wrapper {
        line-height: 10px;
        margin-left: 10px;
        font-size: 8px;
      }

      &:first-child {
        text-align: left;
        justify-content: flex-start;
      }
    }
  }

  .ds-expand-table-body-wrapper {
    color: @color-dark;
    font-family: Lato;
    font-size: 14px;
    line-height: 20px;
    cursor: pointer;

    .ds-expand-table-row {
      &:first-child {
        .ds-data-expanded {
          margin-top: 0;
        }
      }

      .ds-data-wrapper {
        display: flex;
        padding: 22px 24px;
        margin-bottom: 1px;
        text-align: right;

        @media screen and (max-width: 551px) {
          flex-wrap: wrap;
          justify-content: space-between;
          padding: 16px 16px 12px 16px;
        }

        span {
          &:first-child {
            text-align: left;
          }

          @media screen and (max-width: 551px) {
            font-size: 14px;

            &:first-child {
              flex-basis: 100% !important;
              font-size: 16px;
              line-height: 24px;
              margin-bottom: 16px;
            }

            &:nth-child(2) {
              text-align: left;
            }
          }
        }
      }

      &:last-child {
        .ds-data-wrapper {
          margin-bottom: 24px;
        }
      }

      .ds-data-expanded {
        margin-bottom: 16px;
        margin-top: 16px;

        .ds-expanded-header {
          display: flex;
          align-items: center;
          border-bottom: solid 1px #eee;
          padding: 14px 24px;

          > span {
            text-align: right;

            &:first-child {
              text-align: left;
            }
          }

          .icons-wrapper {
            flex: 1;
          }
        }

        .ds-expanded-body {
          .number-date {
            font-size: 16px;
            margin-bottom: 10px;

            .badge-wrapper {
              display: inline-block;
              margin-left: 20px;
            }
          }

          .expanded-cell {
            line-height: 28px;
          }
        }
      }
    }
  }
}
</style>
