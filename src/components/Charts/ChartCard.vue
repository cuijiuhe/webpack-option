<template>
  <el-card>
    <div class="chart-card-header">
      <div class="meta">
        <span>
          <slot name="title">
            {{ title }}
          </slot>
        </span>
        <span class="chart-card-action">
          <slot name="action"></slot>
        </span>
      </div>
      <div class="total">
        <slot name="total">
          <span :style="'color:'+totalColor">{{ typeof total === 'function' && total() || total }}</span>
        </slot>
      </div>
    </div>
    <div class="chart-card-content">
      <div class="content-fix">
        <slot name="body"></slot>
      </div>
    </div>
    <div class="chart-card-footer">
      <div class="field">
        <slot name="footer"></slot>
      </div>
    </div>
  </el-card>
</template>
<script>
export default {
  name: "ChartCard",
  props: {
    title: {
      type: String,
      default: ""
    },
    total: {
      type: [Function, Number, String],
      required: false,
      default: null
    },
    totalColor: {
      type: String,
      default: "#303133"
    },
    loading: {
      type: Boolean,
      default: false
    }
  }
};
</script>
<style>
.chart-card-header {
  position: relative;
  overflow: hidden;
  width: 100%;
}
.chart-card-header > .meta {
  position: relative;
  overflow: hidden;
  width: 100%;
  color: #4D565F;
  font-size: 14px;
  line-height: 22px;
}

.chart-card-action {
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;
}
.chart-card-footer {
  border-top: 1px solid #e8e8e8;
  padding-top: 9px;
  margin-top: 8px;
}
.chart-card-footer > div {
  position: relative;
}
.chart-card-footer > .field {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;
}
.chart-card-content {
  margin-bottom: 5px;
  position: relative;
  height: 60px;
  width: 100%;
}
.chart-card-content > .content-fix {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
}
.total {
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
  white-space: nowrap;
  margin-top: 4px;
  margin-bottom: 0;
  font-size: 25px;
  line-height: 38px;
  height: 38px;
}
</style>
