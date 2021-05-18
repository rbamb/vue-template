<template>
  <div class="root">
    <el-row>
      <el-col :span="8">
        <el-button type="primary" icon="el-icon-plus" @click="addDialogVisible = true">新增
        </el-button>
        <el-button type="danger" icon="el-icon-delete" @click="deleteRoute">删除</el-button>
        <!--
          添加城市
        -->
        <el-dialog title="添加城市" :visible.sync="addDialogVisible" width="600px">
          <el-form :model="this.form" label-width="120px" style="width: 60%; margin-left: 15%; margin-right: 30%">
            <el-form-item label="路线名称">
              <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="路线起点">
              <el-input v-model="form.start" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="路线终点">
              <el-input v-model="form.end" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="路线长度">
              <el-input v-model="form.length" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="form.memo" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button @click="addRouteCancel">取 消</el-button>
              <el-button type="primary" @click="addRoute()">添 加</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
        <!--
          编辑城市
        -->
        <el-dialog title="编辑路线" :visible.sync="editDialogVisible" width="600px">
          <el-form ref="from" :model="form" label-width="120px" style="width: 60%; margin-left: 15%; margin-right: 30%">
            <el-form-item label="路线名称">
              <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="路线起点">
              <el-input v-model="form.start" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="路线终点">
              <el-input v-model="form.end" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="路线长度">
              <el-input v-model="form.length" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="form.memo" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button @click="editRouteCancel">取 消</el-button>
              <el-button type="primary" @click="editRoute">修 改</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
      </el-col>
      <el-col :span="16">
        <div class="search">
          <el-input placeholder="请输入路线信息" @input="search" v-model="keyword" clearable
                    class="input-with-select"
          >
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
        @row-click="preEditRoute"
    >
      <el-table-column type="selection" prop="checked" show-overflow-tooltip/>
      <el-table-column prop="id" label="ID" show-overflow-tooltip/>
      <el-table-column prop="name" label="路线名称" show-overflow-tooltip/>
      <el-table-column prop="start" label="路线起点" show-overflow-tooltip/>
      <el-table-column prop="end" label="路线终点" show-overflow-tooltip/>
      <el-table-column prop="length" label="路线长度" show-overflow-tooltip/>
      <el-table-column prop="memo" label="备注" show-overflow-tooltip/>
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
import { routes, queryRoutesByBlur, queryRouteById } from '../../../data/city/route/routes'

export default {
  name: 'Route',
  data() {
    return {
      selection: [],
      addDialogVisible: false,
      editDialogVisible: false,
      form: {
        id: '',
        name: '',
        start: '',
        end: '',
        length: '',
        memo: ''
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
    load(tree, treeNode, resolve) {
      setTimeout(() => {
        resolve(routes)
      }, 1000)
    },
    deleteRoute() {
      if (this.selection.length === 0) {
        this.$message.error('您尚未选择待删除的城市！')
        return
      }
      let ins = []
      for (let s of this.selection) {
        for (let i = 0; i < routes.length; i++) {
          if (routes[i].id === s.id) {
            routes.splice(i, 1)
          }
        }
      }
      this.$message.success('删除成功！')
      this.selection = []
    },
    handleSelectionChange(val) {
      this.selection = val
    },
    preEditRoute(row, column, event) {
      this.editDialogVisible = true
      this.form.id = row.id
      this.form.name = row.name
      this.form.start = row.start
      this.form.end = row.end
      this.form.length = row.length
      this.form.memo = row.memo
    },
    getTemplateList() {
      this.tableData = routes
    },
    editRoute() {
      let id = queryRouteById(this.form.id)
      routes[id].name = this.form.name
      routes[id].start = this.form.start
      routes[id].end = this.form.end
      routes[id].length = this.form.length
      routes[id].memo = this.form.memo
      this.$message.success('修改成功！')
      this.editDialogVisible = false
      this.clearForm()
    },
    editRouteCancel() {
      this.editDialogVisible = false
      this.clearForm()
    },
    addRouteCancel() {
      this.addDialogVisible = false
      this.clearForm()
    },
    clearForm() {
      this.form.id = ''
      this.form.name = ''
      this.form.start = ''
      this.form.end = ''
      this.form.length = ''
      this.form.memo = ''
    },
    addRoute() {
      let max = 0
      for (let c of routes) {
        max = Math.max(max, c.id)
      }
      let route = {
        id: max + 1,
        name: this.form.name,
        start: this.form.start,
        end: this.form.end,
        length: this.form.length,
        memo: this.form.memo
      }
      routes.push(route)
      this.$message.success('添加成功！')
      this.addDialogVisible = false
    },
    search() {
      if (this.keyword === null || this.keyword.length === 0) {
        this.tableData = routes
      } else {
        this.tableData = queryRoutesByBlur(this.keyword)
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
