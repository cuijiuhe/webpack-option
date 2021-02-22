<template>
  <!-- 功能页面  -->
  <div class="mod-page">
    <!-- 筛选  -->
    <el-card class="mod-card mod-filter" shadow="never">
      <div class="mod-card-body" :class="{'mod-card-body-height': filterLength > 3 && !filterExtend, 'mod-card-body-extend': filterExtend}">
        <el-form
          ref="filterForm"
          :model="filterForm"
          label-position="right"
          size="small"
        >
          <el-form-item label="产品名称">
            <el-input
              v-model="filterForm.searchParam.productName"
              placeholder="请输入产品名称"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="产品编码">
            <el-input
              v-model="filterForm.searchParam.productCode"
              placeholder="请输入产品编码"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item v-if="filterLength < 3">
            <el-button type="default" size="small" @click="handleFilterReset()">重置</el-button>
            <el-button type="primary" size="small" @click="handleFilterList()">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div v-if="filterLength >= 3" class="mod-card-footer">
        <el-button v-if="filterLength > 6" type="text" size="small" @click="handleFilterExtend()">{{ filterExtendText }}<i :class="[filterExtend ? 'el-icon-arrow-up' : 'el-icon-arrow-down']"></i></el-button>
        <el-button type="default" size="small" @click="handleFilterReset()">重置</el-button>
        <el-button type="primary" size="small" @click="handleFilterList()">查询</el-button>
      </div>
    </el-card>
    <el-card class="mod-card mod-filter" shadow="never">
      <div class="mod-card-body" :class="{'mod-card-body-height': filter2Length > 3 && !filter2Extend, 'mod-card-body-extend': filter2Extend}">
        <el-form
          ref="filter2Form"
          :model="filter2Form"
          label-position="right"
          size="small"
        >
          <el-form-item label="产品名称">
            <el-input
              v-model="filter2Form.searchParam.productName"
              placeholder="请输入产品名称"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="产品编码">
            <el-input
              v-model="filter2Form.searchParam.productCode"
              placeholder="请输入产品编码"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="产品状态">
            <el-select v-model="filter2Form.searchParam.productStatus " placeholder="请选择" clearable>
              <el-option
                v-for="item in productStatus"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="filter2Length < 3">
            <el-button type="default" size="small" @click="handleFilterReset()">重置</el-button>
            <el-button type="primary" size="small" @click="handleFilterList()">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div v-if="filter2Length >= 3" class="mod-card-footer">
        <el-button v-if="filter2Length > 6" type="text" size="small" @click="handleFilterExtend()">{{ filter2ExtendText }}<i :class="[filter2Extend ? 'el-icon-arrow-up' : 'el-icon-arrow-down']"></i></el-button>
        <el-button type="default" size="small" @click="handleFilterReset()">重置</el-button>
        <el-button type="primary" size="small" @click="handleFilterList()">查询</el-button>
      </div>
    </el-card>
    <el-card class="mod-card mod-filter" shadow="never">
      <div class="mod-card-body" :class="{'mod-card-body-height': filter3Length > 3 && !filter3Extend, 'mod-card-body-extend': filter3Extend}">
        <el-form
          ref="filter3Form"
          :model="filter3Form"
          label-position="right"
          size="small"
        >
          <el-form-item label="产品名称">
            <el-input
              v-model="filter3Form.searchParam.productName"
              placeholder="请输入产品名称"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="产品编码">
            <el-input
              v-model="filter3Form.searchParam.productCode"
              placeholder="请输入产品编码"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="产品状态">
            <el-select v-model="filter3Form.searchParam.productStatus " placeholder="请选择" clearable>
              <el-option
                v-for="item in productStatus"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="计划开始时间">
            <el-date-picker
              v-model="filter3Form.searchParam.productDate1"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="计划结束时间">
            <el-date-picker
              v-model="filter3Form.searchParam.productDate2"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="实际开始时间">
            <el-date-picker
              v-model="filter3Form.searchParam.productDate3"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="实际结束时间">
            <el-date-picker
              v-model="filter3Form.searchParam.productDate4"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item v-if="filter3Length < 3">
            <el-button type="default" size="small" @click="handleFilterReset()">重置</el-button>
            <el-button type="primary" size="small" @click="handleFilterList()">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div v-if="filter3Length >= 3" class="mod-card-footer">
        <el-button v-if="filter3Length > 6" type="text" size="small" @click="handleFilterExtend()">{{ filter3ExtendText }}<i :class="[filter3Extend ? 'el-icon-arrow-up' : 'el-icon-arrow-down']"></i></el-button>
        <el-button type="default" size="small" @click="handleFilterReset()">重置</el-button>
        <el-button type="primary" size="small" @click="handleFilterList()">查询</el-button>
      </div>
    </el-card>
    <!-- 列表  -->
    <el-card class="mod-card mod-table" shadow="never">
      <div class="mod-card-header" slot="header">
        <!-- 标题如没有则可以不添加 -->
        <h2 class="mod-card-title">列表数据</h2>
        <div class="mod-card-tool">
          <el-button type="primary" size="small" @click="handleShowDialogForm()">添加列表</el-button>
          <el-button type="default" size="small" @click="toggleSelection()">取消选择</el-button>
          <el-button type="primary" size="small" @click="toggleSelection([tableList[0], tableList[2]])">选中列表</el-button>
        </div>
      </div>
      <div class="mod-card-body">
        <el-table
          :data="tableList"
          ref="multipleTable"
          v-loading="tableLoading"
          tooltip-effect="dark"
          border
          stripe
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            width="63"
          ></el-table-column>
          <el-table-column
            fixed
            label="序号"
            type="index"
            width="77"
          ></el-table-column>
          <el-table-column
            prop="date"
            label="日期"
            width="130"
          ></el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
          ></el-table-column>
          <el-table-column
            prop="province"
            label="省份"
          ></el-table-column>
          <el-table-column
            prop="city"
            label="市区"
          ></el-table-column>
          <el-table-column
            prop="address"
            label="地址"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="zip"
            label="邮编"
            width="110"
          ></el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="150"
          >
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="handleShowDialogDetail(scope.row)">查看</el-button>
              <el-dropdown trigger="click">
                <el-button type="text" size="small">
                  更多<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown" size="small">
                  <el-dropdown-item size="small" @click.native="handleEditItem">编辑</el-dropdown-item>
                  <el-dropdown-item size="small" @click.native="handleDeleteItem">删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="mod-card-footer">
        <el-pagination
          :total="total"
          :page-size="filterForm.pageSize"
          :page-sizes="[10, 20, 30, 40]"
          background
          layout="total, sizes, prev, pager, next"
          @current-change="handleCurrentChange"
          @size-change="selsChange"
        />
      </div>
    </el-card>
    <!-- 弹层  -->
    <el-dialog
      class="mod-dialog"
      title="弹层标题"
      :visible.sync="dialogForms"
      @close="handleCloseDialogForm"
    >
      <el-card class="mod-card mod-form" shadow="never">
        <div class="mod-card-header" slot="header">
          <h2 class="mod-card-title">表单标题</h2>
        </div>
        <div class="mod-card-body">
          <el-form
            ref="dialogForm"
            size="small"
            :model="dialogForm"
            :rules="dialogFormRules"
          >
            <el-form-item label="活动名称" prop="name">
              <el-input v-model="dialogForm.name" placeholder="请输入活动名称"></el-input>
            </el-form-item>
            <el-form-item label="活动区域" prop="region">
              <el-select v-model="dialogForm.region" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="活动时间" required>
              <el-date-picker
                type="daterange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                v-model="dialogForm.date1"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="创建时间" required>
              <el-date-picker
                type="date"
                placeholder="选择创建时间"
                v-model="dialogForm.date2"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="即时配送" prop="delivery">
              <el-switch v-model="dialogForm.delivery"></el-switch>
            </el-form-item>
            <el-form-item label="活动性质" prop="type">
              <el-checkbox-group v-model="dialogForm.type">
                <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                <el-checkbox label="地推活动" name="type" checked></el-checkbox>
                <el-checkbox label="线下主题活动" name="type"></el-checkbox>
                <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="特殊资源申请资源申请" prop="resource">
              <el-radio-group v-model="dialogForm.resource">
                <el-radio label="线上品牌商赞助"></el-radio>
                <el-radio label="线下场地免费"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="活动形式" prop="desc">
              <el-input type="textarea" v-model="dialogForm.desc"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
      <div class="dialog-footer" slot="footer">
        <el-button size="small" @click="handleCloseDialogForm()">取消</el-button>
        <el-button type="primary" size="small" :loading="loading" @click.native.prevent="handleSubmitForm()">提交</el-button>
      </div>
    </el-dialog>
    <!-- 弹层  -->
    <el-dialog
      class="mod-dialog"
      title="弹层标题"
      :visible.sync="dialogDetails"
      @close="handleCloseDialogDetail"
    >
      <el-card class="mod-card mod-detail" shadow="never">
        <!-- 标题如没有则可以不添加 -->
        <div class="mod-card-header" slot="header">
          <h2 class="mod-card-title">基本信息</h2>
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
        <!-- 标题如没有则可以不添加 -->
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
              width="140"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="productName"
              label="产品名称"
              width="160"
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
                  style="display:block;width:48px;height:48px;margin: 0 auto;"
                ></el-image>
              </template>
            </el-table-column>
            <el-table-column
              prop="salesPrice"
              label="产品单价"
              width="105"
            ></el-table-column>
            <el-table-column
              prop="totalQuantity"
              label="产品数量"
              width="105"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="totalPrice"
              label="产品应付金额"
              width="133"
            ></el-table-column>
          </el-table>
        </div>
      </el-card>
      <div class="dialog-footer" slot="footer">
        <el-button type="primary" size="small" @click="handleCloseDialogDetail()">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Form as ElForm } from "element-ui";

