<template>
  <!-- 数据分析 -->
  <div class="order-container">
    <div class="order-filter">
      <el-form
        ref="filterform"
        :model="form"
        label-width="left"
        size="small"
        :inline="true"
        label-position="left"
      >
        <el-form-item label="推广渠道" prop="orderChannel">
          <el-select v-model="form.orderChannel" placeholder="请选择" style="width:100%" clearable>
            <!-- <el-option
                  v-for="item in channel_code"
                  :key="item.guid"
                  :label="item.text"
                  :value="item.key"
            ></el-option>-->
            <el-option
              v-for="item in channel_code"
              :key="item.guid"
              :label="item.text"
              :value="item.key"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="推广产品" prop="vehicleType">
          <el-select v-model="form.promoteProducts" placeholder="请选择" clearable>
            <!-- <el-option
                  v-for="item in promoteProductsOptions"
                  :key="item.productCode"
                  :label="item.productName"
                  :value="item.productCode"
            ></el-option>-->
            <el-option
              v-for="item in promoteProductsOptions"
              :key="item.guid"
              :label="item.text"
              :value="item.key"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="申请日期" prop="applyDate">
          <el-date-picker
            :picker-options="pickerOptions"
            v-model="applyDate"
            value-format="yyyy-MM-dd"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            style="margin-right:10px;"
            size="small"
            @click="queryEchartsData"
          >生成统计</el-button>
          <el-button type="primary" size="small" @click="statisticalExport">下载到excel</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="order-table">
      <div class="table-tools">
        <div id="echarts" style="width:80%;height:500px;margin: 0 auto;"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { Form as ElForm } from "element-ui";
import "echarts/lib/chart/bar";
let echarts = require("echarts");
import { exportRafficData, getDictionaryList } from "@/api/common";
import { getexportRafficData } from "@/api/order";
import qs from "qs";

import {
  getOrderList, // 订单列表查询
  exportOrdersList, // 订单列表统计查询导出
  orderBusApprove, // 业务审批通过或驳回
  orderFinanceApprove, // 转账成功或驳回
  statisticsQuery, // 统计查询
  exportStatisticsQuery, //  统计查询导出
  getProductDictionary, // 统计下拉框查询
  getProductChannel, // 推广渠道统计下拉字典查询
} from "@/api/allOrder";

@Component({
  name: "dataAnalysis",
})
export default class extends Vue {
  // 查询参数
  private form = {
    promoteProducts: "", // 推广产品
    orderChannel: "", //订单渠道
  };
  private applyDate: any = []; //申请日期
  // 字典状态
  channel_code = []; //渠道

  // 推广产品
  promoteProductsOptions = [];
  // echarts 数据
  // 渠道商
  private channelBusiness: any[] = [];
  // 日期
  private echartsDate: any[] = [];
  private statisticsResult: any[] = [];
  private choiceDate: any = "";

  private pickerOptions = {
    // 日期最大范围一个月的限制
    disabledDate: (time: any) => {
      const now = Date.now();
      const seven = 31 * 24 * 60 * 60 * 1000;
      const sevenDays = now - seven;
      return time.getTime() > now || time.getTime() < sevenDays;
    },
  };
  mounted() {
    // this.fetchDictionaryList("channel_code");
    this.getProductChannel();
    this.promoteProducts();
    this.getTimeFn();
  }
  @Watch("applyDate")
  getOrderTime(newVal: any, oldVal: any) {
    if (newVal == null) {
      this.applyDate = [];
    }
  }

  // 获取字典项
  private async fetchDictionaryList(type: any) {
    const _self = this;
    const { data } = await getDictionaryList({
      type,
    });
    _self[type] = data.data.filter((item: any, index: number) => {
      return item.key !== "00";
    });
  }

