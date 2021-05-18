<template>
  <div class="root">
    <el-row>
      <el-col :span="8">
        <el-button type="primary" icon="el-icon-plus" @click="addDialogVisible = true">新增</el-button>
        <el-button type="danger" icon="el-icon-delete" @click="deleteReport">删除</el-button>
        <el-button type="success" icon="el-icon-upload2" @click="submitReports">提交</el-button>
        <!--
          添加接报
        -->
        <el-dialog title="接报信息" :visible.sync="addDialogVisible" width="600px">
          <el-form :model="this.form" label-width="120px" style="width: 60%; margin-left: 15%; margin-right: 30%">
            <el-form-item label="接报名称">
              <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="接报编码">
              <el-input v-model="form.code" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="流程类型">
              <el-input v-model="form.type" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="事件报警人">
              <el-input v-model="form.reporter" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="报警人联系电话">
              <el-input v-model="form.phone" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="接报时间">
              <el-date-picker v-model="form.reportTime" type="datetime"></el-date-picker>
            </el-form-item>
            <el-form-item label="风险企业">
              <el-input v-model="form.company" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="最后更新者">
              <el-input v-model="form.lastModifier" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="接报状态">
              <el-select v-model="form.status" placeholder="请选择">
                <el-option label="待审批" value="待审批"></el-option>
                <el-option label="已结束" value="已结束"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button @click="addReportCancel">取 消</el-button>
              <el-button type="primary" @click="addReport()">添 加</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
        <!--
          编辑物资信息
        -->
        <el-dialog title="物资信息" :visible.sync="editDialogVisible" width="600px">
          <el-form ref="from" :model="form" label-width="120px" style="width: 60%; margin-left: 15%; margin-right: 30%">
            <el-form-item label="接报名称">
              <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="接报编码">
              <el-input v-model="form.code" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="流程类型">
              <el-input v-model="form.type" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="事件报警人">
              <el-input v-model="form.reporter" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="报警人联系电话">
              <el-input v-model="form.phone" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="风险企业">
              <el-input v-model="form.company" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="最后更新者">
              <el-input v-model="form.lastModifier" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="接报状态">
              <el-select v-model="form.status" placeholder="请选择">
                <el-option label="待审批" value="待审批"></el-option>
                <el-option label="已结束" value="已结束"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button @click="editReportCancel">取 消</el-button>
              <el-button type="primary" @click="editReport">修 改</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
      </el-col>
      <el-col :span="16">
        <div class="search">
          <el-input placeholder="请输入接报信息" @input="search" v-model="keyword" clearable class="input-with-select">
            <el-button @click="search" slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div>
      </el-col>
    </el-row>

    <el-table
        border
        :data="tableData"
        style="width: 100%"
        :default-sort="{ prop: 'createDate', order: 'descending' }"
        @selection-change="handleSelectionChange"
        @row-click="preEditReport"
    >

      <el-table-column type="selection" prop="checked" label="" show-overflow-tooltip>

      </el-table-column>

      <el-table-column width="50px" prop="id" label="ID" show-overflow-tooltip></el-table-column>
      <el-table-column width="100px" prop="name" label="名称" show-overflow-tooltip></el-table-column>
      <el-table-column width="100px" prop="code" label="接报编码" show-overflow-tooltip></el-table-column>
      <el-table-column width="80px" prop="type" label="流程类型" show-overflow-tooltip></el-table-column>
      <el-table-column width="80px" prop="reporter" label="报警人" show-overflow-tooltip></el-table-column>
      <el-table-column prop="phone" label="联系电话" show-overflow-tooltip></el-table-column>
      <el-table-column width="140px" prop="reportTime" label="接报时间" show-overflow-tooltip></el-table-column>
      <el-table-column prop="company" label="风险企业" show-overflow-tooltip></el-table-column>
      <el-table-column prop="lastModifier" label="最后更新者" show-overflow-tooltip></el-table-column>
      <el-table-column width="140px" prop="lastModifiedTime" label="最后更新时间" show-overflow-tooltip></el-table-column>
      <el-table-column width="80px" prop="status" label="接报状态" show-overflow-tooltip></el-table-column>

    </el-table>
    <el-pagination
        class="pagination"
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="pageSize"
        @current-change="pageChange"
        @prev-click="pageChange"
        @next-click="pageChange"
    >
    </el-pagination>

  </div>
</template>

<script>
import { stringToDate, dateToString } from '../../utils/time'
import { queryReportById, queryReportsByBlur, reports } from '@/data/report/reports'
import { submitted } from '@/data/report/submitted'

