<template>
  <!-- 功能页面  -->
  <div class="page-container">
    <!-- 筛选  -->
    <el-card class="filter-container" shadow="never">
      <div class="filter-form" :class="{'filter-form-extend': filterExtend}">
        <el-form
          ref="filterForms"
          :model="filterForm"
          label-position="right"
          label-width="100"
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
          <el-form-item label="产品状态">
            <el-select v-model="filterForm.searchParam.productStatus " placeholder="请选择" clearable>
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
              v-model="filterForm.searchParam.productDate1"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="计划结束时间">
            <el-date-picker
              v-model="filterForm.searchParam.productDate2"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="实际开始时间">
            <el-date-picker
              v-model="filterForm.searchParam.productDate3"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="实际结束时间">
            <el-date-picker
              v-model="filterForm.searchParam.productDate4"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item v-if="filterLength < 3">
            <el-button type="default" size="small" @click="handleFilterReset()">重置</el-button>
            <el-button type="primary" size="small" @click="handleFilterList()">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div v-if="filterLength >= 3" class="filter-tools">
        <div v-if="filterLength > 6" class="filter-extend" @click="handleFilterExtend()">{{ filterExtendText }}<i :class="[filterExtend ? 'el-icon-arrow-up' : 'el-icon-arrow-down']"></i></div>
        <el-button type="default" size="small" @click="handleFilterReset()">重置</el-button>
        <el-button type="primary" size="small" @click="handleFilterList()">查询</el-button>
      </div>
    </el-card>
    <!-- 列表  -->
    <el-card class="table-container" shadow="never">
      <div class="table-header" slot="header">
        <h2 class="table-title">列表数据</h2>
        <div class="table-tools">
          <el-button type="default" size="small" @click="toggleSelection()">取消选择</el-button>
          <el-button type="primary" size="small">选中列表</el-button>
        </div>
      </div>
      <div class="talbe-body">
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
            width="120"
          ></el-table-column>
          <el-table-column
            prop="province"
            label="省份"
            width="120"
          ></el-table-column>
          <el-table-column
            prop="city"
            label="市区"
            width="120"
          ></el-table-column>
          <el-table-column
            prop="address"
            label="地址"
            width="160"
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
              <el-button type="text" size="small" @click="handleClick(scope.row)">查看</el-button>
              <el-dropdown trigger="click">
                <el-button type="text" size="small">
                  更多<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown" size="mini">
                  <el-dropdown-item size="small">编辑</el-dropdown-item>
                  <el-dropdown-item size="small">删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="table-pagination">
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
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { Form as ElForm } from "element-ui";
import { UserModule } from "@/store/modules/user";
import { getDictionaryList } from "@/api/common";

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
  private filterLength = 0;
  // 是否展开筛选项
  private filterExtend = false;
  // 是否展开筛选项按钮内容：展开/收起
  private filterExtendText = '展开';
  // 筛选项表单验证规则
  private filterRules: any = {
    productName: [
      { required: true, message: "请输入产品名称", trigger: "blur" },
      { min: 2, max: 50, message: "请输入2-50个汉字", trigger: "blur" },
    ],
    productCode: [{ required: true, message: "请选择状态", trigger: "change" }],
    productStatus: [
      { required: true, message: "请选择状态", trigger: "change" },
    ],
    settlementStandard: [
      { required: true, message: "请选择结算标准", trigger: "change" },
    ],
    excitationType: [
      { required: true, message: "请选择激励方式", trigger: "change" },
    ],
    channel: [
      {
        required: true,
        message: "请选择是否区分用户渠道奖励",
        trigger: "change",
      },
    ],
    settlementCycle: [{ validator: this.checkAge, trigger: "blur" }],
  };
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
  private filterForms: any;
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

  mounted() {
    this.multipleTable = this.$refs.multipleTable;
    this.filterForms = this.$refs.filterForms;
    this.filterLength = Object.keys(this.filterForm.searchParam).length
    // console.log(this.filterLength);
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
    this.filterExtend = !this.filterExtend
    this.filterExtendText = this.filterExtend ? '收起' : '展开'
  }
  // 筛选列表数据
  private handleFilterList() {
    this.filterForm.pageIndex = 1;
    this.getTableList();
  }
  // 筛选项重置
  private handleFilterReset() {
    this.filterForms.resetFields();
    this.filterForm.searchParam = {
      productCode: '',
      productName: '',
      productDate1: '',
      productDate2: '',
      productDate3: '',
      productDate4: '',
      productStatus: '',
      productType: ''
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
    console.log(this.multipleSelection);
  }
}
</script>

<style lang="scss">
</style>
