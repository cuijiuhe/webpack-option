<template>
  <!-- 全部订单 -->
  <div class="list-container">
    <div class="list-filter">
      <el-form
        ref="filterform"
        :model="form"
        label-width="left"
        size="small"
        :inline="true"
        label-position="left"
      >
        <el-form-item label="订单编号" prop="orderNum">
          <el-input
            v-model="form.orderNum"
            suffix-icon="el-icon-date"
            placeholder="请输入订单编号"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="推广产品" prop="clientName">
          <el-input
            v-model="form.productName"
            suffix-icon="el-icon-date"
            placeholder="请输入推广产品名称"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="产品编码" prop="spreaderName">
          <el-input
            v-model="form.productNum"
            suffix-icon="el-icon-date"
            placeholder="输请输入编码/ID"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="订单渠道" prop="channelSource">
          <el-select
            v-model="form.channelSource"
            placeholder="请选择"
            clearable
          >
            <el-option
              v-for="item in channel_code"
              :key="item.guid"
              :label="item.text"
              :value="item.key"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="订单状态" prop="vehicleType">
          <el-select v-model="form.orderStatus" placeholder="请选择" clearable>
            <el-option
              v-for="item in order_status"
              :key="item.guid"
              :label="item.text"
              :value="item.key"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="推广人" prop="vehicleNo">
          <el-input
            v-model="form.customerName"
            suffix-icon="el-icon-date"
            placeholder="姓名/手机号/推广码"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="审核状态" prop="orderChannel">
          <el-select
            v-model="form.cashStatus"
            placeholder="请选择"
            style="width: 100%"
            clearable
          >
            <el-option
              v-for="item in cash_status"
              :key="item.guid"
              :label="item.text"
              :value="item.key"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="驳回原因" prop="failReason">
          <el-select
            v-model="form.failReason"
            placeholder="请选择"
            style="width: 100%"
            clearable
          >
            <el-option
              v-for="item in rejection_reason"
              :key="item.guid"
              :label="item.text"
              :value="item.key"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="会员编码" prop="payMember">
          <el-input
            v-model="form.payMember"
            suffix-icon="el-icon-date"
            placeholder="请输入会员编码"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="会员手机号" prop="memberPhone">
          <el-input
            v-model="form.memberPhone"
            suffix-icon="el-icon-date"
            placeholder="请输入会员手机号"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="下单时间" prop="applyDate">
          <el-date-picker
            v-model="orderTime"
            value-format="yyyy-MM-dd"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="业务审核时间" prop="workAuditTime">
          <el-date-picker
            v-model="businessReviewTime"
            value-format="yyyy-MM-dd"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getList">搜索</el-button>
          <el-button plain @click="clearFilterList">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="list-table">
      <div class="table-tools">
        <span style="margin-right: 10px">批量操作</span>
        <el-button
          v-checkbtn="['business_pass_btn']"
          type="primary"
          size="small"
          @click="businessAudit"
          >业务通过</el-button
        >
        <el-button
          v-checkbtn="['business_rejection_btn']"
          type="danger"
          size="small"
          @click="reviewRejected"
          >业务驳回</el-button
        >
        <el-button
          v-checkbtn="['success_transfer_btn']"
          type="primary"
          size="small"
          @click="transferSuccessful"
          >转账成功</el-button
        >
        <el-button
          v-checkbtn="['financial_rejection_btn']"
          type="danger"
          size="small"
          @click="financeRejected"
          >财务驳回</el-button
        >
        <el-button type="primary" size="small" @click="exportDataList"
          >导出报表</el-button
        >
      </div>
      <!-- 列表 -->
      <el-table
        :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
        fit
        :data="tableData"
        border
        @selection-change="handleSelectionChange"
        ref="multipleTable"
        stripe
        v-loading="listLoading"
        row-key="withdrawalId"
        default-expand-all
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <el-table-column
          align="center"
          type="selection"
          fixed
        ></el-table-column>
        <el-table-column
          prop="orderNum"
          label="订单编号"
          width="140"
          align="center"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column
          prop="withdrawalNum"
          label="提现流水号"
          width="100"
          align="center"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column
          prop="withdrawTime"
          label="提现时间"
          width="150"
          align="center"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="productNum"
          label="产品编码"
          width="120"
          align="center"
        ></el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="productName"
          label="产品名称"
          width="150"
          align="center"
        ></el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="paymentAmount"
          label="实付金额"
          align="center"
        ></el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="orderStatus"
          label="订单状态"
          align="center"
        >
          <template slot-scope="scope">{{
            scope.row.orderStatus | checkBaseData(order_status, order_status)
          }}</template>
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="orderTime"
          label="下单时间"
          align="center"
          width="150"
        ></el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="payTime"
          label="支付时间"
          align="center"
          width="150"
        ></el-table-column>

        <el-table-column
          :show-overflow-tooltip="true"
          prop="payMember"
          label="会员编码"
          width="90"
          align="center"
        ></el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="memberPhone"
          label="会员手机号"
          width="110"
          align="center"
        ></el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="memberName"
          label="会员姓名"
          align="center"
        ></el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="cashStatus"
          label="审核状态"
          align="center"
        >
          <template slot-scope="scope">
            <!-- 失效原因补充 -->
            <el-popover trigger="hover" placement="top">
              <p
                style="text-align: center"
                v-if="scope.row.reasonForInvalidAudit"
              >
                失效原因：{{ scope.row.reasonForInvalidAudit }}
              </p>
              <p style="text-align: center" v-else>
                {{
                  scope.row.cashStatus | checkBaseData(cash_status, cash_status)
                }}
              </p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{
                  scope.row.cashStatus | checkBaseData(cash_status, cash_status)
                }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="withdrawBonus"
          label="预估佣金"
          align="center"
        ></el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="transferAmount"
          label="实付佣金"
          align="center"
        ></el-table-column>
        <el-table-column
          width="90"
          prop="channelSource"
          label="推广渠道"
          align="center"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="customerName"
          label="推广人"
          align="center"
        ></el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="idCard"
          label="推广人身份证号码"
          width="160"
          align="center"
        ></el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="promoPhone"
          label="推广人电话"
          width="110"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="spreaderEnterprise"
          label="推广人所属企业"
          width="120"
          align="center"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column
          prop="operationTime"
          label="业务审核时间"
          width="150"
          align="center"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column
          prop="failReason"
          label="业务驳回原因"
          width="110"
          align="center"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column
          prop="operationReplenishReason"
          label="业务补充说明"
          width="110"
          align="center"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column
          prop="transferSuccessTime"
          label="财务审核时间"
          width="140"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="failTransferReason"
          label="财务驳回原因"
          width="110"
          :show-overflow-tooltip="true"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="financReplenishReason"
          label="财务补充说明"
          width="110"
          align="center"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column
          prop="accountType"
          label="账户类型"
          align="center"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column
          prop="bankCardNum"
          label="账号"
          width="170"
          align="center"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column
          prop="openingBank"
          label="银行开户行"
          width="150"
          align="center"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column fixed="right" label="操作" align="center" width="160">
          <template slot-scope="scope">
            <el-button
              v-if="
                scope.row.cashStatus == 1
                  ? true
                  : scope.row.cashStatus == -1
                  ? false
                  : scope.row.cashStatus == 3
                  ? false
                  : scope.row.cashStatus == 5
                  ? false
                  : scope.row.cashStatus == 4
                  ? false
                  : scope.row.cashStatus == 6
                  ? false
                  : scope.row.cashStatus == 7
                  ? false
                  : scope.row.cashStatus == 2
                  ? false
                  : scope.row.cashStatus == 0
                  ? false
                  : true
              "
              v-checkbtn="['business_pass_btn']"
              type="text"
              size="mini"
              @click="businessAudit(scope.row)"
              >业务通过</el-button
            >
            <el-button
              v-if="
                scope.row.cashStatus == 1
                  ? true
                  : scope.row.cashStatus == -1
                  ? false
                  : scope.row.cashStatus == 3
                  ? false
                  : scope.row.cashStatus == 5
                  ? false
                  : scope.row.cashStatus == 4
                  ? false
                  : scope.row.cashStatus == 6
                  ? false
                  : scope.row.cashStatus == 7
                  ? false
                  : scope.row.cashStatus == 2
                  ? false
                  : scope.row.cashStatus == 0
                  ? false
                  : true
              "
              v-checkbtn="['business_rejection_btn']"
              type="text"
              size="mini"
              @click="reviewRejected(scope.row)"
              >业务驳回</el-button
            >
            <el-button
              v-if="
                scope.row.cashStatus == 1
                  ? false
                  : scope.row.cashStatus == -1
                  ? false
                  : scope.row.cashStatus == 3
                  ? false
                  : scope.row.cashStatus == 5
                  ? false
                  : scope.row.cashStatus == 4
                  ? false
                  : scope.row.cashStatus == 6
                  ? false
                  : scope.row.cashStatus == 7
                  ? false
                  : scope.row.cashStatus == 2
                  ? true
                  : false
              "
              v-checkbtn="['success_transfer_btn']"
              type="text"
              size="mini"
              @click="transferSuccessful(scope.row)"
              >转账成功</el-button
            >
            <el-button
              v-if="
                scope.row.cashStatus == 1
                  ? false
                  : scope.row.cashStatus == -1
                  ? false
                  : scope.row.cashStatus == 3
                  ? false
                  : scope.row.cashStatus == 5
                  ? false
                  : scope.row.cashStatus == 4
                  ? false
                  : scope.row.cashStatus == 6
                  ? false
                  : scope.row.cashStatus == 7
                  ? false
                  : scope.row.cashStatus == 2
                  ? true
                  : false
              "
              v-checkbtn="['financial_rejection_btn']"
              type="text"
              size="mini"
              @click="financeRejected(scope.row)"
              >财务驳回</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="table-pagination">
        <el-pagination
          :total="total"
          :page-size="form.pageSize"
          :page-sizes="[10, 20, 30, 40]"
          background
          layout="total, sizes, prev, pager, next"
          @current-change="handleCurrentChange"
          @size-change="selsChange"
        />
      </div>
    </div>

    <!-- 业务通过 -->
    <el-dialog
      @close="dialogClose"
      title="业务审核通过"
      :visible.sync="businessAuditDialog"
    >
      <div class="icon-box">
        <i class="el-icon-warning"></i>
      </div>
      <div class="text-content">
        <span>确定要通过对以下{{ this.gridData.length }}个订单的业务审核?</span>
        <br />
        <span>如操作错误,可通过驳回操作改判</span>
      </div>
      <el-table :data="gridData">
        <el-table-column
          :show-overflow-tooltip="true"
          property="orderNum"
          label="ID"
          width="250"
          align="center"
        ></el-table-column>
        <el-table-column
          property="customerName"
          label="推荐人"
          width="150"
          align="center"
        ></el-table-column>
        <el-table-column
          property="withdrawBonus"
          label="预估奖励"
          width="150"
          align="center"
        ></el-table-column>
      </el-table>
      <template v-if="this.invalidStatus.length == 0 ? false : true">
        <p style="margin: 10px 0 10px 0">
          以下{{ this.invalidStatus.length }}条由于审核状态不正确,
          无法进行业务审核通过操作
        </p>
        <el-table :data="invalidStatus">
          <el-table-column
            :show-overflow-tooltip="true"
            property="orderNum"
            label="ID"
            width="250"
            align="center"
          ></el-table-column>
          <el-table-column
            property="customerName"
            label="推荐人"
            width="150"
            align="center"
          ></el-table-column>
          <el-table-column
            property="withdrawBonus"
            label="预估奖励"
            width="150"
            align="center"
          ></el-table-column>
        </el-table>
      </template>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="determine">确 定</el-button>
        <el-button @click="businessAuditDialog = false">取 消</el-button>
      </span>
    </el-dialog>
    <!-- 业务驳回 -->
    <el-dialog
      @close="dialogClose"
      title="业务驳回"
      :visible.sync="reviewRejectedDialog"
    >
      <div class="icon-box">
        <i class="el-icon-warning"></i>
      </div>
      <div class="text-content">
        <span>确定要通过对以下{{ this.gridData.length }}个订单的业务审核?</span>
        <br />
        <span>如操作错误,可通过驳回操作改判</span>
      </div>
      <el-table :data="gridData">
        <el-table-column
          :show-overflow-tooltip="true"
          property="orderNum"
          label="ID"
          width="250"
          align="center"
        ></el-table-column>
        <el-table-column
          property="customerName"
          label="推荐人"
          width="150"
          align="center"
        ></el-table-column>
        <el-table-column
          property="withdrawBonus"
          label="预估奖励"
          width="150"
          align="center"
        ></el-table-column>
      </el-table>
      <template v-if="this.invalidStatus.length == 0 ? false : true">
        <p style="margin: 10px 0 10px 0">
          以下{{ this.invalidStatus.length }}, 条由于审核状态不正确,
          无法进行业务审核驳回操作
        </p>
        <el-table :data="invalidStatus">
          <el-table-column
            :show-overflow-tooltip="true"
            property="orderNum"
            label="ID"
            width="250"
            align="center"
          ></el-table-column>
          <el-table-column
            property="customerName"
            label="推荐人"
            width="150"
            align="center"
          ></el-table-column>
          <el-table-column
            property="withdrawBonus"
            label="预估奖励"
            width="150"
            align="center"
          ></el-table-column>
        </el-table>
      </template>

      <div style="margin: 10px 0 10px 0">
        驳回原因：
        <el-select
          v-model="reasonsForRejection"
          @change="rejectChange"
          placeholder="请选择"
        >
          <el-option
            v-for="item in rejection_reason"
            :key="item.guid"
            :label="item.text"
            :value="item.text"
          ></el-option>
        </el-select>
      </div>
      <div v-if="this.flag">
        补充说明：
        <el-input
          @blur="rejectInputMethod"
          style="width: 600px"
          v-model="rejectInput"
          placeholder="请描述具体原因"
        ></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="determine">确 定</el-button>
        <el-button @click="reviewRejectedDialog = false">取 消</el-button>
      </span>
    </el-dialog>
    <!-- 财务驳回 -->
    <el-dialog
      @close="dialogClose"
      title="财务驳回"
      :visible.sync="financeRejectedDialog"
    >
      <div class="icon-box">
        <i class="el-icon-warning"></i>
      </div>
      <div class="text-content">
        <span
          >确定要通过对以下{{
            this.transferApproval.length
          }}个订单的财务驳回审核?</span
        >
        <br />
        <span>如操作错误,可通过驳回操作改判</span>
      </div>
      <el-table :data="transferApproval">
        <el-table-column
          :show-overflow-tooltip="true"
          property="orderNum"
          label="ID"
          width="250"
          align="center"
        ></el-table-column>
        <el-table-column
          property="customerName"
          label="推荐人"
          width="150"
          align="center"
        ></el-table-column>
        <el-table-column
          property="withdrawBonus"
          label="预估奖励"
          width="150"
          align="center"
        ></el-table-column>
      </el-table>
      <template v-if="this.invalidStatus.length == 0 ? false : true">
        <p style="margin: 10px 0 10px 0">
          以下{{ this.invalidStatus.length }}条由于审核状态不正确,
          无法进行财务驳回操作
        </p>
        <el-table :data="invalidStatus">
          <el-table-column
            :show-overflow-tooltip="true"
            property="orderNum"
            label="ID"
            width="250"
            align="center"
          ></el-table-column>
          <el-table-column
            property="customerName"
            label="推荐人"
            width="150"
            align="center"
          ></el-table-column>
          <el-table-column
            property="withdrawBonus"
            label="预估奖励"
            width="150"
            align="center"
          ></el-table-column>
        </el-table>
      </template>

      <div style="margin: 10px 0 10px 0">
        驳回原因：
        <el-select
          @change="financeRejectionChange"
          v-model="rejectionInputRejection"
          placeholder="请选择"
        >
          <el-option
            v-for="item in rejection_reason"
            :key="item.guid"
            :label="item.text"
            :value="item.text"
          ></el-option>
        </el-select>
      </div>
      <div v-if="financeFlag">
        补充说明：
        <el-input
          @blur="financeRejectionBlur"
          style="width: 600px"
          v-model="rejectionInput"
          placeholder="请描述具体原因"
        ></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="determine">确 定</el-button>
        <el-button @click="financeRejectedDialog = false">取 消</el-button>
      </span>
    </el-dialog>
    <!-- 转账成功 -->
    <el-dialog
      @close="dialogClose"
      :visible.sync="transferSuccessfulDialog"
      width="30%"
    >
      <div class="icon-box">
        <i class="el-icon-success"></i>
      </div>
      <div class="text-content">
        <span class="text-title">操作成功!</span>
        <br />
        <span style="font-size: 6px"
          >{{ this.transferApproval.length }}条数据批量审核通过</span
        >
        <br />
        <span style="font-size: 6px"
          >{{ this.invalidStatus.length }}条数据未通过财务批量审核</span
        >
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="determine">确 定</el-button>
        <el-button @click="transferSuccessfulDialog = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { Form as ElForm } from "element-ui";
