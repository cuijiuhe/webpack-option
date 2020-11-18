<template>
	<div class="order-container">
		<!-- <div class="order-header">
			<el-button
				:type="currentOrderStatus == ORDER_STATUS_1 ? 'primary':''"
				size="mini"
				@click="orderStatus(ORDER_STATUS_1)"
			>全部({{orderNumInfo.allOrderNum}})</el-button>
			<el-button
				:type="currentOrderStatus == ORDER_STATUS_2 ? 'primary':''"
				size="mini"
				@click="orderStatus(ORDER_STATUS_2)"
			>已审核({{orderNumInfo.checkOrderNum}})</el-button>
			<el-button
				:type="currentOrderStatus == ORDER_STATUS_3 ? 'primary':''"
				size="mini"
				@click="orderStatus(ORDER_STATUS_3)"
			>未审核({{orderNumInfo.uncheckOrderNum}})</el-button>
			<el-button
				:type="currentOrderStatus == ORDER_STATUS_4 ? 'primary':''"
				size="mini"
				@click="orderStatus(ORDER_STATUS_4)"
			>已激活({{orderNumInfo.activatedOrderNum}})</el-button>
			<el-button
				:type="currentOrderStatus == ORDER_STATUS_5 ? 'primary':''"
				size="mini"
				@click="orderStatus(ORDER_STATUS_5)"
			>未激活({{orderNumInfo.unactivatedOrderNum}})</el-button>
		</div>-->

		<div class="order-filter">
			<el-form
				ref="filterform"
				:model="form"
				label-width="100px"
				size="small"
				:inline="true"
				label-position="left"
			>
				<el-row :gutter="14">
					<el-col :span="6">
						<el-form-item label="客户:" prop="clientName">
							<el-input
								v-model="form.clientName"
								suffix-icon="el-icon-date"
								placeholder="输入姓名/手机号"
								clearable
							></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="推广者:" prop="spreaderName">
							<el-input
								v-model="form.spreaderName"
								suffix-icon="el-icon-date"
								placeholder="输入姓名/手机号"
								clearable
							></el-input>
						</el-form-item>
					</el-col>
					<!-- <el-col :span="6">
						<el-form-item label="推广者来源:" prop="channelSource">
							<el-select v-model="form.channelSource" placeholder="请选择" clearable>
								<el-option
									v-for="item in promoterSourceOptions"
									:key="item.value"
									:label="item.label"
									:value="item.value"
								></el-option>
							</el-select>
						</el-form-item>
					</el-col>-->
					<el-col :span="6">
						<el-form-item label="车辆类型:" prop="vehicleType">
							<el-select v-model="form.vehicleType" placeholder="请选择" clearable>
								<el-option
									v-for="item in carTypeOptions"
									:key="item.value"
									:label="item.label"
									:value="item.value"
								></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="车牌号:" prop="vehicleNo">
							<el-input
								v-model="form.vehicleNo"
								suffix-icon="el-icon-date"
								placeholder="输入办理车牌号"
								clearable
							></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="14">
					<el-col :span="6">
						<el-form-item label="订单渠道:" prop="orderChannel">
							<el-select v-model="form.orderChannel" placeholder="请选择" style="width:100%" clearable>
								<el-option
									v-for="item in orderChannelStatusOptions"
									:key="item.value"
									:label="item.label"
									:value="item.value"
								></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="账户类型:" prop="accountType">
							<el-select v-model="form.accountType" placeholder="请选择" clearable>
								<el-option
									v-for="item in accountTypeOptions"
									:key="item.value"
									:label="item.label"
									:value="item.value"
								></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="办理状态:" prop="transactionStatus">
							<el-select v-model="form.transactionStatus" placeholder="请选择" style="width:100%" clearable>
								<el-option
									v-for="item in dealStatusOptions"
									:key="item.value"
									:label="item.label"
									:value="item.value"
								></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="审核状态:" prop="cashStatus">
							<el-select v-model="form.cashStatus" placeholder="请选择" style="width:100%" clearable>
								<el-option
									v-for="item in examineStatusOptions"
									:key="item.value"
									:label="item.label"
									:value="item.value"
								></el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="14">
					<el-col :span="6">
						<el-form-item label="驳回原因:" prop="failReason">
							<el-select v-model="form.failReason" placeholder="请选择" style="width:100%" clearable>
								<el-option
									v-for="item in failReasonStatusOptions"
									:key="item.value"
									:label="item.label"
									:value="item.value"
								></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8" :offset="6">
						<el-form-item label="申请日期:" prop="applyDate">
							<el-date-picker
								v-model="applyDate"
								value-format="yyyy-MM-dd"
								type="daterange"
								range-separator="至"
								start-placeholder="开始日期"
								end-placeholder="结束日期"
							></el-date-picker>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="14">
					<el-col :span="8">
						<el-form-item label="业务审核时间:" prop="workAuditTime">
							<el-date-picker
								v-model="workAuditTime"
								value-format="yyyy-MM-dd"
								type="daterange"
								range-separator="至"
								start-placeholder="开始日期"
								end-placeholder="结束日期"
							></el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="8" :offset="4">
						<el-form-item label="财务审核时间:" prop="financeAuditTime">
							<el-date-picker
								v-model="financeAuditTime"
								value-format="yyyy-MM-dd"
								type="daterange"
								range-separator="至"
								start-placeholder="开始日期"
								end-placeholder="结束日期"
							></el-date-picker>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="14">
					<el-col :span="8">
						<el-form-item label="办理时间:" prop="transactionTime">
							<el-date-picker
								v-model="transactionTime"
								value-format="yyyy-MM-dd"
								type="daterange"
								range-separator="至"
								start-placeholder="开始日期"
								end-placeholder="结束日期"
							></el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="8" :offset="4">
						<el-form-item label="激活时间:" prop="activateTime">
							<el-date-picker
								v-model="activateTime"
								value-format="yyyy-MM-dd"
								type="daterange"
								range-separator="至"
								start-placeholder="开始日期"
								end-placeholder="结束日期"
							></el-date-picker>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-button type="primary" size="mini" @click="getList()">查询</el-button>
					<el-button plain size="mini" @click="clearFilterList()">重置</el-button>
				</el-row>
			</el-form>
		</div>
		<div class="order-table">
			<div class="table-tools">
				<el-button
					v-checkbtn="['businessPass']"
					type="primary"
					size="mini"
					@click="orderSucStatus(ORDER_SUC_STATUS_1)"
				>业务通过</el-button>
				<el-button
					v-checkbtn="['businessReject']"
					type="danger"
					size="mini"
					@click="orderSucStatus(ORDER_SUC_STATUS_2)"
				>业务驳回</el-button>
				<el-button
					v-checkbtn="['financePass']"
					type="primary"
					size="mini"
					@click="orderSucStatus(ORDER_SUC_STATUS_3)"
				>转账成功</el-button>
				<el-button
					v-checkbtn="['financeReject']"
					type="danger"
					size="mini"
					@click="orderSucStatus(ORDER_SUC_STATUS_4)"
				>财务驳回</el-button>
				<el-button
					v-checkbtn="['orderExport']"
					type="primary"
					size="mini"
					@click="exportDataList()"
				>导出报表</el-button>
			</div>
			<el-table
				:data="tableData"
				border
				style="width: 100%"
				@selection-change="handleSelectionChange"
				stripe
				v-loading="listLoading"
				height="400px"
			>
				<el-table-column align="center" type="selection" :selectable="selectable" fixed></el-table-column>
				<el-table-column
					prop="orderNum"
					label="订单编号"
					width="140"
					align="center"
					:show-overflow-tooltip="true"
				></el-table-column>
				<el-table-column prop="orderChannelStr" label="订单渠道" width="110" align="center"></el-table-column>

				<el-table-column prop="clientName" label="客户姓名" width="100" align="center">
					<template slot-scope="scope">
						<a class="customerName" @click="handleClientDetails(scope.row)">{{ scope.row.clientName}}</a>
					</template>
				</el-table-column>
				<el-table-column prop="vehicleNo" label="车牌号" width="120" align="center">
					<template slot-scope="scope">
						<a class="customerName" @click="handleVehicleDetails(scope.row)">{{ scope.row.vehicleNo}}</a>
					</template>
				</el-table-column>
				<el-table-column
					prop="vehicleTypeStr"
					label="车辆类型"
					width="110"
					align="center"
					:show-overflow-tooltip="true"
				></el-table-column>
				<el-table-column prop="transactionStatusStr" label="办理状态" width="180" align="center"></el-table-column>
				<el-table-column prop="transactionTime" label="办理时间" width="180" align="center"></el-table-column>=
				<el-table-column prop="activateTime" label="激活时间" width="180" align="center"></el-table-column>
				<el-table-column
					prop="getCardTypeStr"
					label="客户收件方式"
					width="130"
					align="center"
					:show-overflow-tooltip="true"
				>
					<template slot-scope="scope">
						<a class="customerName" @click="handleCardDetails(scope.row)">{{ scope.row.getCardTypeStr}}</a>
					</template>
				</el-table-column>
				<el-table-column prop="promoCode" label="推广码" width="120" align="center"></el-table-column>
				<el-table-column prop="spreaderName" label="推广者姓名" width="120" align="center">
					<template slot-scope="scope">
						<a class="customerName" @click="handleSpreaderDetails(scope.row)">{{scope.row.spreaderName}}</a>
					</template>
				</el-table-column>
				<el-table-column
					prop="spreaderEnterprise"
					label="推广者所属企业"
					width="180"
					align="center"
					:show-overflow-tooltip="true"
				></el-table-column>
				<el-table-column prop="bankTypeStr" label="产品类型" width="110" align="center"></el-table-column>
				<el-table-column prop="amountBonus" label="奖励金额" width="110" align="center"></el-table-column>
				<el-table-column
					prop="withdrawBonus"
					label="提现金额(元)"
					width="120"
					align="center"
					:show-overflow-tooltip="true"
				></el-table-column>
				<el-table-column
					prop="accountTypeStr"
					label="账户类型"
					width="110"
					align="center"
					:show-overflow-tooltip="true"
				></el-table-column>
				<el-table-column
					prop="bankCardNum"
					label="银行卡"
					width="180"
					align="center"
					:show-overflow-tooltip="true"
				></el-table-column>
				<el-table-column
					prop="openingBank"
					label="银行开户行"
					width="180"
					align="center"
					:show-overflow-tooltip="true"
				></el-table-column>
				<el-table-column prop="isBcmCardStr" label="是否交行" width="90" align="center">
					<template slot-scope="scope">{{scope.row.isBcmCardStr}}</template>
				</el-table-column>
				<el-table-column
					prop="withdrawalNum"
					label="提现订单流水号"
					width="180"
					:show-overflow-tooltip="true"
					align="center"
				></el-table-column>
				<el-table-column
					prop="withdrawTime"
					label="提现时间"
					width="180"
					align="center"
					:show-overflow-tooltip="true"
				></el-table-column>
				<el-table-column
					prop="cashStatusStr"
					label="提现审核状态"
					width="120"
					align="center"
					:show-overflow-tooltip="true"
				></el-table-column>
				<el-table-column
					prop="operationTimeStr"
					label="业务审核时间"
					width="180"
					align="center"
					:show-overflow-tooltip="true"
				></el-table-column>
				<el-table-column
					prop="financeTimeStr"
					label="财务审核时间"
					width="180"
					align="center"
					:show-overflow-tooltip="true"
				></el-table-column>
				<el-table-column
					prop="failReason"
					label="驳回原因"
					width="180"
					align="center"
					:show-overflow-tooltip="true"
				></el-table-column>
				<el-table-column
					prop="transferFailureCause"
					label="转账失败原因"
					width="180"
					align="center"
					:show-overflow-tooltip="true"
				></el-table-column>
				<el-table-column
					prop="oldWithdrawalsOrderNumber"
					label="原失败流水号"
					width="200"
					align="center"
					:show-overflow-tooltip="true"
				></el-table-column>
			</el-table>
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
		<el-dialog title="驳回原因" :visible.sync="refusalForm">
			<el-form>
				<el-form-item label="选择">
					<el-radio-group v-model="refusalRadio" @change="changeRadio">
						<el-radio label="姓名错误">姓名错误</el-radio>
						<el-radio label="账号错误">账号错误</el-radio>
						<el-radio label="支行错误">支行错误</el-radio>
						<el-radio label="其他">其他</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item>
					<el-input type="textarea" :rows="2" v-model="otherfailReason" placeholder="请输入驳回原因"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button size="mini" type="primary" @click="add(3)">确 定</el-button>
				<el-button size="mini" @click="shut(3)">关 闭</el-button>
			</span>
		</el-dialog>
		<el-dialog title="财务驳回" :visible.sync="financeForm">
			<el-form>
				<el-form-item label="选择">
					<el-radio-group v-model="financeRadio">
						<el-radio label="姓名错误">姓名错误</el-radio>
						<el-radio label="账号错误">账号错误</el-radio>
						<el-radio label="支行错误">支行错误</el-radio>
						<el-radio label="转账失败">转账失败</el-radio>
						<el-radio label="其他">其他</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item>
					<el-input type="textarea" :rows="2" v-model="otherFinancefailReason" placeholder="请输入驳回原因"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button size="mini" type="primary" @click="add(5)">确 定</el-button>
				<el-button size="mini" @click="shut(5)">关 闭</el-button>
			</span>
		</el-dialog>

		<el-dialog title="客户详情" :visible.sync="clientDialogTable">
			<el-table :data="clientData" border style="width: 100%">
				<el-table-column property="clientName" label="客户姓名" width="120" :show-overflow-tooltip="true"></el-table-column>
				<el-table-column
					property="clientIdCardNo"
					label="身份证号"
					width="120"
					:show-overflow-tooltip="true"
				></el-table-column>
				<el-table-column property="belongBank" label="所属银行" width="120" :show-overflow-tooltip="true"></el-table-column>
				<el-table-column property="bankCardNum" label="银行卡号" width="120" :show-overflow-tooltip="true"></el-table-column>
				<el-table-column property="reservedTel" label="预留手机号" width="120" :show-overflow-tooltip="true"></el-table-column>
				<el-table-column property="nowAddress" label="现住址" width="120" :show-overflow-tooltip="true"></el-table-column>
				<el-table-column
					property="contactsName"
					label="联系人姓名"
					width="120"
					:show-overflow-tooltip="true"
				></el-table-column>
				<el-table-column
					property="contactsRelation"
					label="联系人关系"
					width="120"
					:show-overflow-tooltip="true"
				></el-table-column>
				<el-table-column
					property="contactsTel"
					label="联系人手机号"
					width="120"
					:show-overflow-tooltip="true"
				></el-table-column>
			</el-table>
		</el-dialog>
		<el-dialog title="车辆详情" :visible.sync="vehicleDialogTable">
			<el-table :data="vehicleData" border style="width: 100%" stripe>
				<el-table-column property="brand" label="品牌" width="120" :show-overflow-tooltip="true"></el-table-column>
				<!-- 型号字段不确定 -->
				<!-- <el-table-column property="itemNo" label="型号"></el-table-column> -->
				<el-table-column property="vin" label="VIN" width="120" :show-overflow-tooltip="true"></el-table-column>
				<el-table-column property="engineNo" label="发动机号" width="120" :show-overflow-tooltip="true"></el-table-column>
				<el-table-column property="color" label="车牌颜色" width="120" :show-overflow-tooltip="true"></el-table-column>
				<el-table-column property="axleNumber" label="车轴数" width="120" :show-overflow-tooltip="true"></el-table-column>
				<el-table-column
					property="vehicleTypeStr"
					label="车辆类型"
					width="120"
					:show-overflow-tooltip="true"
				></el-table-column>
				<!-- 车种字段不确定 -->
				<!-- <el-table-column property="vehicleVariety" label="车种" width="120" :show-overflow-tooltip="true"></el-table-column> -->
				<el-table-column
					property="vehicleOwner"
					label="车辆所有人"
					width="120"
					:show-overflow-tooltip="true"
				></el-table-column>
				<el-table-column
					property="personsCapacity"
					label="核对载人数"
					width="120"
					:show-overflow-tooltip="true"
				></el-table-column>
				<el-table-column property="useNature" label="使用性质" width="120" :show-overflow-tooltip="true"></el-table-column>
				<el-table-column property="outline" label="外形轮廓" width="120" :show-overflow-tooltip="true"></el-table-column>
				<el-table-column property="totalMass" label="总质量" width="120" :show-overflow-tooltip="true"></el-table-column>
				<el-table-column property="unladenMass" label="整备质量" width="120" :show-overflow-tooltip="true"></el-table-column>
			</el-table>
		</el-dialog>
		<el-dialog title="自提详情" :visible.sync="extractDialogTable">
			<el-table :data="extractData" border style="width: 100%">
				<el-table-column property="extractName" label="自提点名称"></el-table-column>
				<el-table-column property="extractAddress" label="自提点地址"></el-table-column>
			</el-table>
		</el-dialog>
		<el-dialog title="邮寄详情" :visible.sync="mailingDialogTable">
			<el-table :data="mailingData" border style="width: 100%">
				<el-table-column property="trackingNo" label="物流单号"></el-table-column>
				<el-table-column property="mailingAddress" label="邮寄地址"></el-table-column>
				<el-table-column property="recipient" label="收件人"></el-table-column>
				<el-table-column property="recipientTel" label="收件人手机号"></el-table-column>
			</el-table>
		</el-dialog>
		<el-dialog title="推广者姓名详情" :visible.sync="spreaderDialogTable">
			<el-table :data="spreaderData" border style="width: 100%">
				<el-table-column property="channelSourceStr" label="渠道来源"></el-table-column>
				<el-table-column property="promoCode" label="推广码"></el-table-column>
				<el-table-column property="spreaderAccount" label="推广者账号"></el-table-column>
				<el-table-column property="spreaderName" label="推广者姓名"></el-table-column>
				<el-table-column property="spreaderTel" label="推广者手机号"></el-table-column>
				<el-table-column property="date" label="推广者身份证"></el-table-column>
				<el-table-column property="spreaderEnterprise" label="推广者所属企业"></el-table-column>
			</el-table>
		</el-dialog>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Form as ElForm } from 'element-ui'
