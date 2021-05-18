<template>
  <div class="root">
    <div class="button-group" style="margin-bottom: 20px">
      <el-button type="primary" icon="el-icon-plus" @click="addDialogVisible = true">新增</el-button>
      <el-button type="danger" icon="el-icon-delete">删除</el-button>
    </div>
    <el-dialog title="新事件" :visible.sync="addDialogVisible" width="600px">
      <el-form :model="form" label-width="120px" style="width: 60%; margin-left: 15%; margin-right: 30%">
        <el-form-item label="灾害类型">
          <el-input v-model="form.type" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="灾害名称">
          <el-input v-model="form.name" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="灾害等级">
          <el-input v-model="form.level" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="灾害编号">
          <el-input v-model="form.number" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.memo" autocomplete="off"/>
        </el-form-item>
        <el-form-item>
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addEvent()">添 加</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog title="edit" :visible.sync="editDialogVisible" width="600px">
      <el-form :model="form" label-width="120px" style="width: 60%; margin-left: 15%; margin-right: 30%">
        <el-form-item label="名称">
          <el-input v-model="form.inputName" autocomplete="off"/>
        </el-form-item>
        <el-form-item>
          <el-button @click="editDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="editEvent">修 改</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-tree
        :data="treeData"
        show-checkbox
        node-key="id"
        default-expand-all
        :expand-on-click-node="false"
        @node-click="editNodeName"
        :render-content="renderContent"
        style="margin-right: 80%;"
    >
    </el-tree>

  </div>
</template>

<script>
import { events, add } from '@/data/event/event'

export default {
  name: 'Event',
  data() {
    return {
      addDialogVisible: false,
      editDialogVisible: false,
      appendDialogVisible: false,
      treeData: [],
      appendName: '',
      form: [{
        type: '',
        name: '',
        level: '',
        number: '',
        memo: '',
        inputName: ''
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
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
    editNodeName(data, node, component) {
      console.log(data)
      this.editDialogVisible = true
      this.form.inputName = data.label
    },
    appendEvent() {
      this.appendName = this.form.inputName
      this.clearForm()
      this.appendDialogVisible = false
    },
    append(data) {
      const newChild = {
        label: '',
        children: []
      }
      if (!data.children) {
        this.$set(data, 'children', [])
      }
      data.children.push(newChild)
    },
    remove(node, data) {
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.id === data.id)
      children.splice(index, 1)
    },
    handleAppend(data) {
      this.appendDialogVisible = true
      this.appendData = data
    },
    renderContent(h, { node, data, store }) {
      return (
          <span class="custom-tree-node">
            <span>{ node.label }</span>
            <span class="node-button">
              <el-button size="mini" plain type="primary" icon="el-icon-plus"
                         on-click={ () => this.append(data) }
              />
            <el-button size="mini" plain type="danger" icon="el-icon-delete"
                       on-click={ () => this.remove(node, data) }
            />
            </span>
          </span>)
    },
    clearForm() {
      this.form.type = ''
      this.form.name = ''
      this.form.level = ''
      this.form.number = ''
      this.form.memo = ''
      this.form.inputName = ''
    },
    addEvent() {
      add(this.form)
      this.$message.success('添加成功！')
      this.clearForm()
      this.addDialogVisible = false
    },
    imgClick(imgUrl) {
      this.srcList = [imgUrl]
    },
    getTemplateList() {
      this.treeData = events
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
    getTime(timestamp) {
      let that = this
      timestamp = parseInt(timestamp)
      const date = new Date(timestamp) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      let Y = date.getFullYear() + '-'
      let M =
          (date.getMonth() + 1 < 10
              ? '0' + (date.getMonth() + 1)
              : date.getMonth() + 1) + '-'
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

.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}

.node-button {
}
</style>