import { UserModule } from "@/store/modules/user";
import { exportRafficData } from "@/api/common";
import { getexportRafficData } from "@/api/order";
import { getDictionaryList } from "@/api/common";
import qs from "qs";

import {
  getOrderList, // 订单列表查询
  exportOrdersList, // 订单列表统计查询导出
  orderBusApprove, // 业务审批通过或驳回
  orderFinanceApprove, // 转账成功或驳回
  statisticsQuery, // 统计查询
  exportStatisticsQuery, //  统计查询导出
} from "@/api/allOrder";

@Component({
  name: "Table",
})
export default class extends Vue {
  // 查询参数
  private form = {
    orderNum: "", // 订单编号
    productName: "", //推广产品名称
    productNum: "", // 产品编码ID
    payMember: "", // 购买人会员号
    memberPhone: "", // 购买人手机号
    channelSource: "", // 订单渠道
    orderStatus: "", // 订单状态
    customerName: "", // 推广人
    cashStatus: "", //审核状态
    failReason: "", // 驳回原因
    orderTimeStart: "", // 下单开始时间
    orderTimeEnd: "", // 下单结束时间
    operationTimeStart: "", // 审核开始时间
    operationTimeEnd: "", // 审核结束时间
    lists: "", // 列表订单编号
  };
  private reasonsForRejection = ""; // 驳回弹窗内的驳回原因下拉
  private rejectInput = "";
  private rejectInputValue = "";
  private rejectionInputRejection = "";
  private rejectionInput = "";
  private rejectionInputValue = "";
  private current = 1;
  private size = 10;
  private orderTime: any[] = []; // 下单时间
  private businessReviewTime: any[] = []; //申请结束时间
  private gridData: any[] = []; // 业务审核成功状态值
  private invalidStatus: any[] = []; // 业务审核失败状态值
  private transferApproval: any[] = []; // 转账成功状态值
  // 字典状态
  channel_code = []; //渠道
  rejection_reason = []; //驳回原因
  order_status = []; // 订单状态
  cash_status = []; // 提现审核状态
  private businessAuditDialog = false;
  private reviewRejectedDialog = false;
  private financeRejectedDialog = false;
  private transferSuccessfulDialog = false;
  private flag = false;
  private financeFlag = false;
  private total: number = 0;
  private tableData = [];
  private listLoading = true;
  private operationStatus = 0;

