<template>
  <div class="root">
    <emergency/>
  </div>
</template>

<script>
import { events, addType } from '@/data/event/event'
import Emergency from '@/views/event/Emergency'

export default {
  name: 'Event',
  components: {
    Emergency,
  },
  data() {
    return {
      addTypeDialogVisible: false,
      editDialogVisible: false,
      addLevelDialogVisible: false,
      id: 1000,
      inputName: "",
      treeData: [],
      chosenNode: {
        id: "",
        label: "",
        children: []
      },
      form: [{
        type: '',
        name: '',
        level: '',
        number: '',
        memo: ''
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
    editName() {
      this.chosenNode.label = this.inputName
      this.editDialogVisible = false
      this.inputName = ""
    },
    handleNodeClick(data, node, comp) {
      this.editDialogVisible = true
      this.chosenNode.id = data.id
      this.chosenNode.label = data.label
      this.chosenNode.children = data.children
      console.log(node)
    },
    addEventType() {
      addType(this.form.type)
      this.addTypeDialogVisible = false
      this.clearForm()
    },
    append(data) {
      const newChild = { id: this.id++, label: 'empty', children: [] }
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
    renderContent(h, { node, data, store }) {
      return (
          <span class="custom-tree-node">
            <span>{node.label}</span>
            <span>
              <el-button plain size="mini" type="primary" icon="el-icon-edit"
                         on-click={() => this.append(data)}/>
              <el-button plain size="mini" type="danger" icon="el-icon-delete"
                         on-click={() => this.remove(node, data)}/>
            </span>
          </span>)
    },
    clearForm() {
      this.form.type = ''
      this.form.name = ''
      this.form.level = ''
      this.form.number = ''
      this.form.memo = ''
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

</style>