import { UserModule } from '@/store/modules/user'
import { exportRafficData } from '@/api/common'
import { getexportRafficData } from '@/api/order'
import qs from 'qs'

import {
	getOrderData,
	getOrderNumInfo,
	getClientDetail,
	getMailMessage,
	getTakeTheirMessage,
	getVehicleDetail,
	getSpreaderDetail,
	updateEtcOrderInfo,
} from '@/api/order'

@Component({
	name: 'ETC',
})
export default class extends Vue {
	ORDER_STATUS_1 = 1
	ORDER_STATUS_2 = 2
	ORDER_STATUS_3 = 3
	ORDER_STATUS_4 = 4
	ORDER_STATUS_5 = 5
	private currentOrderStatus = this.ORDER_STATUS_1

	ORDER_SUC_STATUS_1 = 2
	ORDER_SUC_STATUS_2 = 3
	ORDER_SUC_STATUS_3 = 4
	ORDER_SUC_STATUS_4 = 5
	// private currentSucStatus = this.ORDER_SUC_STATUS_1

	// 查询参数
	private form = {
		currentPage: 1,
		pageSize: 10,
		clientName: '', // 客户姓名/手机号
		spreaderName: '', //推广者
		channelSource: '', //推广者来源
		vehicleNo: '', // 车牌号
		vehicleType: '', // 车辆类型
		accountType: '', //账户类型
		transactionStatus: '', // 办理状态
		cashStatus: '', //审核状态
		failReason: '', // 驳回原因
		orderChannel: '', //订单渠道
		createTimeStart: '', // 申请开始时间
		createTimeEnd: '', //申请结束时间
		operationTimeStart: '', // 业务审核开始时间
		operationTimeEnd: '', //业务审核结束时间
		financeTimeStart: '', //财务审核开始时间
		financeTimeEnd: '', //财务审核结束时间
		transactionTimeStart: '',
		transactionTimeEnd: '',
		activateTimeStart: '',
		activateTimeEnd: '',
	}
	private financeRadio = '姓名错误'
	private otherFinancefailReason = ''
	private otherfailReason = ''
	private refusalRadio = '姓名错误'
	private orderNumInfo = {}
	private spreaderData: any[] = []
	private mailingData: any[] = []
	private extractData: any[] = []
	private vehicleData: any[] = []
	private clientData: any[] = []
	private selectOrderNums: any[] = []
	private withdrawalNum: String[] = []
	//推广者来源选项
	promoterSourceOptions = [
		{ value: '', label: '全部' },
		{ value: '01', label: '福田E家' },
		{ value: '02', label: '服务商' },
		{ value: '03', label: '经销商' },
		{ value: '04', label: 'ICM' },
		{ value: '05', label: '客户服务中心' },
	]
	// 车辆类型
	carTypeOptions = [
		{ value: '', label: '全部' },
		{ value: '00', label: '重型' },
		{ value: '01', label: '中型' },
		{ value: '02', label: '轻型/微型' },
		{ value: '03', label: '其他' },
	]
	// 账户类型
	accountTypeOptions = [
		{ value: '', label: '全部' },
		{ value: '01', label: '支付宝' },
		{ value: '02', label: '银联' },
		{ value: '03', label: '微信' },
	]
	// 办理状态
	dealStatusOptions = [
		{ value: '', label: '全部' },
		{ value: '1', label: '待银行面签' },
		{ value: '2', label: '待银行授信审核' },
		{ value: '3', label: '待发货' },
		{ value: '4', label: '已发货' },
		{ value: '5', label: '已激活' },
		{ value: '6', label: '已使用' },
		{ value: '7', label: '银行审核未通过' },
		{ value: '8', label: '发行方审核未通过' },
	]
	// 审核状态
	examineStatusOptions = [
		{ value: '', label: '全部' },
		{ value: '1', label: '未审核' },
		{ value: '2', label: '业务审核通过' },
		{ value: '3', label: '业务驳回' },
		{ value: '4', label: '财务审核通过' },
		{ value: '5', label: '财务驳回' },
		{ value: '6', label: '审核通过转账成功' },
		{ value: '7', label: '审核通过转账失败' },
	]
	// 驳回原因
	failReasonStatusOptions = [
		{ value: '', label: '全部' },
		{ value: '姓名错误', label: '姓名错误' },
		{ value: '支行错误', label: '支行错误' },
		{ value: '账号错误', label: '账号错误' },
		{ value: '其他原因', label: '其他原因' },
	]
	// 订单渠道
	orderChannelStatusOptions = [
		{ value: '', label: '全部' },
		{ value: '01', label: '福田e家' },
		{ value: '02', label: '服务商' },
		{ value: '03', label: '经销商' },
		{ value: '04', label: 'ICM' },
		{ value: '05', label: '客户服务中心' },
	]
	private refusalForm = false
	private financeForm = false
	private vehicleDialogTable = false
	private extractDialogTable = false
	private mailingDialogTable = false
	private spreaderDialogTable = false
	private clientDialogTable = false
	private total: number = 0
	private applyDate = [] //申请日期
	private workAuditTime = [] //业务审核时间
	private financeAuditTime = [] //财务审核时间
	private tableData = []
	private listLoading = true
	private transactionTime = []
	private activateTime = []

