<template>
  <!-- 推广产品 -->
  <div class="order-container">
    <div class="order-filter">
      <el-form :model="form" label-width="left" size="small" :inline="true" label-position="left">
        <el-form-item label="产品名称">
          <el-input
            v-model="form.searchParam.productName"
            suffix-icon="el-icon-date"
            placeholder="请输入产品名称"
            clearable
          ></el-input>
        </el-form-item>

        <el-form-item label="产品编码/ID">
          <el-input
            v-model="form.searchParam.productCode"
            suffix-icon="el-icon-date"
            placeholder="请输入产品编码"
            clearable
          ></el-input>
        </el-form-item>

        <el-form-item label="推广状态">
          <el-select v-model="form.searchParam.productStatus " placeholder="请选择" clearable>
            <el-option
              v-for="item in product_status"
              :key="item.guid"
              :label="item.text"
              :value="item.key"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="产品类型">
          <el-select v-model="form.searchParam.promoType " placeholder="请选择" clearable>
            <el-option
              v-for="item in getFilterProductTypeArr"
              :key="item.businesstypeName"
              :label="item.businesstypeName"
              :value="item.typeIdentifier"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-button type="primary" style="margin-bottom: 20px;" size="small" @click="getList()">查询</el-button>
      </el-form>
    </div>
    <!-- 列表 -->
    <div class="order-table">
      <div class="table-tools">
        <el-button type="primary" size="small" @click="addPromotionalProducts">添加</el-button>
      </div>
      <el-table
        :data="tableData"
        border
        stripe
        :header-cell-style="{background:'#eef1f6',color:'#606266'}"
        fit
        max-height="540"
      >
        v-loading="listLoading"
        height="400px"
        >
        <el-table-column
          prop="promoType"
          label="产品类型"
          align="center"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            {{formatPromoType(scope.row.promoType)}}
          </template>
        </el-table-column>
        <el-table-column
          prop="productName"
          label="产品名称"
          width="280"
          align="center"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="productCode"
          label="产品ID"
          width="90"
          align="center"
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
          prop="excitationType"
          label="激励方式"
          align="center"
        >
          <template
            slot-scope="scope"
          >{{scope.row.excitationType | checkBaseData(excitation_type, excitation_type)}}</template>
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="rewardMoneyShow"
          label="佣金"
          align="center"
        >
          <!-- <template slot-scope="scope">{{scope.row.channel | checkBaseData(channel, channel)}}</template> -->
          <!-- <template
            slot-scope="scope"
          >{{scope.row.channel == 1 ? '区分渠道' : (scope.row.productChannelVo.length ? scope.row.productChannelVo[0].rewardMoney : '' )}}</template>-->
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="productStatus"
          label="推广状态"
          align="center"
        >
          <template
            slot-scope="scope"
          >{{scope.row.productStatus | checkBaseData(product_status, product_status)}}</template>
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="createrTime"
          label="发布时间"
          width="150"
          align="center"
        ></el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="updateTime"
          label="修改时间"
          width="150"
          align="center"
        ></el-table-column>
        <el-table-column fixed="right" label="操作" width="180">
          <template slot-scope="scope">
            <el-button type="text" size="medium" @click="viewDetails(scope.row.productId)">查看</el-button>
            <el-button type="text" size="medium" @click="modifyDialog(scope.row.productId)">修改</el-button>
            <el-button
              type="text"
              size="medium"
              @click="endDialog(scope.row.productId, '2')"
              v-if="scope.row.productStatus == 1"
            >结束</el-button>
            <el-button
              type="text"
              size="medium"
              @click="endDialog(scope.row.productId, '1')"
              v-if="scope.row.productStatus == 2"
            >启动</el-button>
            <el-button type="text" size="medium" @click="deleteDialog(scope.row.productId)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="table-pagination">
        <el-pagination
          :total="total"
          :page-size="form.size"
          :page-sizes="[10, 20, 30, 40]"
          background
          layout="total, sizes, prev, pager, next"
          @current-change="handleCurrentChange"
          @size-change="selsChange"
        />
      </div>
    </div>
    <!-- 添加推广产品对话框 -->
    <el-dialog
      @closed="dialogClosed"
      title="添加推广产品"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
    >
      <el-form
        :model="addForm"
        :inline="true"
        :label-position="labelPosition"
        size="small"
        ref="addForm"
        :rules="rules"
      >
      <el-row>
        <el-col :span='12'>
          <el-form-item label="产品类型" :label-width="formLabelWidth">
              <el-select v-model="addForm.promoType" @change="choseType" placeholder="请选择产品类型">
                <el-option
                  v-for="item in selectProductType"
                  :key="item.businesstypeName"
                  :label="item.businesstypeName"
                  :value="item.typeIdentifier"
                ></el-option>
              </el-select>
            </el-form-item>
        </el-col>
      </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="产品编码" :label-width="formLabelWidth" prop="productCode">
              <el-select v-model="addForm.productCode" @input="productCodeChange" placeholder="请选择">
                <el-option
                  v-for="item in product_code"
                  :key="item.guid"
                  :label="item.key"
                  :value="item.key"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="产品名称" :label-width="formLabelWidth" prop="productName">
              <el-input class="size-input" v-model="addForm.productName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="状态" :label-width="formLabelWidth" prop="productStatus">
              <el-select class="size-input" v-model="addForm.productStatus" placeholder="请选择">
                <el-option
                  v-for="item in product_status"
                  :key="item.guid"
                  :label="item.text"
                  :value="item.key"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="url" :label-width="formLabelWidth">
              <el-input class="size-input" v-model="addForm.productUrl"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="推广描述" :label-width="formLabelWidth">
          <el-input maxlength="50" style="width:660px;" v-model="addForm.productDesc"></el-input>
        </el-form-item>

        <el-row>
          <el-col :span="12">
            <el-form-item label="激励方式" :label-width="formLabelWidth" prop="excitationType">
              <el-select
                @change="excitationChange"
                class="size-input"
                v-model="addForm.excitationType"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in excitation_type"
                  :key="item.guid"
                  :label="item.text"
                  :value="item.key"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否区分用户渠道奖励" :label-width="formLabelWidth" prop="channel">
              <el-radio-group v-model="addForm.channel" @change="differentiateChannels">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="2">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="addForm.channel == 1">
          <el-form-item  v-for="(item, index) in filteredType" :key="index + item.channelName" :label="item.channelName" :label-width="formLabelWidth">
            <el-input class="size-input" v-model="item.rewardMoney"></el-input>
          </el-form-item>
        </el-row>
        <el-row v-else>
            <el-col :span="12" v-for="(item,index) in addForm.channelVoList" :key="item.guid">
              <el-form-item
                :label="item.channelName"
                :label-width="formLabelWidth"
                :prop="'channelVoList.' +index+ '.rewardMoney'"
              >
                <el-input
                  :placeholder="placeholderCotent"
                  type="number"
                  class="size-input"
                  v-model="item.rewardMoney"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        <el-row>
          <!-- <el-col :span="12" v-if="addForm.channel == 2">
            <el-form-item
              v-for="(item,index) in addForm.channelVoList"
              :key="item.guid"
              :label="item.channelName"
              :label-width="formLabelWidth"
              :prop="'channelVoList.'+index+ '.rewardMoney'"
            >
              <el-input
                :placeholder="placeholderCotent"
                type="number"
                class="size-input"
                v-model="item.rewardMoney"
              ></el-input>
            </el-form-item>
          </el-col> -->



          <!-- <div v-else>
            <el-col :span="12" v-for="(item,index) in addForm.channelVoList" :key="item.guid">
              <el-form-item
                :label="item.channelName"
                :label-width="formLabelWidth"
                :prop="'channelVoList.' +index+ '.rewardMoney'"
              >
                <el-input
                  :placeholder="placeholderCotent"
                  type="number"
                  class="size-input"
                  v-model="item.rewardMoney"
                ></el-input>
              </el-form-item>
            </el-col>
          </div> -->
          <el-col :span="11">
            <el-form-item label="结算标准" :label-width="formLabelWidth" prop="settlementStandard">
              <el-select class="size-input" v-model="addForm.settlementStandard" placeholder="请选择">
                <el-option
                  v-for="item in settlement_standard"
                  :key="item.guid"
                  :label="item.text"
                  :value="item.key"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="结算周期" :label-width="formLabelWidth" prop="settlementCycle">
              <el-input class="size-input" v-model="addForm.settlementCycle" placeholder="天"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addPromoteProducts('addForm')" size="small">保 存</el-button>
        <el-button @click="dialogFormVisible = false" size="small">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 查看详情对话框 -->
    <el-dialog @closed="dialogClosed" width="50%" title="推广详情" :visible.sync="dialogTableVisible">
      <el-row>
        <el-col>
          <div class="dynamic-tips">
            <i class="el-icon-warning"></i>
            当前产品状态在{{productDetail.productStatus | checkBaseData(product_status, product_status)}}
          </div>
        </el-col>
        <el-col class="details-content">产品名称： {{productDetail.productName}}</el-col>
        <!-- <el-col class="details-content">产品编码： {{productDetail.productCode | checkBaseData(product_code, product_code)}}</el-col> -->
        <el-col class="details-content">产品编码： {{productDetail.productNum}}</el-col>
        <el-col
          class="details-content"
        >激励方式： {{productDetail.excitationType | checkBaseData(excitation_type, excitation_type)}}</el-col>
        <el-col
          class="details-content"
        >佣金是否区分渠道：{{productDetail.channel | checkBaseData(channel, channel)}}</el-col>
        <el-col
          class="details-content"
          v-for="(item,index) in channelVoList"
          :key="index"
        >{{item.channelName}}：{{item.rewardMoney}}</el-col>
        <el-col class="details-content">url：{{productDetail.productUrl}}</el-col>
        <el-col
          class="details-content"
        >推广状态：{{productDetail.productStatus | checkBaseData(product_status, product_status)}}</el-col>
        <el-col
          class="details-content"
        >结算标准：{{productDetail.settlementStandard | checkBaseData(settlement_standard, settlement_standard)}}</el-col>
        <el-col class="details-content">结算周期：{{productDetail.settlementCycle}}</el-col>
        <el-col class="details-content">描述：{{productDetail.productDesc}}</el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogTableVisible = false" size="small">确 定</el-button>
        <el-button @click="dialogTableVisible = false" size="small">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 修改 -->
    <el-dialog :visible.sync="dialogVisible" width="30%">
      <div class="icon-box">
        <i class="el-icon-warning"></i>
      </div>
      <div class="text-content">
        <span>进行中的推广请慎重修改</span>
        <br />
        <span>修改后会影响后续产生的推广订单</span>
        <br />
        <span>确定要继续执行该操作吗？</span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="showModifyDialog" size="small">确 定</el-button>
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
      </span>
    </el-dialog>
    <!-- 结束 -->
    <el-dialog :visible.sync="dialogEnd" width="30%">
      <div class="icon-box">
        <i class="el-icon-warning"></i>
      </div>
      <div class="text-content">
        <span class="end-text">结束后的推广，产生后的订单将自动失效</span>
        <span class="end-text">不在进行奖励</span>
        <br />
        <span class="end-text">确定要继续结束推广码？</span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="endConfirmation" size="small">确 定</el-button>
        <el-button @click="dialogEnd = false" size="small">取 消</el-button>
      </span>
    </el-dialog>
    <!-- 删除 -->
    <el-dialog :visible.sync="dialogDelete" width="30%">
      <div class="icon-box">
        <i class="el-icon-warning"></i>
      </div>
      <div class="text-content">
        <span>确定要删除吗</span>
        <br />
        <span>删除操作无法撤销,确定要删除吗</span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="removeProduct" size="small">确 定</el-button>
        <el-button @click="dialogDelete = false" size="small">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { Form as ElForm } from "element-ui";