  mounted() {
    this.fetchDictionaryList("channel_code");
    this.fetchDictionaryList("rejection_reason");
    this.fetchDictionaryList("order_status");
    this.fetchDictionaryList("cash_status");
    this.getTime();
    this.filterList();
  }
  @Watch("orderTime")
  getOrderTime(newVal: any, oldVal: any) {
    if (newVal == null) {
      this.orderTime = [];
      this.form.orderTimeStart = ""; // 下单开始时间
      this.form.orderTimeEnd = ""; // 下单结束时间
    }
  }
  @Watch("businessReviewTime")
  getBusinessReviewTime(newVal: any, oldVal: any) {
    if (newVal == null) {
      this.businessReviewTime = [];
    }
  }
  // 查询列表数据
  private async filterList() {
    const _this = this;
    if (_this.orderTime.toString() !== "") {
      this.form.orderTimeStart =
        _this.orderTime[0] == undefined ? "" : this.orderTime[0];
      this.form.orderTimeEnd =
        _this.orderTime[1] == undefined ? "" : this.orderTime[1];
    }
    if (_this.businessReviewTime.toString() !== "") {
      this.form.operationTimeStart =
        _this.businessReviewTime[0] == undefined
          ? ""
          : this.businessReviewTime[0];
      this.form.operationTimeEnd =
        _this.businessReviewTime[1] == undefined
          ? ""
          : this.businessReviewTime[1];
    }
    // this.listLoading = false;
    let obj = {
      current: this.current,
      size: this.size,
      searchParam: this.form,
    };
    const { data } = await getOrderList(obj);
    this.tableData = data.data;
    this.total = data.total;
    setTimeout(() => {
      this.listLoading = false;
    }, 0.5 * 1000);
  }
  // 搜索列表
  private getList() {
    /*orderTimeStart:"", // 下单开始时间
    orderTimeEnd:"", // 下单结束时间
    operationTimeStart:"", // 审核开始时间
    operationTimeEnd:"", // 审核结束时间*/
    const _this = this;
    if (_this.orderTime.toString() !== "") {
      this.form.orderTimeStart =
        _this.orderTime[0] == undefined ? "" : this.orderTime[0];
      this.form.orderTimeEnd =
        _this.orderTime[1] == undefined ? "" : this.orderTime[1];
    }
    if (_this.businessReviewTime.toString() !== "") {
      this.form.operationTimeStart =
        _this.businessReviewTime[0] == undefined
          ? ""
          : this.businessReviewTime[0];
      this.form.operationTimeEnd =
        _this.businessReviewTime[1] == undefined
          ? ""
          : this.businessReviewTime[1];
    }
    this.current = 1;
    this.filterList();
  }