	mounted() {
		this.getOrderNumInfo()
		this.filterList()
	}

	private selectable(row: any, index: number) {
		return (
			row.cashStatus != 3 &&
			row.cashStatus != 4 &&
			row.cashStatus != 5 &&
			row.cashStatus != 6 &&
			row.cashStatus != 7
		)
	}

	private async getOrderNumInfo() {
		let { data } = await getOrderNumInfo()
		this.orderNumInfo = data.data
	}
	private changeRadio(val: any) {
		console.log(val)
	}
	// 订单状态变更方法
	private orderStatus(statusCode: any) {
		console.log(this.currentOrderStatus)
		this.currentOrderStatus = statusCode
		this.filterList()
	}
	// 审核状态
	private orderSucStatus(sucCode: any) {
		let num = this.selectOrderNums
		if (num.length === 0) {
			this.$message({
				showClose: true,
				message: '请选择选项',
				type: 'warning',
			})
			return
		}
		let orderNumbers = this.selectOrderNums.join(',')
		let vo = {
			cashStatus: sucCode,
			failReason: '',
			orderNums: orderNumbers,
			withdrawalNums: this.withdrawalNum.join(','),
		}
		if (sucCode == 2) {
			this.updateEtcOrderMethod(vo)
		} else if (sucCode == 4) {
			updateEtcOrderInfo(vo).then((data) => {
				if (data.data.code == 0) {
					// let url = data.data.url
					// window.open(url)
					this.filterList()
					this.$message({
						showClose: true,
						message: '更新成功',
						type: 'success',
					})
				} else {
					this.$message({
						showClose: true,
						message: `${data.data.msg}`,
						type: 'error',
					})
				}
			})
		} else if (sucCode == 3) {
			this.refusalForm = true
		} else if (sucCode == 5) {
			this.financeForm = true
		}
	}

