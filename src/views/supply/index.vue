<template>
  <div class="root">
    <el-row>
      <el-col :span="8">
        <el-button type="primary" icon="el-icon-plus" @click="addDialogVisible = true">新增
        </el-button>
        <el-button type="danger" icon="el-icon-delete" @click="deleteSupply">删除</el-button>
        <!--
          添加物资
        -->
        <el-dialog title="物资信息" :visible.sync="addDialogVisible" width="600px">
          <el-form :model="this.form" label-width="120px" style="width: 60%; margin-left: 15%; margin-right: 30%">
            <el-form-item label="物资名称">
              <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="物资数量">
              <el-input v-model="form.quantity" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="物资类型">
              <el-select v-model="form.type" placeholder="请选择">
                <div v-for="(item, index) in this.supplyTypes">
                  <el-option :label="item" :value="item"></el-option>
                </div>
              </el-select>
            </el-form-item>
            <el-form-item label="物资清点人">
              <el-input v-model="form.manager" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="清点人电话">
              <el-input v-model="form.phone" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="物资编号">
              <el-input v-model="form.number" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="物资清点时间">
              <div class="block">
                <span class="demonstration"></span>
                <el-date-picker
                    v-model="form.time"
                    type="datetime"
                    placeholder="选择日期时间"
                    align="right">
                </el-date-picker>
              </div>
            </el-form-item>
            <el-form-item>
              <el-button @click="addSupplyCancel">取 消</el-button>
              <el-button type="primary" @click="addSupply()">添 加</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
        <!--
          编辑物资信息
        -->
        <el-dialog title="物资信息" :visible.sync="editDialogVisible" width="600px">
          <el-form ref="from" :model="form" label-width="120px" style="width: 60%; margin-left: 15%; margin-right: 30%">
            <el-form-item label="物资名称">
              <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="物资数量">
              <el-input v-model="form.quantity"
                        autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="物资种类">
              <el-select v-model="form.type" placeholder="请选择">
                <div v-for="(item, index) in this.supplyTypes">
                  <el-option :label="item" :value="item"></el-option>
                </div>
              </el-select>
            </el-form-item>
            <el-form-item label="物资清点人">
              <el-input v-model="form.manager"
                        autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="清点人电话">
              <el-input v-model="form.phone"
                        autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="物资编号">
              <el-input v-model="form.number"
                        autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="物资清点时间">
              <div class="block">
                <span class="demonstration"></span>
                <el-date-picker
                    v-model="form.time"
                    type="datetime"
                    placeholder="选择日期时间"
                    align="right">
                </el-date-picker>
              </div>
            </el-form-item>
            <el-form-item>
              <el-button @click="editSupplyCancel">取 消</el-button>
              <el-button type="primary" @click="editSupply">修 改</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
      </el-col>
      <el-col :span="16">
        <div class="search">
          <el-input placeholder="请输入物资信息" @input="search" v-model="keyword" clearable class="input-with-select">
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
        @row-click="preEditSupply"
    >

      <el-table-column type="selection" prop="checked" label="" show-overflow-tooltip>

      </el-table-column>

      <el-table-column prop="id" label="ID" show-overflow-tooltip></el-table-column>
      <el-table-column prop="name" label="物资名称" show-overflow-tooltip></el-table-column>
      <el-table-column prop="quantity" label="物资数量" show-overflow-tooltip></el-table-column>
      <el-table-column prop="type" label="物资类型" show-overflow-tooltip></el-table-column>
      <el-table-column prop="manager" label="物资清点人" show-overflow-tooltip></el-table-column>
      <el-table-column prop="phone" label="清点人电话" show-overflow-tooltip></el-table-column>
      <el-table-column prop="number" label="物资编号" show-overflow-tooltip></el-table-column>
      <el-table-column prop="time" label="物资清点时间" show-overflow-tooltip></el-table-column>

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
import { supplies, supplyType, querySupplyById, querySuppliesByBlur } from '../../data/supply/supply'
import { stringToDate, dateToString } from '../../utils/time'

export default {
  name: 'Supply',
  data() {
    return {
      supplyTypes: [],
      selection: [],
      addDialogVisible: false,
      editDialogVisible: false,
      form: {
        id: '',
        name: '',
        quantity: '',
        type: '',
        manager: '',
        phone: '',
        number: '',
        time: ''
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
    this.initSupplyTypes()
  },
  methods: {
    deleteSupply() {
      if (this.selection.length === 0) {
        this.$message.error('您尚未选择待删除的物资！')
        return
      }
      let ins = []
      for (let s of this.selection) {
        for (let i = 0; i < supplies.length; i++) {
          if (supplies[i].id === s.id) {
            supplies.splice(i, 1)
          }
        }
      }
      this.$message.success('删除成功！')
      this.selection = []
    },
    handleSelectionChange(val) {
      this.selection = val
    },
    preEditSupply(row, column, event) {
      this.editDialogVisible = true
      this.form.id = row.id
      this.form.name = row.name
      this.form.quantity = row.quantity
      this.form.type = row.type
      this.form.manager = row.manager
      this.form.phone = row.phone
      this.form.number = row.number
      this.form.time = row.time
    },
    getTemplateList() {
      this.tableData = supplies
    },
    editSupply() {
      let id = querySupplyById(this.form.id)
      supplies[id].quantity = this.form.quantity
      supplies[id].type= this.form.type
      supplies[id].manager = this.form.manager
      supplies[id].phone = this.form.phone
      supplies[id].number = this.form.number
      supplies[id].time = this.form.time
      this.$message.success('修改成功！')
      this.editDialogVisible = false
      this.clearForm()
    },
    editSupplyCancel() {
      this.editDialogVisible = false
      this.clearForm()
    },
    addSupplyCancel() {
      this.addDialogVisible = false
      this.clearForm()
    },
    clearForm() {
      this.form.id = ''
      this.form.name = ''
      this.form.quantity = ''
      this.form.type = ''
      this.form.manager = ''
      this.form.phone = ''
      this.form.number = ''
      this.form.time = ''
    },
    initSupplyTypes() {
      this.supplyTypes = supplyType
    },
    addSupply() {
      let max = 0
      for (let s of supplies) {
        max = Math.max(max, s.id)
      }
      let supply = {
        id: max + 1,
        name: this.form.name,
        quantity: this.form.quantity,
        type: this.form.type,
        manager: this.form.manager,
        phone: this.form.phone,
        number: this.form.number,
        time: dateToString(this.form.time)
      }
      supplies.push(supply)
      this.$message.success('添加成功！')
      this.addDialogVisible = false
    },
    search() {
      if (this.keyword === null || this.keyword.length === 0) {
        this.tableData = supplies
      } else {
        this.tableData = querySuppliesByBlur(this.keyword)
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