  private async queryEchartsData() {
    if (this.form.promoteProducts == "" && this.form.orderChannel == "") {
      this.$message.error({
        message: "推广渠道与推广产品必须选择一个",
        type: "warning",
        duration: 3000,
      });
      return;
    }

    let obj = {
      productName: this.form.promoteProducts,
      channel: this.form.orderChannel,
      startTime: this.applyDate[0] == undefined ? "" : this.applyDate[0],
      endTime: this.applyDate[1] == undefined ? "" : this.applyDate[1],
    };

    // if (obj.productName !== "" && obj.channel !== "") {
    //   this.$message.error({
    //     message: "推广渠道与推广产品只能选择一个",
    //     type: "warning",
    //     duration: 3000,
    //   });
    //   return;
    // } else
    if (obj.startTime == "" && obj.endTime == "") {
      this.$message.error({
        message: "请选择申请时间",
        type: "warning",
        duration: 3000,
      });
      return;
    }
    let { data } = await statisticsQuery(obj);
    this.echartsDate = data.data.dateLists;
    this.channelBusiness = data.data.legend;
    this.statisticsResult = data.data.statisticsResult;
    this.myEcharts();
  }
  private myEcharts() {
    // 基于准备好的dom，初始化echarts实例
    let myChart = echarts.init(document.getElementById("echarts"));
    // 指定图表的配置项和数据
    let option = {
      color: [
        "#FF3333",
        "#FF6666",
        "#FFA011",
        "#FFCF88",
        "#22A7FF",
        "#AADDFF",
        "#74BB44",
        "#1AE61A",
      ],
      trigger: "axis",
      animation: true,
      grid: {
        top: "67",
        left: "32",
        bottom: "15",
        containLabel: true,
      },
      legend: {
        show: true,
        orient: "vertical",
        // top: 10,
        right: "0",
        data: this.channelBusiness,
        textStyle: {
          fontSize: 14,
          color: "black",
        },
      },
      tooltip: {},
      xAxis: [
        {
          type: "category",
          data: this.echartsDate,
          axisTick: {
            alignWithLabel: true,
          },
          nameTextStyle: {
            color: "#fff",
          },
          axisLabel: {
            interval: 0,
            rotate: 45,
            textStyle: {
              color: "black",
            },
            margin: 20,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
          axisLabel: {
            textStyle: {
              color: "black",
            },
            formatter: "{value}",
          },
          splitLine: {
            lineStyle: {
              type: "solid",
              // color: "RGB(47,68,114)",
            },
          },
          axisLine: {
            show: true,
            lineStyle: {
              // color: "RGB(47,68,114)",
            },
          },
        },
      ],
      series: this.statisticsResult,
    };
    myChart.setOption(option, true);
  }

  // 报表导出
  private statisticalExport() {
    let obj = {
      productName: this.form.promoteProducts,
      channel: this.form.orderChannel,
      startTime: this.applyDate[0] == undefined ? "" : this.applyDate[0],
      endTime: this.applyDate[1] == undefined ? "" : this.applyDate[1],
    };
    location.href = `${exportStatisticsQuery}?${qs.stringify(obj)}`;
  }

  // 推广渠道统计下拉字典查询 更换接口
  private async getProductChannel() {
    let { data } = await getProductChannel();
    this.channel_code = data.data;
  }

  // 推广产品下拉
  private async promoteProducts() {
    let { data } = await getProductDictionary(); // 更换接口
    console.log("000", data);
    this.promoteProductsOptions = data.data;
  }

  // =====================================
  // 获取今日时间
  private getTimeFn() {
    const that = this;
    const end = new Date();
    const start = new Date();
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
    this.applyDate.push(that.formatDate(start));
    this.applyDate.push(that.formatDate(end));
  } //  默认七天时间范围 并格式化时间
  private formatDate(date: any) {
    var myyear = date.getFullYear();
    var mymonth = date.getMonth() + 1;
    var myweekday = date.getDate();
    if (mymonth < 10) {
      mymonth = "0" + mymonth;
    }
    if (myweekday < 10) {
      myweekday = "0" + myweekday;
    }
    return myyear + "-" + mymonth + "-" + myweekday;
  }
}
</script>

<style lang="scss">
.order {
  &-container {
    margin: 20px;
  }

  &-header {
    padding: 20px;
    background: #fff;
    margin-bottom: 20px;
    border-radius: 4px;
  }

  &-filter {
    padding: 20px;
    background: #fff;
    margin-bottom: 20px;
    border-radius: 4px;
  }

  &-table {
    padding: 20px;
    background: #fff;
    margin-bottom: 20px;
    border-radius: 4px;
    .table-tools {
      margin-bottom: 20px;
    }
  }
}
.el-form-item {
  margin-right: 20px !important;
}
// .table-pagination {
//   display: flex;
//   align-items: center;
//   justify-content: flex-end;
//   margin-top: 20px;
// }
// .customerName {
//   color: #108ee9;
// }
// .el-table td,
// .el-table th {
//   text-align: center;
// }
// .el-dialog__body {
//   padding: 5px 20px 20px 20px;
//   color: #1f2d3d;
//   font-size: 14px;
//   word-break: break-all;
// }
// .el-dialog__footer {
//   padding: 0px 20px 20px 20px;
//   text-align: right;
//   box-sizing: border-box;
// }
</style>