  // 多选业务通过开启弹窗
  private businessAudit(el: any) {
    if (el.cashStatus == 1) {
      this.gridData.push(el);
    } else if (this.gridData.length == 0) {
      this.$message.error({
        // showClose: true,
        message: "请选择可以业务审核操作的数据",
        type: "warning",
        // offset: 500,
        duration: 3000,
      });
      return;
    }
    this.operationStatus = 1;
    this.businessAuditDialog = true;
  }
  // 多选业务驳回开启弹窗
  private reviewRejected(el: any) {
    if (el.cashStatus == 1) {
      this.gridData.push(el);
    } else if (this.gridData.length == 0) {
      this.$message.error({
        // showClose: true,
        message: "此条数据不能进行业务驳回操作",
        type: "warning",
        // offset: 500,
        duration: 3000,
      });
      return;
    }
    this.operationStatus = 2;
    this.reviewRejectedDialog = true;
  }
  // 多选业务驳回下拉chenge事件
  private rejectChange(e: any) {
    if (e == "其他原因") {
      this.flag = true;
    } else {
      this.flag = false;
    }
  }
  // 补充说明失焦事件
  private rejectInputMethod(e: any) {
    this.rejectInputValue = e.target.value;
  }
  // 多选批量财务审核弹窗
  private transferSuccessful(el: any) {
    if (el.cashStatus == 2) {
      this.transferApproval.push(el);
    } else if (this.transferApproval.length == 0) {
      this.$message.error({
        // showClose: true,
        message: "此条数据不能进行财务审核通过操作",
        type: "warning",
        // offset: 500,
        duration: 3000,
      });
      return;
    }
    this.operationStatus = 3;
    this.transferSuccessfulDialog = true;
  }
  // 批量财务驳回弹窗
  private financeRejected(el: any) {
    if (el.cashStatus == 2) {
      this.transferApproval.push(el);
    } else if (this.transferApproval.length == 0) {
      this.$message.error({
        // showClose: true,
        message: "此条数据不能进行财务驳回操作",
        type: "warning",
        // offset: 500,
        duration: 3000,
      });
      return;
    }
    this.operationStatus = 4;
    this.financeRejectedDialog = true;
  }
  // 多选财务驳回下拉chenge事件
  private financeRejectionChange(e: any) {
    if (e == "其他原因") {
      this.financeFlag = true;
    } else {
      this.financeFlag = false;
    }
  }
  // 多选财务驳回补充说明失焦事件
  private financeRejectionBlur(e: any) {
    this.rejectionInputValue = e.target.value;
  }
  // 弹窗确定按钮
  private async determine() {
    // 多选业务通过按钮 1
    // console.log(this.operationStatus);
    if (this.operationStatus == 1) {
      let c: any[] = [];
      this.gridData.forEach((item) => {
        c.push(item.withdrawalId);
      });
      let obj = {
        withdrawalId: c,
        rejectReason: "",
        status: 2,
      };
      await orderBusApprove(obj);
      this.businessAuditDialog = false;
      this.operationStatus = 0;
    }
    // 多选业务驳回按钮 2
    if (this.operationStatus == 2) {
      let c: any[] = [];
      this.gridData.forEach((item) => {
        c.push(item.withdrawalId);
      });
      if (
        this.rejectInputValue == this.rejectInput &&
        this.rejectInputValue !== ""
      ) {
        let obj = {
          withdrawalId: c,
          rejectReason: this.rejectInput,
          status: 3,
        };
        await orderBusApprove(obj);
        this.reviewRejectedDialog = false;
        this.operationStatus = 0;
      } else if (this.reasonsForRejection !== "") {
        let obj = {
          withdrawalId: c,
          rejectReason: this.reasonsForRejection,
          status: 3,
        };
        await orderBusApprove(obj);
        this.reviewRejectedDialog = false;
        this.operationStatus = 0;
      }
    }
    // 多选转账成功3
    if (this.operationStatus == 3) {
      let c: any[] = [];
      this.transferApproval.forEach((item) => {
        c.push(item.withdrawalId);
      });
      let obj = {
        withdrawalId: c,
        rejectReason: "",
        status: 6,
      };
      await orderFinanceApprove(obj);
      this.transferSuccessfulDialog = false;
      this.operationStatus = 0;
    }
    // 多选财务驳回4
    if (this.operationStatus == 4) {
      let c: any[] = [];
      this.transferApproval.forEach((item) => {
        c.push(item.withdrawalId);
      });
      if (
        this.rejectionInputValue == this.rejectionInput &&
        this.rejectionInputValue !== ""
      ) {
        let obj = {
          withdrawalId: c,
          rejectReason: this.rejectionInput,
          status: 7,
        };
        // console.log("2", obj);
        await orderFinanceApprove(obj);
        this.financeRejectedDialog = false;
        this.operationStatus = 0;
      } else if (this.rejectionInputRejection !== "") {
        let obj = {
          withdrawalId: c,
          rejectReason: this.rejectionInputRejection,
          status: 7,
        };
        // console.log("1", obj);
        await orderFinanceApprove(obj);
        this.financeRejectedDialog = false;
        this.operationStatus = 0;
      }
    }
    this.filterList();
  }
  // 获取字典项
  private async fetchDictionaryList(type: any) {
    const _self = this;
    const { data } = await getDictionaryList({
      type,
    });
    // console.log(data);
    // _self[type] = data.data;
    _self[type] = data.data.filter((item: any, index: number) => {
      return item.key !== "00";
    });
  }