import { UserModule } from "@/store/modules/user";
import { exportRafficData } from "@/api/common";
import {
  getProductList,
  getDetailByProductList,
  addProduct,
  changeProductStatus,
  deleteProduct,
  queryProductConfigurationType,
  queryAccordingToProduct,
  queryProductConfiguration
} from "@/api/equitesProduct";

import { getDictionaryList } from "@/api/common";

declare module "vue/types/vue" {
  interface Vue {
    [type: string]: any;
  }
}

@Component({
  name: "productpopularization",
})
export default class extends Vue {
  // 查询参数
  private form = {
    current: 1,
    searchParam: {
      productCode: "",
      productName: "",
      productStatus: "",
      promoType: ""
    },
    size: 20,
  };
  channel_code: object[] = [];
  channelVoList: object[] = [];
  noVoList: object[] = [];
  // 添加推广产品
  private addForm: any = {
    /*
      channel (integer, optional): 是否区分渠道 1是 2否 ,
      channelVoList (Array[渠道], optional): 渠道集合 ,
      deleteFlag (integer, optional): 1-未删除，2-删除 ,
      excitationType (integer, optional): 激励方式1 固定金额 2 实付金额 ,
      productCode (string, optional): 产品编码 ,
      productDesc (string, optional): 产品推广描述 ,
      productId (integer, optional),
      productName (string, optional): 产品名称 ,
      productStatus (integer, optional): 0 未开始 1进行中 2已停止 ,
      productType (string, optional): 产品类型 付费会员； ETC ,
      productUrl (string, optional): 活动地址 ,
      settlementCycle (integer, optional): 结算周期 单位天 ,
      settlementStandard (integer, optional): 结算标准 根据产品类型去查询,不同的类型 标准不一样settlementStandard
    */
    productName: "",
    productCode: "",
    productStatus: "",
    productUrl: "",
    productDesc: "",
    excitationType: "",
    channel: 1,
    settlementCycle: "",
    settlementStandard: "",
    promoType: "",//产品类型
    channelVoList: this.channelVoList,
  };
  productDetail: object = {};
  // 推广状态
  product_status = [];
  private dialogFormVisible = false; // 添加
  private dialogTableVisible = false; // 查看详情
  private dialogVisible = false; // 修改
  private dialogEnd = false; // 结束
  private dialogDelete = false; // 删除
  private labelPosition = "top";
  private productId = "";
  private placeholderCotent = "";
  private endId: any = "";
  private endStatus: any = "";
  private addNum = 0;
  excitation_type = [];
  settlement_standard = [];
  channel = [];
  product_code = [];
  private singleChannel = []; // 缓存单渠道
  private multiChannel = []; // 缓存多渠道
  selectProductType:any = [];
  chosedProductType:any = [];// 选完产品类型后过滤出的服务商

