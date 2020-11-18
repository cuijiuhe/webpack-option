<template>
	<div>
		<div class="sum-line">
			<el-row :gutter="14">
				<el-col :span="8">
					<chart-card title="推广数" totalColor="#FF603A" :total="analyzeNumInfo.allOrderNum">
						<template slot="footer">
							今日推广数 +
							<span>{{ analyzeNumInfo.intradayPromoNum }}</span>
						</template>
						<template slot="body" style="width:100%;height:100px">
							<v-chart :options="intradayActivatedOptions" style="width:100%;height:100px" ref="line"></v-chart>
						</template>
					</chart-card>
				</el-col>
				<el-col :span="8">
					<chart-card title="激活数" totalColor="#4A9BFD" :total="analyzeNumInfo.activatedOrderNum">
						<template slot="footer">
							今日激活数 +
							<span>{{ analyzeNumInfo.intradayActivatedOrderNum }}</span>
						</template>
						<template slot="body" style="width:100%;height:100px">
							<v-chart :options="intradayPromoOption" style="width:100%;height:100px" ref="line"></v-chart>
						</template>
					</chart-card>
				</el-col>
				<el-col :span="8">
					<chart-card title="产品转化率" totalColor="#25D096" :total="analyzeNumInfo.cvr">
						<template slot="footer">
							<span></span>
						</template>
						<template slot="body">
							<el-progress
								:percentage="analyzeNumInfo.cvr"
								color="#25D096"
								:show-text="false"
								:text-inside="true"
							></el-progress>
						</template>
					</chart-card>
				</el-col>
			</el-row>
		</div>

		<div class="sum-line">
			<el-row :gutter="14">
				<el-col :span="16">
					<el-card class="box-card">
						<div slot="header" class="clearfix">
							<span class="card-title">收入情况</span>
							<div style="float: right; padding: 3px 0">
								<el-button-group style="margin-right:10px">
									<el-button
										@click="chooseTime('all')"
										size="mini"
										:type="currentTimeType == 'all'? 'primary' :''"
									>全部</el-button>
									<el-button
										@click="chooseTime('month')"
										size="mini"
										:type="currentTimeType == 'month'? 'primary' :''"
									>一个月</el-button>
								</el-button-group>
								<!-- <el-date-picker
									style="margin-right:20px"
									size="mini"
									class="margin-left-50"
									type="daterange"
									range-separator="至"
									start-placeholder="开始日期"
									end-placeholder="结束日期"
									value-format="yyyy-MM-dd"
									v-model="pickerData"
								></el-date-picker> -->
								<el-button
									@click="exportIncomeData()"
									size="mini"
									style="border:none"
									icon="el-icon-receiving"
								>导出</el-button>
							</div>
						</div>
						<div v-loading="loading">
							<el-row>
								<el-col :span="12">
									<v-chart :options="incomeOptions" ref="pie" style="width:500px;height:400px"></v-chart>
								</el-col>
								<el-col :span="12">
									<div style="margin:100px 0 0 120px">
										<div
											v-for="item in pieLegendData"
											:key="item.name"
											style="height:30px"
											class="space-start"
										>
											<div class="legend-crl" :style="'background-color:'+item.color"></div>
											<div class="legend-name">{{item.name}}</div>
											<div class="legend-value">{{item.value}}</div>
										</div>
									</div>
								</el-col>
							</el-row>
						</div>
					</el-card>
				</el-col>
				<el-col :span="8">
					<el-card class="box-card">
						<div slot="header" class="clearfix">
							<span class="card-title">提现情况</span>
							<div style="float: right; padding: 3px 0">
								<el-button
									@click="exportwithdrawData()"
									size="mini"
									style="border:none"
									icon="el-icon-receiving"
								>导出</el-button>
							</div>
						</div>
						<div class="text-center" style="height:400px">
							<div>
								<div class="crl-out-div text-center">
									<div class="circle-shadow text-center">
										<div class>
											<div class="crl-value text-center">{{withdrawInfo.ectWithdrawInfo.withdrawMoney}}</div>
											<div class="crl-label text-center">提现总额(元)</div>
										</div>
									</div>
								</div>
								<div class="text-center crl-count-label">
									提现人数
									<span class="crl-count-value">{{withdrawInfo.ectWithdrawInfo.withdrawNum}}</span>
								</div>
							</div>
						</div>
					</el-card>
				</el-col>
			</el-row>
		</div>

		<div class="sum-line">
			<el-row :gutter="14">
				<el-col :span="16">
					<el-card class="box-card">
						<div slot="header" class="clearfix">
							<span class="card-title">门店推广地图</span>
						</div>
						<div>
							<baidu-map class="bm-view" :zoom="zoom" :center="center">
								<bm-marker
									v-for="(item,index) in shopListPosition"
									:key="index"
									:position="{lng: item.lng, lat: item.lat}"
									:dragging="true"
								></bm-marker>
							</baidu-map>
						</div>
					</el-card>
				</el-col>
				<el-col :span="8">
					<el-card class="box-card">
						<div slot="header" class="clearfix">
							<span class="card-title">门店推广排名</span>
						</div>
						<div class="bm-view">
							<div v-for="(item,index) in shopList" :key="index">
								<div class="space-between" style="padding: 10px">
									<div class="space-start">
										<div class="shop-index text-center">{{index+1}}</div>
										<div class="shop-name">{{item.spreaderEnterprise}}</div>
									</div>
									<div class="shop-num">{{item.num}}</div>
								</div>
							</div>
						</div>
					</el-card>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script >