  // 表格的checkbox
  private handleSelectionChange(val: any) {
    // console.log(val);
    let order: any[] = [];
    this.gridData = [];
    this.invalidStatus = [];
    this.transferApproval = [];
    let a = new Set();
    let b = new Set();
    let d = new Set();
    let c = new Set();
    val.map((item: any) => {
      return order.push(item);
    });
    order.forEach((item) => {
      c.add(item.orderNum);
      if (item.cashStatus == 1) {
        a.add(item);
      } else if (item.cashStatus == 2) {
        d.add(item);
      } else {
        b.add(item);
      }
    });
    this.gridData = [...a];
    this.invalidStatus = [...b];
    this.transferApproval = [...d];
    this.form.lists = [...c].toString();
    // console.log(this.form.lists);
  }

  // 表格index改变时
  private handleCurrentChange(val: any) {
    this.current = val;
    this.filterList();
  }
  private selsChange(val: any) {
    this.size = val;
    this.filterList();
  }

  // 报表导出
  private exportDataList() {
    const _this = this;
    if (_this.orderTime.toString() !== "") {
      this.form.orderTimeStart =
        _this.orderTime[0] == undefined ? "" : this.orderTime[0];
      this.form.orderTimeEnd =
        _this.orderTime[1] == undefined ? "" : this.orderTime[1];
      // console.log(888);
    }
    if (_this.businessReviewTime.toString() !== "") {
      // console.log(999);
      this.form.operationTimeStart =
        _this.businessReviewTime[0] == undefined
          ? ""
          : this.businessReviewTime[0];
      this.form.operationTimeEnd =
        _this.businessReviewTime[1] == undefined
          ? ""
          : this.businessReviewTime[1];
    }
    // console.log(this.form);

    location.href = `${exportOrdersList}?${qs.stringify(this.form)}`;
  }