	// 对话框 确定
	private add(val: any) {
		if (val == 3) {
			let addRefusal = this.refusalRadio
			let addTextarea = this.otherfailReason
			let orderNumbers = this.selectOrderNums.join(',')
			let joints =
				addTextarea == ''
					? addRefusal
					: `${addRefusal}` + ',' + `${addTextarea}`
			let vo = {
				cashStatus: val,
				failReason: joints,
				orderNums: orderNumbers,
				withdrawalNums: this.withdrawalNum.join(','),
			}
			this.updateEtcOrderMethod(vo)
			this.refusalForm = false
			this.refusalRadio = '姓名错误'
		} else if (val == 5) {
			let addFinance = this.financeRadio
			let addTextarea = this.otherFinancefailReason
			let orderNumbers = this.selectOrderNums.join(',')
			let joint =
				addTextarea == ''
					? addFinance
					: `${addFinance}` + ',' + `${addTextarea}`
			let vo = {
				cashStatus: val,
				failReason: joint,
				orderNums: orderNumbers,
				withdrawalNums: this.withdrawalNum.join(','),
			}
			this.updateEtcOrderMethod(vo)
			this.financeForm = false
			this.financeRadio = '姓名错误'
		}
	}
	// 对话框 关闭
	private shut(val: any) {
		if (val == 3) {
			this.refusalForm = false
		} else if (val == 5) {
			this.financeForm = false
		}
	}
	// 更新订单信息方法
	private updateEtcOrderMethod(val: any) {
		updateEtcOrderInfo(val).then((data) => {
			if (data.data.code == 0) {
				this.filterList()
				this.$message({
					showClose: true,
					message: '更新成功',
					type: 'success',
				})
			} else {
				this.$message({
					showClose: true,
					message: data.data.msg,
					type: 'error',
				})
			}
		})
	}