  filteredType:any = []//匹配之后需要渲染的列表
  getFilterProductTypeArr: any = []//产品类型筛选条件
  commission = (rule: any, value: any, callback: any) => {
    if (!value) {
      return callback(new Error("佣金不能为空"));
    }
    if (typeof value !== "number" && isNaN(value)) {
      callback(new Error("佣金是数字"));
    }
    callback();
  };
  checkAge = (rule: any, value: any, callback: any) => {
    if (!value) {
      return callback(new Error("周期天数不能为空"));
    }
    if (typeof value !== "number" && isNaN(value)) {
      callback(new Error("周期天数是数字"));
    }
    callback();
  };
  private rules: any = {
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
    // productUrl: [
    //   { required: true, message: "请输入url", trigger: "blur" },
    //   { min: 1, max: 190000, message: "请输入url", trigger: "blur" },
    // ],
    // productDesc: [
    //   { required: true, message: "请输入描述信息", trigger: "blur" },
    //   { min: 5, max: 50, message: "请输入5-50个汉字", trigger: "blur" },
    // ],
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
  private total: number = 0;
  // 列表
  private tableData = [];
  private formLabelWidth = "80px";
  private size = "padding-left:50px";
  private listLoading = false;
  //
  mounted() {
    this.fetchDictionaryList("product_status");
    this.fetchDictionaryList("excitation_type");
    this.fetchDictionaryList("settlement_standard");
    this.fetchDictionaryList("channel");
    this.fetchDictionaryList("product_code");
    this.fetchDictionaryList("channel_code");
    this.filterList();
    this.getProductType();
    this.getFilterProductType();
  }
  @Watch("addForm.channelVoList")
  getChannelVoList(newVal: any) {
    newVal.forEach((item: any, index: number) => {
      let a = "channelVoList." + `${index}` + ".rewardMoney";
      this.rules[a] = [{ validator: this.commission, trigger: "blur" }];
    });
  }

  choseType(val:any){
    console.log(typeof(val))
    // chosedProductType
    let choseArr:any = [];
    console.log(this.selectProductType)
    this.selectProductType.forEach((item:any)=>{
      if(val == item.typeIdentifier){
        this.chosedProductType = item.authorizedChannel;
        // this.addForm.settlementStandard = item.settlementTime;
        let chosedObjs:any = []
        this.settlement_standard.forEach((jtem:any)=>{
          if(item.settlementTime == jtem.key){
            chosedObjs.push(jtem)
            this.settlement_standard = chosedObjs;
            this.addForm.settlementStandard = jtem.key;
          }
        })
      }
    })
    
    let lastChoseArr:any = [];
    this.channel_code.forEach((item:any)=>{
      this.chosedProductType.forEach((jtem:any)=>{
        if(item.text == jtem){
          let obj:any = {
            channelCode: `0${item.key}`,
            channelId: null,
            channelName: item.text,
            productId: null,
            rewardMoney: ''
          }
          lastChoseArr.push(obj);
        }
      })
    })
    this.filteredType = lastChoseArr;
    this.addForm.channelVoList = lastChoseArr

 //带出产品编码和产品名称

    if(typeof(val)=='string'){
      this.getTpyeNames(val); 
    }
  }
  formatPromoType(promoTypes: any){
    // let retArr:any = '';
    // this.getFilterProductTypeArr.forEach((item:any)=>{
    //   if(promoTypes == item.typeIdentifier){
    //     retArr = item.businesstypeName;
    //   }
    // })
    // return retArr;



    let newRetArr = this.getFilterProductTypeArr.filter((item:any)=>{
      return item.typeIdentifier == promoTypes;
    })
    return newRetArr[0].businesstypeName;
  }
  async getTpyeNames(vals: any){
    const { data } = await queryAccordingToProduct({
      typeIdentifier: vals
    })
    console.log(data.data)
    let newTypeNames = data.data;
    if(newTypeNames){
      let codeNameArr:any = [];
      newTypeNames.forEach((item:any)=>{
        // if(vals == item.promoType){
          codeNameArr.push(
            {key: item.productCode, text: item.productName}
          )
          this.addForm.productCode = item.productCode;
          this.addForm.productName = item.productName;
        // }
      })
      this.product_code = codeNameArr;
    }
  }
  // 获取字典项
  private async fetchDictionaryList(type: any) {
    const _self = this;
    const { data } = await getDictionaryList({
      type,
    });
    _self[type] = data.data.map((item: any) => {
      if (Number(item.key)) {
        item.key = Number(item.key);
      }
      if (type === "product_status") {
        item.key = item.key.toString();
      }
      return item;
    });
    if (type === "channel_code") {
      this.dictionaryConversion(_self[type]);
    }

    // let a = this.channel_code.map((item: any) => {
    //   let text = item.text,
    //     key = item.key === "00" ? item.key : "0" + item.key;
    //   item = { channelName: text, channelCode: key };
    //   this.$set(item, "rewardMoney", "");
    //   return item;
    // });
    // let b = a.filter((item: any) => {
    //   if (item.channelCode !== 0) {
    //     item.channelName = item.channelName + "佣金";
    //   }
    //   return item.channelCode !== 6;
    // });
    // this.channelVoList = b.filter((item: any) => {
    //   return (
    //     item.channelCode == "02" ||
    //     item.channelCode == "03" ||
    //     item.channelCode == "04" ||
    //     item.channelCode == "05"
    //   );
    // });
    // this.noVoList = b.filter((item: any) => {
    //   if (item.channelCode == "00") {
    //     item.channelName = "佣金";
    //     return item.channelCode == "00";
    //   }
    // });
  }
  // 抽离字典数据处理
  private dictionaryConversion(val: any) {
    let a = val.map((item: any) => {
      let text = item.text,
        key = item.key === "00" ? item.key : "0" + item.key;
      item = { channelName: text, channelCode: key };
      this.$set(item, "rewardMoney", "");
      return item;
    });
    let b = a.filter((item: any) => {
      if (item.channelCode !== 0) {
        item.channelName = item.channelName + "佣金";
      }
      return item.channelCode !== 6;
    });
    this.channelVoList = b.filter((item: any) => {
      return (
        item.channelCode == "02" ||
        item.channelCode == "03" ||
        item.channelCode == "04" ||
        item.channelCode == "05"
      );
    });
    this.noVoList = b.filter((item: any) => {
      if (item.channelCode == "00") {
        item.channelName = "佣金";
        return item.channelCode == "00";
      }
    });
  }
  // 激励方式下拉change事件
  private excitationChange(val: any) {
    if (val == 1) {
      this.placeholderCotent = "请输入固定金额单位:                         元";
    } else if (val == 2) {
      this.placeholderCotent = "请输入实付金额单位:                          %";
    }
  }
  //产品类型筛选条件下拉
  async getFilterProductType(){
    const { data } = await queryProductConfiguration({});
    this.getFilterProductTypeArr = data.data;
    console.log(this.getFilterProductTypeArr)
    await this.unshiftAll();
  }
  unshiftAll(){
    this.getFilterProductTypeArr.unshift({businesstypeName: "全部",typeIdentifier: "all"})
  }
  // 打开推广产品添加dialog
  private addPromotionalProducts() {
    if (this.addNum === 0) {
      this.fetchDictionaryList("channel_code");
    } else if (this.addNum == 1) {
      // 查看
      this.addForm.channel = 1;
      this.fetchDictionaryList("channel_code");
      setTimeout(() => {
        this.addForm.channelVoList = this.channelVoList;
      }, 0.2 * 1000);
    } else if (this.addNum == 2) {
      // 修改
      this.fetchDictionaryList("channel_code");
      setTimeout(() => {
        this.addForm.channelVoList = this.channelVoList;
      }, 0.2 * 1000);
    }
  this.getProductType();
    // this.addForm.channel = 1;
    // if (this.addForm.channel === 1) {
    //   console.log(555);
    //   this.fetchDictionaryList("channel_code");
    //   setTimeout(() => {
    //     console.log(999);
    //     this.addForm.channelVoList = this.channelVoList;
    //   }, 0.2 * 1000);
    // }
    this.addForm.productUrl = "";
    this.addForm.productDesc = "";
    this.dialogFormVisible = true;
    this.$nextTick(() => {
      this.addForm.channelVoList = this.channelVoList;
      let FormData: any = this.$refs["addForm"];
      try {
        FormData.resetFields();
      } catch (error) {
        throw error;
      }
    });
  }
  //调用产品类型接口
  async getProductType(){
    const { data } = await queryProductConfigurationType({});
    this.selectProductType = data.data;
  }
  // 提交 添加推广产品
  private async addPromoteProducts(formName: any) {
    let FormData: any = this.$refs[formName];
    FormData.validate(async (valid: any) => {
      if (valid) {
        const { data } = await addProduct(this.addForm);
        this.$message.success(data.message);
        this.dialogFormVisible = false;
        this.filterList();
      } else {
        console.log("error submit!!");
        return false;
      }
    });
  }
  private productCodeChange(val: any) {

    let j: any;
    j = this.product_code.find((item: any) => {
      //这里的userList就是上面遍历的数据源
      return item.key === val; //筛选出匹配数据
    });
    this.addForm.productName = j.text;
  }
  // 是否区分用户渠道奖励 change
  private differentiateChannels(i: any) {
    if (this.addNum === 2) {
      // 修改
      if (i === 1) {
        // console.log(1);
        // console.log("multiChannel", this.multiChannel);
        if (this.multiChannel.length !== 0) {
          // console.log("多渠 道");
          this.addForm.channelVoList = this.multiChannel;
        } else {
          this.fetchDictionaryList("channel_code");
          setTimeout(() => {
            this.addForm.channelVoList = this.channelVoList;
          }, 0.2 * 1000);
        }
      } else if (i === 2) {
        // console.log(2);
        // console.log("singleChannel", this.singleChannel);
        if (this.singleChannel.length !== 0) {
          // console.log("单渠道");
          this.addForm.channelVoList = this.singleChannel;
        } else {
          // console.log("多渠道");
          this.fetchDictionaryList("channel_code");
          setTimeout(() => {
            this.addForm.channelVoList = this.noVoList;
          }, 0.2 * 1000);
        }
      }
    } else if (this.addNum === 1) {
      // console.log(3);
      i != 1
        ? (this.addForm.channelVoList = this.noVoList)
        : (this.addForm.channelVoList = this.channelVoList);
    } else if (this.addNum === 0) {
      // console.log(4);
      i != 1
        ? (this.addForm.channelVoList = this.noVoList)
        : (this.addForm.channelVoList = this.channelVoList);
    }
  }
  // 推广产品详情 接口
  private async handleProductDetails(id: string) {
    let { data } = await getDetailByProductList(id);
    this.productDetail = data.data;
    this.channelVoList = data.data.channelVoList;
    this.addForm = data.data;
    if (data.data.channelVoList.length === 1) {
      this.singleChannel = data.data.channelVoList;
    } else {
      this.multiChannel = data.data.channelVoList;
      this.filteredType = data.data.channelVoList;
    }
  }

  // 打开推广详情dialog
  private viewDetails(id: string) {
    this.addNum = 1;
    this.dialogTableVisible = true;
    this.handleProductDetails(id);
  }

  // 打开修改dialog
  private modifyDialog(id: string) {
    this.addNum = 2;
    this.dialogVisible = true;
    this.productId = id;
  }

  // 修改确定 打开推广产品更改dialog并读取数据
  private showModifyDialog() {
    this.dialogVisible = false;
    this.handleProductDetails(this.productId);
    this.dialogFormVisible = true;
  }

  // 打开结束dialog
  private async endDialog(productId: string, status: string) {
    if (status === "1") {
      // 启动
      const { data } = await changeProductStatus(productId, status);
      let message = data.message;
      if (message !== "修改成功") {
        this.$message.error(`操作推广以${message}`);
      } else {
        this.$message.success(`操作推广以${message}`);
      }
      this.filterList();
    } else if (status === "2") {
      this.dialogEnd = true;
      this.endId = productId;
      this.endStatus = status;
      this.filterList();
    }
  }
  // 结束 确定
  private async endConfirmation() {
    // { productId, status }: { productId: any, status: any }
    // let endId = this.endId;
    // let endStatus = this.endStatus;
    const { data } = await changeProductStatus(this.endId, this.endStatus);
    let message = data.message;
    if (message !== "修改成功") {
      this.$message.error(`操作推广以${message}`);
    } else {
      this.$message.success(`操作推广以${message}`);
    }
    this.dialogEnd = false;
    this.filterList();
  }

  // 打开删除dialog
  private deleteDialog(id: string) {
    this.dialogDelete = true;
    this.productId = id;
  }

  // 删除推广产品
  private async removeProduct() {
    this.dialogDelete = false;
    const { data } = await deleteProduct(this.productId);
    let message = data.message;
    let code = data.code;
    if (code === 0) {
      this.$message.error(`产品${message}`);
    } else {
      this.$message.success(`产品${message}`);
    }

    this.filterList();
  }

  // 表格index改变时
  private handleCurrentChange(val: any) {
    this.form.current = val;
    this.filterList();
  }

  // 查询列表数据
  private async filterList() {
    this.listLoading = false;
    const _self = this;
    const { data } = await getProductList(this.form);

    this.tableData = data.data;
    this.total = data.total;
    setTimeout(() => {
      this.listLoading = false;
    }, 0.5 * 1000);
  }
  // 搜索列表
  private getList() {
    this.form.current = 1;
    this.filterList();
  }

  private selsChange(val: any) {
    this.form.size = val;
    this.filterList();
  }
  // 关闭 dialog 回调
  private dialogClosed() {
    for (let key in this.addForm) {
      if (key == "channelVoList") {
        this.addForm[key] = [];
      } else {
        this.addForm[key] = "";
      }
    }
    this.channelVoList = [];
    this.multiChannel = [];
    this.singleChannel = [];
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
.el-form-item{
  margin-right: 20px !important;
}
.size-input {
  width: 300px;
}
.from-item-left {
  padding-left: 50px;
}
.table-pagination {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 20px;
}

.dynamic-tips {
  // width: 400px;
  padding-left: 20px;
  color: rgb(73, 157, 242);
  line-height: 30px;
  border: 1px solid rgb(73, 157, 242);
  margin-bottom: 10px;
}
.details-content {
  padding-left: 20px;
  text-align: left;
  size: 14px;
  line-height: 30px;
}
.details-content:nth-child(even) {
  background-color: rgb(245, 245, 245);
}
.icon-box {
  display: inline-block;
  margin-left: 15px;
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
  margin-left: 40px;
  margin-top: -40px;
  .text-title {
    font-size: 24px;
  }
  .end-text {
    margin-left: 60px;
  }
}

// .customerName {
//   color: #108ee9;
// }

.el-table td,
.el-table th {
  text-align: center;
}
.el-dialog__body {
  padding: 5px 20px 20px 20px;
  color: #1f2d3d;
  font-size: 14px;
  word-break: break-all;
}
.el-dialog__footer {
  padding: 0px 20px 20px 20px;
  text-align: center;
  box-sizing: border-box;
}
</style>