import { Component, Vue, Watch } from 'vue-property-decorator'
import { UserModule } from '@/store/modules/user'
import { ChartCard } from '@/components/index'
import VeRing from 'v-charts/lib/ring.common'
import VeHistogram from 'v-charts/lib/histogram.common'
import 'echarts/lib/chart/line'
let echarts = require('echarts')
import { getexportRafficData } from '@/api/order'

import {
	getAnalyzeNumInfo,
	getIncomeInfo,
	getWithdrawInfo,
	findShopGeneralize,
	getIncomeInfoExport,
	getWithdrawInfoExport,
} from '@/api/etc'
import { exportRafficData } from '@/api/common'
import VChart from 'vue-echarts/components/ECharts'
import qs from 'qs'
@Component({
	components: {
		ChartCard,
		VeRing,
		VChart,
	},
})
export default class DataAnalysis extends Vue {
	mounted() {
		this.initData()
	}

	// 初始化
	initData() {
		this.params = this.getTimeForIncome(this.currentTimeType)
		this.getAnalyzeNumInfo()
		this.getWithdrawInfo()
		this.getIncomeInfo()
		this.getShopGeneralize()
	}

	analyzeNumInfo = false
	intradayPromoOption = {}
	intradayActivatedOptions = {}
	loading = false
	//折线图
	async getAnalyzeNumInfo() {
		const { data } = await getAnalyzeNumInfo()
		this.analyzeNumInfo = data.data || {}
		if (this.analyzeNumInfo) {
			if (this.analyzeNumInfo.activateList) {
				let temp = []
				this.analyzeNumInfo.activateList.map((item) => {
					let t = []
					t.push(item.time)
					t.push(item.num)
					temp.push(t)
				})
				let serise = [
					{
						type: 'line',
						data: temp,
						itemStyle: { color: 'rgba(255,96,58,1)' },
						areaStyle: {
							color: new echarts.graphic.LinearGradient(
								0,
								0,
								0,
								1,
								[
									{
										offset: 0,
										color: 'rgba(255,96,58,1)',
									},
									{
										offset: 1,
										color: '#ffffff',
									},
								]
							),
						},
					},
				]
				this.intradayActivatedOptions = this.initOptions(
					this.xAxis,
					this.yAxis,
					serise
				)
			}
			if (this.analyzeNumInfo.generalizeList) {
				let temp = []
				this.analyzeNumInfo.generalizeList.map((item) => {
					let t = []
					t.push(item.time)
					t.push(item.num)
					temp.push(t)
				})
				let serise = [
					{
						type: 'line',
						data: temp,
						itemStyle: { color: 'rgba(74,155,253,1)' },
						areaStyle: {
							color: new echarts.graphic.LinearGradient(
								0,
								0,
								0,
								1,
								[
									{
										offset: 0,
										color: 'rgba(74,155,253,1)',
									},
									{
										offset: 1,
										color: '#ffffff',
									},
								]
							),
						},
					},
				]
				this.intradayPromoOption = this.initOptions(
					this.xAxis,
					this.yAxis,
					serise
				)
			}
		}
	}
	xAxis = { show: false, type: 'time', splitLine: { show: false } }
	yAxis = { show: false, type: 'value', splitLine: { show: false } }
	// 处理图表坐标轴
	initOptions(xAxis, yAxis, series, areaStyle) {
		return {
			xAxis: xAxis,
			yAxis: yAxis,
			series: series,
		}
	}
	// 提现情况
	withdrawInfo = { ectWithdrawInfo: {} }
	async getWithdrawInfo() {
		const { data } = await getWithdrawInfo()
		console.log(data)
		this.withdrawInfo = data.data
	}

	//收入情况报表导出
	async exportIncomeData() {
		this.loading = true
		let { data } = await getIncomeInfoExport(this.params)
		this.loading = false
		let incomeInfoExport = {
			delete: true,
			fileName: data.msg,
		}

		location.href = `${exportRafficData}?${qs.stringify(incomeInfoExport)}`
	}