  // 重置搜索信息
  private clearFilterList() {
    // this.orderTime = []; //下单时间
    this.businessReviewTime = []; //申请结束时间
    this.form.productName = ""; //推广产品名称
    this.form.productNum = ""; // 产品编码ID
    this.form.channelSource = ""; // 订单渠道
    this.form.orderStatus = ""; // 订单状态
    this.form.customerName = ""; // 推广人
    this.form.cashStatus = ""; //审核状态
    this.form.failReason = ""; // 驳回原因
    this.form.orderNum = ""; // 订单编号
    // (this.form.orderTimeStart = ""), // 下单开始时间
    // (this.form.orderTimeEnd = ""), // 下单结束时间
    // (this.form.operationTimeStart = ""), // 审核开始时间
    // (this.form.operationTimeEnd = ""), // 审核结束时间
    this.size = 10;
    this.current = 1;
    this.getList();
  }
  // 弹窗关闭的回调
  private dialogClose() {
    (this.$refs.multipleTable as any).clearSelection();
    this.gridData = []; // 业务审核成功状态值
    this.invalidStatus = []; // 业务审核失败状态值
    this.transferApproval = []; // 转账成功状态值
    this.rejectInput = "";
    this.rejectInputValue = "";
    this.rejectionInputRejection = "";
    this.rejectionInput = "";
    this.rejectionInputValue = "";
  }
  // 获取当前时间
  getTime() {
    //设置当前时间
    var date = new Date();
    var year = date.getFullYear(); //月份从0~11，所以加一
    var dateArr: any = [
      date.getMonth() + 1,
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
    ];
    for (var i = 0; i < dateArr.length; i++) {
      if (dateArr[i] >= 1 && dateArr[i] <= 9) {
        dateArr[i] = "0" + dateArr[i];
      }
    }
    var strDate = year + "-" + dateArr[0] + "-" + dateArr[1];
    // + " " + dateArr[2] + ":" + dateArr[3] +  ":" + dateArr[4];

    this.getPreMonth(strDate);
    //获取当日
  }
  // 即日起获取上个月时间范围
  getPreMonth(date: any) {
    var arr = date.split("-");
    var year = arr[0]; //获取当前日期的年份
    var month = arr[1]; //获取当前日期的月份
    var day = arr[2]; //获取当前日期的日
    var days: any = new Date(year, month, 0);
    days = days.getDate(); //获取当前日期中月的天数
    var year2 = year;
    var month2: any = parseInt(month) - 1;
    if (month2 == 0) {
      year2 = parseInt(year2) - 1;
      month2 = 12;
    }
    var day2 = day;
    var days2: any = new Date(year2, month2, 0);
    days2 = days2.getDate();
    if (day2 > days2) {
      day2 = days2;
    }
    if (month2 < 10) {
      month2 = "0" + month2;
    }
    var t2 = year2 + "-" + month2 + "-" + day2;
    // console.log("当前时间", date);
    // console.log("时间",t2);
    this.orderTime.push(t2);
    this.orderTime.push(date);

    // console.log("默认时间范围", this.orderTime);
    // return t2;
  }
}
</script>

<style lang="scss">
.list {
  &-container {
    margin: 20px;
  }

  &-header {
    padding: 20px;
    background: #fff;
    margin-bottom: 20px;
    border-radius: 3px;
  }

  &-filter {
    padding: 20px 20px 0 20px;
    background: #fff;
    margin-bottom: 20px;
    border-radius: 3px;
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
.table-pagination {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 20px;
}
.el-form-item {
  margin-right: 20px !important;
}
.icon-box {
  display: inline-block;
  margin-left: 30px;
  .el-icon-warning {
    font-size: 50px;
    line-height: 30px;
    color: yellow;
  }
  .el-icon-success {
    font-size: 50px;
    line-height: 30px;
    color: #67c23a;
  }
}
.text-content {
  display: inline-block;
  line-height: 20px;
  font-size: 14px;
  margin-left: 20px;
  .text-title {
    font-size: 24px;
  }
}
.el-dialog__footer {
  padding: 0px 20px 20px 20px;
  text-align: center;
  box-sizing: border-box;
}
</style>