declare module "vue/types/vue" {
  interface Vue {
    [type: string]: any;
  }
}

@Component({
  name: "Table",
})
export default class extends Vue {
  // 查询参数
  private filterForm = {
    searchParam: {
      productCode: '',
      productName: ''
    },
    pageIndex: 1,
    pageSize: 10,
  };
    // 查询参数个数
  private filterLength = 0;
  // 是否展开筛选项
  private filterExtend = false; // 筛选项 > 6个
  // 是否展开筛选项按钮内容：展开/收起
  private filterExtendText = '展开';

  // 查询参数
  private filter2Form = {
    searchParam: {
      productCode: '',
      productName: '',
      productStatus: ''
    },
    pageIndex: 1,
    pageSize: 10,
  };

  // 查询参数个数
  private filter2Length = 0;
  // 是否展开筛选项
  private filter2Extend = false; // 筛选项 > 6个
  // 是否展开筛选项按钮内容：展开/收起
  private filter2ExtendText = '展开';

// 查询参数
  private filter3Form = {
    searchParam: {
      productCode: '',
      productName: '',
      productDate1: '',
      productDate2: '',
      productDate3: '',
      productDate4: '',
      productStatus: '',
      productType: ''
    },
    pageIndex: 1,
    pageSize: 10,
  };
    // 查询参数个数
  private filter3Length = 0;
  // 是否展开筛选项
  private filter3Extend = false; // 筛选项 > 6个
  // 是否展开筛选项按钮内容：展开/收起
  private filter3ExtendText = '展开';