	// 提现情况报表导出
	async exportwithdrawData() {
		let { data } = await getWithdrawInfoExport(this.params)
		let withdrawInfoExport = {
			delete: true,
			fileName: data.msg,
		}

		location.href = `${exportRafficData}?${qs.stringify(
			withdrawInfoExport
		)}`
	}

	// 饼图时间参数
	getTimeForIncome(type) {
		if (type != 'all') {
			let start = ''
			let end = ''
			let current = new Date()
			let year = current.getFullYear()
			let month = current.getMonth() + 1
			let day = current.getDate()
			let endmonth = current.getMonth() + 1
			let endday = current.getDate()
			endmonth = endmonth < 10 ? `0${endmonth}` : endmonth
			endday = endday < 10 ? `0${endday}` : endday
			end = `${year}-${endmonth}-${endday} 23:59:59`
			if (type == 'week') {
				if (day < 7) {
					if (month == 3) {
						month = month - 1
						if (year % 400 == 0 || year % 4 == 0) {
							day = 29 + day - 6
						} else {
							day = 28 + day - 6
						}
					} else if (month == 1) {
						month = 12
						year = year - 1
						day = 31 + day - 6
					} else if (
						month == 5 ||
						month == 7 ||
						month == 10 ||
						month == 12
					) {
						month = month - 1
						day = 30 + day - 6
					} else {
						month = month - 1
					}
				} else {
					day = day - 6
				}
			} else if (type == 'month') {
				if (month == '1') {
					year = year - 1
					month = 12
				} else if (month == 3 && day > 28) {
					month = 2
					if (year % 400 == 0 || year % 4 == 0) {
						day = 29
					} else {
						day = 28
					}
				} else if (
					(month == 5 || month == 7 || month == 10 || month == 12) &&
					day == 31
				) {
					day = 30
					month = month - 1
				} else {
					month = month - 1
				}
			} else if (type == 'year') {
				if (month == 2 && day == 29) {
					if ((year - 1) % 400 == 0 || (year - 1) % 4 == 0) {
						day = 29
					}
				}
				year = year - 1
			}
			month = month < 10 ? `0${month}` : month
			day = day < 10 ? `0${day}` : day
			start = `${year}-${month}-${day} 00:00:00`
			return { startTime: start, endTime: end }
		} else {
			return { startTime: '', endTime: '' }
		}
	}

	incomeInfo = {}
	incomeLadding = false
	incomeOptions = {}
	pieLegendData = []
	params = { startTime: '', endTime: '' }
	// 饼图数据
	async getIncomeInfo() {
		this.loading = true
		const { data } = await getIncomeInfo(this.params)
		this.loading = false
		if (data) {
			this.incomeLadding = false
		}
		this.incomeInfo = data.data
		this.pieLegendData = [
			{
				name: '月产品分润',
				value: `¥${this.incomeInfo.ectDataAnalysis.monthProduct}`,
				color: '#4089FF',
			},
			{
				name: '周产品分润',
				value: `¥${this.incomeInfo.ectDataAnalysis.weekProduct}`,
				color: '#FECD5D',
			},
			{
				name: '日产品分润',
				value: `¥${this.incomeInfo.ectDataAnalysis.dayProduct}`,
				color: '#64CE96',
			},
			{
				name: '通行费分润',
				value: `¥${this.incomeInfo.ectDataAnalysis.tollProduct}`,
				color: '#E26D7D',
			},
			{
				name: '台阶分润',
				value: `¥${this.incomeInfo.ectDataAnalysis.stepProduct}`,
				color: '#8F66DD',
			},
		]
		let seriesData = [
			{
				value: this.incomeInfo.ectDataAnalysis.monthProductPercent,
				name: '月产品分润',
				itemStyle: { color: '#4089FF' },
			},
			{
				value: this.incomeInfo.ectDataAnalysis.weekProductPercent,
				name: '周产品分润',
				itemStyle: { color: '#FECD5D' },
			},
			{
				value: this.incomeInfo.ectDataAnalysis.dayProductPercent,
				name: '日产品分润',
				itemStyle: { color: '#64CE96' },
			},
			{
				value: this.incomeInfo.ectDataAnalysis.tollProductPercent,
				name: '通行费分润',
				itemStyle: { color: '#E26D7D' },
			},
			{
				value: this.incomeInfo.ectDataAnalysis.stepProductPercent,
				name: '台阶分润',
				itemStyle: { color: '#8F66DD' },
			},
		]
		this.incomeOptions = {
			series: [
				{
					type: 'pie',
					radius: [50, 100],
					center: ['45%', '50%'],
					data: seriesData,
				},
			],
		}
		let that = this
	}
	currentTimeType = 'all'
	async chooseTime(type) {
		this.currentTimeType = type
		this.params = await this.getTimeForIncome(this.currentTimeType)
		console.log('income params = ', this.params)
		await this.getIncomeInfo()
	}