export default {
  name: 'Report',
  data() {
    return {
      selection: [],
      addDialogVisible: false,
      editDialogVisible: false,
      form: {
        id: '',
        name: '',
        code: '',
        type: '',
        reporter: '',
        phone: '',
        reportTime: '',
        company: '',
        lastModifier: '',
        status: ''
      },
      pageSize: 6,
      total: 6, // task总数
      srcList: [],
      tableData: [],
      keyword: '',
      headers: {
        token: localStorage.getItem('token')
      }
    }
  },
  created: function() {
    this.getTemplateList()
  },
  methods: {
    submitReports() {
      if (this.selection.length === 0) {
        this.$message.error('您尚未选择待提交的接报！')
        return
      }
      for (let s of this.selection) {
        submitted.push(s)
      }
      this.deleteReportSilently()
      this.$message.success('提交成功！')
    },
    deleteReportSilently() {
      if (this.selection.length === 0) {
        return
      }
      for (let s of this.selection) {
        for (let i = 0; i < reports.length; i++) {
          if (reports[i].id === s.id) {
            reports.splice(i, 1)
          }
        }
      }
      this.selection = []
    },
    deleteReport() {
      if (this.selection.length === 0) {
        this.$message.error('您尚未选择待删除的接报！')
        return
      }
      for (let s of this.selection) {
        for (let i = 0; i < reports.length; i++) {
          if (reports[i].id === s.id) {
            reports.splice(i, 1)
          }
        }
      }
      this.$message.success('删除成功！')
      this.selection = []
    },
    handleSelectionChange(val) {
      this.selection = val
    },
    preEditReport(row, column, event) {
      this.editDialogVisible = true
      this.form.id = row.id
      this.form.name = row.name
      this.form.code = row.code
      this.form.type = row.type
      this.form.reporter = row.reporter
      this.form.phone = row.phone
      this.form.company = row.company
      this.form.lastModifier = row.lastModifier
      this.form.status = row.status
    },
    getTemplateList() {
      this.tableData = reports
    },
    editReport() {
      let id = queryReportById(this.form.id)
      reports[id].name = this.form.name
      reports[id].code = this.form.code
      reports[id].type = this.form.type
      reports[id].reporter = this.form.reporter
      reports[id].phone = this.form.phone
      reports[id].company = this.form.company
      reports[id].lastModifier = this.form.lastModifier
      reports[id].lastModifiedTime = dateToString(new Date())
      reports[id].status = this.form.status
      this.$message.success('修改成功！')
      this.editDialogVisible = false
      this.clearForm()
    },
    editReportCancel() {
      this.editDialogVisible = false
      this.clearForm()
    },
    addReportCancel() {
      this.addDialogVisible = false
      this.clearForm()
    },
    clearForm() {
      this.form.id = ''
      this.form.name = ''
      this.form.code = ''
      this.form.type = ''
      this.form.reporter = ''
      this.form.phone = ''
      this.form.company = ''
      this.form.lastModifier = ''
      this.form.status = ''
    },
    addReport() {
      let max = 0
      for (let r of reports) {
        max = Math.max(max, r.id)
      }
      let report = {
        id: max + 1,
        name: this.form.name,
        code: this.form.code,
        type: this.form.type,
        reporter: this.form.reporter,
        phone: this.form.phone,
        reportTime: dateToString(this.form.reportTime),
        company: this.form.company,
        lastModifier: this.form.lastModifier,
        lastModifiedTime: dateToString(new Date()),
        status: this.form.status
      }
      reports.push(report)
      this.$message.success('添加成功！')
      this.addDialogVisible = false
    },
    search() {
      if (this.keyword === null || this.keyword.length === 0) {
        this.tableData = reports
      } else {
        this.tableData = queryReportsByBlur(this.keyword)
      }
    },
    goSearch() {
      let that = this
      if (that.keyword.length < 1) {
        that.getTemplateList()
        return 0
      }
      this.req({
        url: 'searchTemplate?keyword=' + that.keyword,
        data: {},
        method: 'GET'
      }).then(
          res => {
            console.log('res :', res)
            if (res.data.length < 1) {
              that.$message('查询无果~')
              return 0
            } else {
              that.$message('查询成功~')
            }
            for (let i = 0; i < res.data.length; i++) {
              res.data[i].createDate = that.getTime(res.data[i].createDate)
            }
            that.tableData = res.data
          },
          err => {
            console.log('err :', err)
          }
      )
    },
    deleteTemplate(id) {
      let that = this
      this.$confirm('此操作将删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
          .then(() => {
            that
                .req({
                  url: 'deleteTemplate?id=' + id,
                  data: {},
                  method: 'GET'
                })
                .then(
                    res => {
                      console.log('res :', res)
                      that.getTemplateList()
                      that.$message('删除成功~')
                    },
                    err => {
                      console.log('err :', err)
                    }
                )
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
    },
    uploadSuccess(response, file, fileList) {
      let that = this
      console.log(':', response)
      this.$message('上传成功~')
      this.$prompt('请输入模板名称', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
          .then(({ value }) => {
            that
                .req({
                  url: 'addTemplate',
                  data: {
                    name: value,
                    imgUrl: response.data,
                    createDate: new Date().getTime()
                  },
                  method: 'POST'
                })
                .then(
                    res => {
                      console.log('res :', res)
                      that.getTemplateList()
                    },
                    err => {
                      console.log('err :', err)
                    }
                )
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '取消上传'
            })
          })
    },
    getTime(timestamp) {
      let that = this
      timestamp = parseInt(timestamp)
      const date = new Date(timestamp) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      let Y = date.getFullYear() + '-'
      let M = (
          (date.getMonth() + 1 < 10) ?
              '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
      let D = that.change(date.getDate()) + ' '
      let h = that.change(date.getHours()) + ':'
      let m = that.change(date.getMinutes()) + ':'
      let s = that.change(date.getSeconds())
      return Y + M + D + h + m + s
    },
    change(t) {
      if (t < 10) {
        return '0' + t
      } else {
        return t
      }
    },
    // 下载文件
    downloadFile(name, href) {
      console.log('name :', name)
      console.log('href :', href)
      let a = document.createElement('a'), //创建a标签
          e = document.createEvent('MouseEvents') //创建鼠标事件对象
      e.initEvent('click', false, false) //初始化事件对象
      a.href = href //设置下载地址
      a.download = name //设置下载文件名
      a.dispatchEvent(e) //给指定的元素，执行事件click事件
    },
    pageChange(page) {
      console.log('page :', page)
      this.getTemplateList(page)
    }
  }
}
</script>

<style>
.upload {
  width: 200px;
  margin: 20px;
  float: right;
}

.my-pic {
  width: 48px;
  height: 27px;
}

.search {
  width: 50%;
  margin-left: 50%;
  margin-bottom: 10px;
}

.pagination {
  margin-top: 20px;
  margin-right: 50px;
  float: right;
}

.hidden-row {
  display: none;
}
</style>