	// 表格的checkbox
	private handleSelectionChange(val: any) {
		let order: any[] = []
		this.withdrawalNum = []
		val.map((item: any) => {
			return order.push(item.orderNum)
		})
		val.map((item: any) => {
			return this.withdrawalNum.push(item.withdrawalNum)
		})
		this.selectOrderNums = order
	}

	// 查询列表数据
	private async filterList() {
		this.listLoading = false
		const _self = this
		_self.listLoading = true
		_self.form.createTimeStart =
			_self.applyDate.length > 1 ? _self.applyDate[0] : ''
		_self.form.createTimeEnd =
			_self.applyDate.length > 1 ? _self.applyDate[1] : ''
		_self.form.operationTimeStart =
			_self.workAuditTime.length > 1 ? _self.workAuditTime[0] : ''
		_self.form.operationTimeEnd =
			_self.workAuditTime.length > 1 ? _self.workAuditTime[1] : ''
		_self.form.financeTimeStart =
			_self.financeAuditTime.length > 1 ? _self.financeAuditTime[0] : ''
		_self.form.financeTimeEnd =
			_self.financeAuditTime.length > 1 ? _self.financeAuditTime[1] : ''

		_self.form.transactionTimeStart =
			_self.transactionTime.length > 1 ? _self.transactionTime[0] : ''
		_self.form.transactionTimeEnd =
			_self.transactionTime.length > 1 ? _self.transactionTime[1] : ''
		_self.form.activateTimeStart =
			_self.activateTime.length > 1 ? _self.activateTime[0] : ''
		_self.form.activateTimeEnd =
			_self.activateTime.length > 1 ? _self.activateTime[1] : ''
		const { data } = await getOrderData(this.form)
		// console.log(data)
		this.tableData = data.rows
		this.total = data.total
		setTimeout(() => {
			this.listLoading = false
		}, 0.5 * 1000)
	}
	// 搜索列表
	private getList() {
		this.form.currentPage = 1
		this.filterList()
	}
	// 车辆详情
	private async handleVehicleDetails(val: any) {
		let Detail = val
		let orderNum = Detail.orderNum
		let num = { orderNum: orderNum }
		let { data } = await getVehicleDetail(num)
		let arr: any[] = []
		arr.push(data.data)
		this.vehicleData = arr
		this.vehicleDialogTable = true
	}
	// 推广者姓名详情
	private async handleSpreaderDetails(val: any) {
		let Detail = val
		let promoCode = Detail.promoCode
		let num = { promoCode: promoCode }
		let { data } = await getSpreaderDetail(num)
		let arr: any[] = []
		arr.push(data.data)
		this.spreaderData = arr
		this.spreaderDialogTable = true
	}