  // 列表数据
  private tableData = [{
    date: '2016-05-01',
    name: '王小虎',
    province: '上海',
    city: '普陀区',
    address: '上海市普陀区金沙江路 1519 弄',
    zip: 200333
  }, {
    date: '2016-05-02',
    name: '王小虎',
    province: '上海',
    city: '普陀区',
    address: '上海市普陀区金沙江路 1518 弄',
    zip: 200333
  }, {
    date: '2016-05-03',
    name: '王小虎',
    province: '上海',
    city: '普陀区',
    address: '上海市普陀区金沙江路 1516 弄',
    zip: 200333
  }, {
    date: '2016-05-04',
    name: '王小虎',
    province: '上海',
    city: '普陀区',
    address: '上海市普陀区金沙江路 1517 弄',
    zip: 200333
  }]
  private multipleTable: any;
  private tableList: any[] = [];
  private multipleSelection: any[] = [];
  private tableLoading = false;
  private total: number = 40;
  private productStatus: any[] = [{
    label: '已使用',
    value: '01'
  }, {
    label: '未使用',
    value: '02'
  }, {
    label: '已过期',
    value: '03'
  }]
  private dialogForms = false;
  private dialogForm = {
    name: '',
    region: '',
    date1: '',
    date2: '',
    delivery: false,
    type: [],
    resource: '',
    desc: ''
  }

