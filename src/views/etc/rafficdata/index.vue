<template>
	<div class="order-container">
		<div class="order-filter">
			<el-form
				ref="filterform"
				:model="form"
				label-width="110px"
				size="small"
				:inline="true"
				label-position="left"
			>
				<el-row :gutter="20">
					<el-col :span="6">
						<el-form-item label="申请人：" prop="name">
							<el-input v-model="form.name" suffix-icon="el-icon-date" placeholder="申请人" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="货通卡号：" prop="cpuNo">
							<el-input v-model="form.cpuNo" suffix-icon="el-icon-date" placeholder="货通卡号" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="车牌号：" prop="vehicleNo">
							<el-input v-model="form.vehicleNo" suffix-icon="el-icon-date" placeholder="车牌号" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="交易场景类型：" prop="transactionType">
							<el-select v-model="form.transactionType" placeholder="请选择" clearable>
								<el-option
									v-for="item in transactionTypeList"
									:key="item.value"
									:label="item.label"
									:value="item.value"
								></el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="6">
						<el-form-item label="交易信息情况：" prop="transactionSituation">
							<el-select v-model="form.transactionSituation" placeholder="请选择" clearable>
								<el-option
									v-for="item in transactionSituationList"
									:key="item.value"
									:label="item.label"
									:value="item.value"
								></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8" :offset="6">
						<el-form-item label="操作时间：" prop="operaTime">
							<el-date-picker
								v-model="operaTime"
								type="daterange"
								range-separator="至"
								value-format="yyyy-MM-dd"
								start-placeholder="开始日期"
								end-placeholder="结束日期"
							></el-date-picker>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-button type="primary" size="mini" @click="filterList()">查询</el-button>
					<el-button plain size="mini" @click="clearFilterList()">重置</el-button>
				</el-row>
			</el-form>
		</div>
		<div class="order-table">
			<div class="table-tools">
				<el-button type="primary" size="mini" @click="exportDataList()">导出报表</el-button>
			</div>
			<el-table :data="tableData" border style="width: 100%" height="500px" v-loading="listLoading" stripe>
				<el-table-column
					prop="name"
					label="姓名"
					width="100"
					align="center"
					:show-overflow-tooltip="true"
				></el-table-column>
				<el-table-column
					align="center"
					width="190"
					prop="idCardNum"
					:show-overflow-tooltip="true"
					label="身份证号"
				></el-table-column>
				<el-table-column
					align="center"
					width="100"
					:show-overflow-tooltip="true"
					prop="vehicleNo"
					label="车牌号"
				></el-table-column>
				<el-table-column
					align="center"
					width="100"
					:show-overflow-tooltip="true"
					prop="modelStr"
					label="车型"
				></el-table-column>
				<el-table-column
					align="center"
					width="100"
					:show-overflow-tooltip="true"
					prop="carType"
					label="车种"
				></el-table-column>
				<el-table-column
					align="center"
					width="100"
					:show-overflow-tooltip="true"
					prop="cpuNo"
					label="货通卡号"
				></el-table-column>
				<el-table-column
					align="center"
					width="100"
					:show-overflow-tooltip="true"
					prop="billNo"
					label="请求流水号"
				></el-table-column>
				<el-table-column
					align="center"
					width="100"
					:show-overflow-tooltip="true"
					prop="deductExpenses"
					label="通行费金额"
				></el-table-column>
				<!-- <el-table-column
					align="center"
					width="100"
					:show-overflow-tooltip="true"
					label="账户分类"
				>
					<template slot="scope">
						{{scope.row.}}
					</template>
				</el-table-column> -->
				<el-table-column
					align="center"
					width="100"
					:show-overflow-tooltip="true"
					prop="exitLaneNum"
					label="出口车道号"
				></el-table-column>
				<el-table-column
					align="center"
					width="100"
					:show-overflow-tooltip="true"
					prop="operationTime"
					label="操作时间"
				></el-table-column>
				<el-table-column
					align="center"
					width="130"
					:show-overflow-tooltip="true"
					prop="electronicTagNo"
					label="电子标签编码"
				></el-table-column>
				<el-table-column
					prop="finalClearingTime"
					label="最终决定清分日期"
					width="180"
					align="center"
					:show-overflow-tooltip="true"
				></el-table-column>
				<el-table-column
					prop="transactionSituation"
					label="交易信息情况"
					width="180"
					align="center"
					:show-overflow-tooltip="true"
				></el-table-column>
				<el-table-column
					prop="transactionType"
					label="交易场景类型"
					width="180"
					align="center"
					:show-overflow-tooltip="true"
				></el-table-column>
				<el-table-column
					prop="entranceName"
					label="入口收费站名称"
					width="180"
					align="center"
					:show-overflow-tooltip="true"
				></el-table-column>
				<el-table-column
					prop="exitName"
					label="出口收费站名称"
					width="180"
					align="center"
					:show-overflow-tooltip="true"
				></el-table-column>
				<el-table-column
					prop="channelDescription"
					label="发行方查询渠道描述"
					width="180"
					align="center"
					:show-overflow-tooltip="true"
				></el-table-column>
				<el-table-column
					prop="isRepeat"
					label="备注"
					width="180"
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
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Form as ElForm } from 'element-ui'
import { exportRafficData } from '@/api/common'
import { getRafficData, getexportRafficData } from '@/api/etc'
import qs from 'qs'

