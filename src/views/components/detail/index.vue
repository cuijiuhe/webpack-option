<template>
  <!-- 功能页面  -->
  <div class="mod-page">
    <!-- 详情  -->
    <el-card class="mod-card mod-detail" shadow="never">
      <!-- 标题如没有则可以不添加 -->
      <div class="mod-card-header" slot="header">
        <h2 class="mod-card-title">基本信息</h2>
        <div class="mod-card-tool">
          <el-button type="text" size="small">操作按钮</el-button>
          <el-button size="small">操作按钮</el-button>
          <el-button type="primary" size="small">操作按钮</el-button>
        </div>
      </div>
      <div class="mod-card-body">
        <ul class="mod-list">
          <li class="mod-list-item">
            <span class="mod-list-label">订单编号</span>
            <el-tooltip
              effect="dark"
              :content="detailData.orderCode"
              placement="top"
            >
              <span class="mod-list-value">{{ detailData.orderCode }}</span>
            </el-tooltip>
          </li>
          <li class="mod-list-item">
            <span class="mod-list-label">订单类型</span>
            <span class="mod-list-value">
              {{ detailData.orderType }}
            </span>
          </li>
          <li class="mod-list-item">
            <span class="mod-list-label">来源渠道</span>
            <span class="mod-list-value">
              {{ detailData.orderChannel }}
            </span>
          </li>
          <li class="mod-list-item">
            <span class="mod-list-label">会员手机号</span>
            <span class="mod-list-value">
              {{ detailData.memberPhone }}
            </span>
          </li>
          <li class="mod-list-item">
            <span class="mod-list-label">会员ID</span>
            <span class="mod-list-value">
              {{ detailData.payMember }}
            </span>
          </li>
          <li class="mod-list-item">
            <span class="mod-list-label">订单创建时间</span>
            <span class="mod-list-value">
              {{ detailData.payTime }}
            </span>
          </li>
          <li class="mod-list-item">
            <span class="mod-list-label">订单完成时间</span>
            <span class="mod-list-value">
              {{ detailData.completeTime }}
            </span>
          </li>
        </ul>
      </div>
    </el-card>
    <el-card class="mod-card mod-table" shadow="never">
      <div class="mod-card-header" slot="header">
        <h2 class="mod-card-title">商品信息</h2>
      </div>
      <div class="mod-card-body">
        <el-table
          :data="detailTable"
          ref="detailTable"
          v-loading="tableLoading"
          tooltip-effect="dark"
          border
          stripe
        >
          <el-table-column
            fixed
            label="序号"
            type="index"
            width="77"
          ></el-table-column>
          <el-table-column
            prop="productId"
            label="产品ID"
            width="160"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="productName"
            label="产品名称"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="productImg"
            label="产品图片"
            width="105"
          >
            <template slot-scope="scope">
              <el-image
                :src="scope.row.productImg"
                fit="cover"
                :preview-src-list="imgList"
                style="display:block;width:48px;height:48px;margin: 0 auto;"
              ></el-image>
            </template>
          </el-table-column>
          <el-table-column
            prop="salesPrice"
            label="产品单价"
          ></el-table-column>
          <el-table-column
            prop="totalQuantity"
            label="产品数量"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="totalPrice"
            label="产品应付金额"
          ></el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'

@Component({
  name: 'Detail'
})
export default class extends Vue {
  private detailData = {
    productName: '车联网服务(重卡版)', // 产品名称
    marketPrice: '399', // 产品价格
    orderCode: '167078920210131011393933030307881f53c7', // 订单编号
    payMember: '1670789', // 会员号
    phone: '13811821894', // 手机号
    orderStatus: '已完成', // 订单状态
    price: '399', // 商品价格
    totalPrice: '399', // 订单总金额
    transportPrice: '0', // 运费金额
    discountPrice: '0', // 优惠金额
    paymentAmount: '399', // 实付金额
    isApplyInvoice: '是', // 是否开具发票
    payType: '在线支付', // 支付类型
    payCode: 'PAY167078920210131011030789fea93e', // 支付流水号
    payAmount: '399', // 实付金额
    disTotalPrice: '0', // 优惠总金额
    disPrice:'0', // 优惠券优惠
    redEnvelopePrice: '0', // 红包抵扣金额
    deductFromPoint: '0', // 积分金额
    disNum: '0', // 优惠券使用张数
    pointsNum: '0', // 抵扣积分
    pointsPrice: '0', // 积分抵扣金额
    titleType: '个人', // 发票抬头
    title: '个人', // 个人或公司名称
    invoiceMobile: '张二狗', // 个人或公司名称
    payTime: '2021-01-31 01:10:45', // 订单支付时间
    completeTime: '2021-01-31 01:10:45', // 订单完成时间
    payChannel: '微信', // 支付方式
    enterpriseType: '电子普通发票', // 发票类型
    taxPayerIdentification: '', // 识别纳税人
    invoiceContent: '', // 发票内容
    invoiceStatus: '', // 发票状态
    invoiceStatusName: '开票中', // 开票状态
    reasonType: '', // 售后类型
    cancelStatus: '', //  售后状态
    customCancelReason: '', // 售后描述
    enterpriseInvoiceMail: '', // 发票邮箱
    productNum: '1', // 产品数量
    createTime: '2021-01-31 01:10:31', // 下单日期
    orderType: '普通订单', // 订单类型
    payStatus: '已支付', // 支付状态
    cancelCode: '', // 退款单编号
    orderChannel: '福田e家', // 来源渠道
    memberPhone: '13811821894', //会员手机号
  };
  private detailTable: any[] = [{
    productId: '1-ZNRRMHD', // 产品id
    productName: '车联网服务(重卡版)', // 产品名称
    totalQuantity: '399', // 产品单价
    产品数量: '1', // 手机号
    orderStatus: '已完成', // 订单状态
    salesPrice: '399', // 产品单价
    totalPrice: '399', // 产品应付金额
    productImg: 'https://obs-fix-video.obs.cn-north-1.myhwclouds.com/e8324d8b13a44d6f94bbf6b28c2edc13.png', // 产品图片
  }]
  private imgList = ['https://obs-fix-video.obs.cn-north-1.myhwclouds.com/e8324d8b13a44d6f94bbf6b28c2edc13.png']
  private tableLoading = false
}
</script>