	//获取客户详情
	private async handleClientDetails(val: any) {
		let Detail = val
		let orderNum = Detail.orderNum
		let num = { orderNum: orderNum }
		let { data } = await getClientDetail(num)
		let arr: any[] = []
		arr.push(data.data)
		this.clientData = arr
		this.clientDialogTable = true
	}
	// 获取客户收件方式
	private async handleCardDetails(val: any) {
		let Detail = val
		console.log(Detail)
		let orderNum = Detail.orderNum
		let num = { orderNum: orderNum }
		if (Detail.getCardType == '01') {
			let { data } = await getTakeTheirMessage(num)
			let arr: any[] = []
			arr.push(data.data)
			this.extractData = arr
			this.extractDialogTable = true
		} else {
			let { data } = await getMailMessage(num)
			let arr: any[] = []
			arr.push(data.data)
			this.mailingData = arr
			this.mailingDialogTable = true
		}
	}
	// 表格index改变时
	private handleCurrentChange(val: any) {
		this.form.currentPage = val
		this.filterList()
	}

	// 报表导出
	private async exportDataList() {
		let { data } = await getexportRafficData(this.form)
		let exportExcelParams = {
			delete: true,
			fileName: data.msg,
		}
		console.log(data)
		location.href = `${exportRafficData}?${qs.stringify(exportExcelParams)}`
	}

	private selsChange(val: any) {
		this.form.pageSize = val
		this.filterList()
	}

	// 重置搜索信息
	private clearFilterList() {
		this.applyDate = [] //申请日期
		this.workAuditTime = [] //业务审核时间
		this.financeAuditTime = [] //财务审核时间
		this.transactionTime = []
		this.activateTime = []
		;(this.$refs.filterform as ElForm).resetFields()
		this.form.pageSize = 10
		this.form.currentPage = 1
		this.getList()
	}
}
</script>

<style lang="scss">
.order {
	&-container {
		margin: 30px;
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
.table-pagination {
	display: flex;
	align-items: center;
	justify-content: flex-end;
	margin-top: 20px;
}
.customerName {
	color: #108ee9;
}
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
	text-align: right;
	box-sizing: border-box;
}
</style>