  private dialogFormRules = {
    name: [
      { required: true, message: '请输入活动名称', trigger: 'blur' },
      { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
    ],
    region: [
      { required: true, message: '请选择活动区域', trigger: 'change' }
    ],
    date1: [
      { type: 'daterange', required: true, message: '请选择日期', trigger: ['change', 'blur'] }
    ],
    date2: [
      { type: 'date', required: true, message: '请选择创建时间', trigger: ['change', 'blur'] }
    ],
    type: [
      { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
    ],
    resource: [
      { required: true, message: '请选择活动资源', trigger: 'change' }
    ],
    desc: [
      { required: true, message: '请填写活动形式', trigger: 'blur' }
    ]
  }
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
  private dialogDetails = false;
  private loading = false;

  mounted() {
    this.multipleTable = this.$refs.multipleTable;
    this.filterLength = Object.keys(this.filterForm.searchParam).length
    this.filter2Length = Object.keys(this.filter2Form.searchParam).length
    this.filter3Length = Object.keys(this.filter3Form.searchParam).length
    console.log(this.filter2Length);
    this.handleFilterList();
  }

  // 表格index改变时
  private handleCurrentChange(val: any) {
    this.filterForm.pageIndex = val;
    this.getTableList();
  }

  // 模拟查询列表数据
  private getTableList() {
    this.tableLoading = true;
    setTimeout(() => {
      this.tableList = this.tableData;
      this.tableLoading = false;
    }, 1 * 1000);
  }

  // 筛选项展示隐藏
  private handleFilterExtend() {
    this.filter3Extend = !this.filter3Extend
    this.filter3ExtendText = this.filter3Extend ? '收起' : '展开'
  }

  // 筛选列表数据
  private handleFilterList() {
    this.filterForm.pageIndex = 1;
    this.getTableList();
  }

  // 筛选项重置
  private handleFilterReset() {
    (this.$refs.filterForm as ElForm).resetFields();
    this.filterForm.searchParam = {
      productCode: '',
      productName: ''
    };
    this.filterForm.pageIndex = 1;
    this.getTableList();
  }

  // 选择展示条数
  private selsChange(val: any) {
    this.filterForm.pageSize = val;
    this.getTableList();
  }

  // 选择表格项操作
  toggleSelection(rows: any[]) {
    if (rows) {
      rows.forEach((row: any) => {
        this.multipleTable.toggleRowSelection(row);
      });
    } else {
      this.multipleTable.clearSelection();
    }
  }

  // 选择表格项操作
  handleSelectionChange(val: any) {
    this.multipleSelection = val;
    // console.log(this.multipleSelection);
  }

  // 编辑表格选项
  handleEditItem() {
    this.$router.push('/components/form')
  }

  // 删除表格选项
  handleDeleteItem() {
    this.$confirm('此操作将永久删除该选项, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      this.$message({
        type: 'success',
        message: '删除成功!'
      });
    }).catch(() => {
      this.$message({
        type: 'info',
        message: '已取消删除'
      });
    });
  }

  // 显示表单弹层
  handleShowDialogForm() {
    this.dialogForms = true;
  }

  // 关闭表单弹层
  handleCloseDialogForm() {
    this.dialogForms = false;
  }

  // 显示表单弹层
  handleShowDialogDetail() {
    this.dialogDetails = true;
  }

  // 关闭弹层
  handleCloseDialogDetail() {
    this.dialogDetails = false;
  }

  // 提交表单项
  private handleSubmitForm() {
    (this.$refs.dialogForm as ElForm).validate(async (valid: boolean) => {
      if (valid) {
        this.loading = true;
        this.$message('submit!')
        setTimeout(() => {
          this.loading = false;
        }, 0.5 * 1000);
      } else {
        return false;
      }
    })
  }
}
</script>

<style lang="scss">
</style>
