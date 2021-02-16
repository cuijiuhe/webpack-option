<template>
  <!-- 功能页面  -->
  <div class="mod-page">
    <!-- 表单  -->
    <el-card class="mod-card mod-form" shadow="never">
      <div class="mod-card-header" slot="header">
        <h2 class="mod-card-title">表单标题</h2>
      </div>
      <div class="mod-card-body">
        <el-form
          ref="ruleForm"
          :model="ruleForm"
          :rules="rules"
        >
          <el-form-item label="活动名称" prop="name">
            <el-input v-model="ruleForm.name" placeholder="请输入活动名称"></el-input>
          </el-form-item>
          <el-form-item label="活动区域" prop="region">
            <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
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
              v-model="ruleForm.date1"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="创建时间" required>
            <el-date-picker
              type="date"
              placeholder="选择创建时间"
              v-model="ruleForm.date2"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="即时配送" prop="delivery">
            <el-switch v-model="ruleForm.delivery"></el-switch>
          </el-form-item>
          <el-form-item label="活动性质" prop="type">
            <el-checkbox-group v-model="ruleForm.type">
              <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
              <el-checkbox label="地推活动" name="type" checked></el-checkbox>
              <el-checkbox label="线下主题活动" name="type"></el-checkbox>
              <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="超过六个字的选项名称" prop="resource">
            <el-radio-group v-model="ruleForm.resource">
              <el-radio label="线上品牌商赞助"></el-radio>
              <el-radio label="线下场地免费"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="活动形式" prop="desc">
            <el-input type="textarea" v-model="ruleForm.desc"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="mod-card-footer">
        <el-button @click="handleResetForm()">重置</el-button>
        <el-button type="primary" :loading="loading" @click.native.prevent="handleSubmitForm()">提交</el-button>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Form as ElForm, Input } from "element-ui";

@Component({
  name: 'Form'
})
export default class extends Vue {
  private ruleForm = {
    name: '',
    region: '',
    date1: '',
    date2: '',
    delivery: false,
    type: [],
    resource: '',
    desc: ''
  }

  private rules = {
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

  private loading = false;

  // 提交表单项
  private handleSubmitForm() {
    (this.$refs.ruleForm as ElForm).validate(async (valid: boolean) => {
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

  // 重置表单项
  private handleResetForm() {
    (this.$refs.ruleForm as ElForm).resetFields();
    this.$message('reset!')
  }
}
</script>

<style lang="scss" scoped>
</style>