	// 门店信息
	shopList = []
	shopListPosition = []
	zoom = 7
	center = { lng: 116.409443, lat: 39.87397 }
	async getShopGeneralize() {
		const { data } = await findShopGeneralize()
		this.shopList = data.data || []
	}

	@Watch('shopList')
	getShopList(newVal, oldVal) {
		if (newVal && newVal.length > 0) {
			let lng = parseFloat(this.shopList[0].lon) || 116.409443
			let lat = parseFloat(this.shopList[0].lat) || 39.87397
			this.center = { lng: lng, lat: lat }
			newVal.map((item) => {
				let temp = { lat: item.lat, lng: item.lon }
				this.shopListPosition.push(temp)
			})
		}
	}
	pickerData = []
	@Watch('pickerData')
	getPickerData(newVal, oldVal) {
		console.log('oldVal=', oldVal)
		this.currentTimeType = 'init'
		this.params = { startTime: newVal[0], endTime: newVal[1] }
		this.getIncomeInfo()
	}
}
</script>

<style lang="scss" scoped>
.sum-line {
	margin: 20px;
}
.card-title {
	line-height: 28px;
	text-align: center;
	font-weight: bold;
	color: rgba(48, 49, 51, 1);
}
.legend-crl {
	width: 10px;
	height: 10px;
	border-radius: 50%;
}
.legend-name {
	width: 100px;
	font-size: 15px;
	font-family: PingFang SC;
	font-weight: 500;
	color: rgba(74, 90, 127, 1);
	margin-left: 10px;
}
.legend-value {
	font-size: 15px;
	font-family: PingFang SC;
	font-weight: 500;
	color: rgba(48, 49, 51, 1);
	line-height: 34px;
	margin-left: 25px;
}
.circle-shadow {
	background-color: #ffffff;
	width: 200px;
	height: 200px;
	border-radius: 50%;
	position: relative;
	border: 20px solid rgba(58, 161, 255, 1);
	box-shadow: 0 0 0 15px rgba(58, 161, 255, 0.5);
}
.crl-out-div {
	background-color: rgba(58, 161, 255, 0.3);
	width: 290px;
	height: 290px;
	border-radius: 50%;
	position: relative;
	box-shadow: 0 0 0 15px rgba(58, 161, 255, 0.1);

	animation: breath 1s;
	-moz-animation: breath 1s; /* Firefox */
	-webkit-animation: breath 1s; /* Safari and Chrome */
	-o-animation: breath 1s;
}
@keyframes breath {
	0% {
		box-shadow: 0 0 0 5px rgba(58, 161, 255, 0.1);
	}
	50% {
		box-shadow: 0 0 0 10px rgba(58, 161, 255, 0.1);
	}
	100% {
		box-shadow: 0 0 0 15px rgba(58, 161, 255, 0.1);
	}
}
.crl-value {
	font-size: 25px;
	font-family: PingFang SC;
	font-weight: bold;
	color: rgba(51, 51, 51, 1);
}
.crl-label {
	font-size: 12px;
	font-family: PingFang SC;
	font-weight: 400;
	color: rgba(124, 124, 124, 1);
	margin-top: 10px;
}
.crl-count-label {
	margin-top: 50px;
	font-size: 15px;
	font-family: PingFang SC;
	font-weight: 400;
	color: rgba(48, 49, 51, 1);
	line-height: 26px;
}
.crl-count-value {
	font-size: 18px;
	font-family: PingFang SC;
	font-weight: 500;
	color: rgba(48, 49, 51, 1);
	line-height: 26px;
	margin-left: 10px;
}
.shop-index {
	width: 15px;
	height: 15px;
	font-size: 12px;
	background-color: #cccccc;
	color: #ffffff;
}
.shop-name {
	font-size: 12px;
	margin-left: 10px;
	font-family: PingFang SC;
	font-weight: 400;
	color: rgba(102, 102, 102, 1);
	line-height: 23px;
}
.shop-num {
	font-size: 12px;
	font-family: PingFang SC;
	font-weight: 400;
	color: rgba(153, 153, 153, 1);
	line-height: 23px;
}

.space-start {
	display: -webkit-box;
	display: -moz-box;
	display: -ms-flexbox;
	display: -webkit-flex;
	display: flex;
	align-items: center;
	justify-content: flex-start;
}
.space-around {
	display: -webkit-box;
	display: -moz-box;
	display: -ms-flexbox;
	display: -webkit-flex;
	display: flex;
	align-items: center;
	justify-content: space-around;
}
.space-between {
	display: -webkit-box;
	display: -moz-box;
	display: -ms-flexbox;
	display: -webkit-flex;
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.text-center {
	display: flex;
	justify-content: center;
	align-items: Center;
}
.bm-view {
	width: 100%;
	height: 500px;
}
.echarts {
	width: 100%;
	height: 100%;
}
</style>