@Component({
	name: 'RafficData'
})
export default class extends Vue {
	private form = {
		currentPage: 1,
		pageSize: 10,
		billDayEnd: '',
		billDayStart: '',
		cpuNo: '',
		createTimeEnd: '',
		createTimeStart: '',
		name: '',
		vehicleNo: '',
		transactionSituation: '',
		transactionType: ''
	}
	private transactionSituationList = [
		{ value: '', label: '全部' },
		{ value: '1', label: '入口、出口通行信息完整' },
		{ value: '2', label: '有入口通行信息，无出口通行信息' },
		{ value: '3', label: '有出口通行信息，无入口通行信息' },
		{ value: '4', label: '只有门架交易信息，无出、入口通行信息' },
		{ value: '5', label: '停车场、服务器、加油站等拓展交易信息完整' }
	]
	private transactionTypeList = [
		{ value: '', label: '全部' },
		{ value: '1', label: '高速通行交易' },
		{ value: '2', label: '拓展消费交易' }
	]
	private total: number = 0
	private operaTime = []
	private tableData = []
	private listLoading = true

	mounted() {
		this.getList()
	}

	// 列表数据请求
	private async getList() {
		let _self = this
		this.listLoading = true
		_self.form.createTimeStart =
			_self.operaTime.length > 1 ? _self.operaTime[0] : ''
		_self.form.createTimeEnd =
			_self.operaTime.length > 1 ? _self.operaTime[1] : ''
		const { data } = await getRafficData(this.form)
		this.tableData = data.rows
		this.total = data.total
		// Just to simulate the time of the request
		setTimeout(() => {
			this.listLoading = false
		}, 0.5 * 1000)
	}

	// 搜索列表
	private filterList() {
		this.form.currentPage = 1
		const _self = this
		_self.listLoading = true

		this.getList()
	}

	// 表格index改变时
	private handleCurrentChange(val: any) {
		this.form.currentPage = val
		this.getList()
	}
	private selsChange(val: any) {
		this.form.pageSize = val
		this.getList()
	}

	// 报表导出
	private async exportDataList() {
		let { data } = await getexportRafficData(this.form)
		let exportExcelParams = {
			delete: true,
			fileName: data.msg
		}

		location.href = `${exportRafficData}?${qs.stringify(exportExcelParams)}`
	}

	// 重置搜索信息
	private clearFilterList() {
		;(this.$refs.filterform as ElForm).resetFields()
		this.operaTime = []
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
</style>
