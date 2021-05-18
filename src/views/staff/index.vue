<template>
  <div class="root">
    <el-row>
      <el-col :span="8">
        <el-button type="primary" icon="el-icon-plus" @click="addDialogVisible = true">新增
        </el-button>
        <el-button type="danger" icon="el-icon-delete" @click="deleteUser">删除</el-button>
        <!--
          添加用户
        -->
        <el-dialog title="用户信息" :visible.sync="addDialogVisible" width="600px">
          <el-form :model="form" label-width="120px" style="width: 60%; margin-left: 15%; margin-right: 30%">
            <el-form-item label="用户名">
              <el-input v-model="form.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input show-password v-model="form.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="姓名">
              <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="性别">
              <el-radio-group v-model="form.gender">
                <el-radio label="男">男</el-radio>
                <el-radio label="女">女</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="出生年份">
              <el-select v-model="form.birthYear" placeholder="请选择">
                <div v-for="(item, index) in this.yearList">
                  <el-option :label="item" :value="item">
                  </el-option>
                </div>
              </el-select>
            </el-form-item>
            <el-form-item label="用户类型">
              <el-select v-model="form.type" placeholder="请选择">
                <el-option label="工作人员" value="工作人员"></el-option>
                <el-option label="指挥人员" value="指挥人员"></el-option>
                <el-option label="专家" value="专家"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button @click="addUserCancel">取 消</el-button>
              <el-button type="primary" @click="addUser()">注 册</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
        <!--
          编辑用户信息
        -->
        <el-dialog title="用户信息" :visible.sync="editDialogVisible" width="600px">
          <el-form ref="from" :model="form" label-width="120px" style="width: 60%; margin-left: 15%; margin-right: 30%">
            <el-form-item label="用户名">
              <el-input v-model="form.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input show-password v-model="form.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="姓名">
              <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="性别">
              <template>
                <el-radio-group v-model="form.gender">
                  <el-radio label="男">男</el-radio>
                  <el-radio label="女">女</el-radio>
                </el-radio-group>
              </template>
            </el-form-item>
            <el-form-item label="出生年份">
              <el-select v-model="form.birthYear" placeholder="请选择">
                <div v-for="(item, index) in this.yearList">
                  <el-option :label="item" :value="item">
                  </el-option>
                </div>
              </el-select>
            </el-form-item>
            <el-form-item label="用户类型">
              <el-select v-model="form.type" placeholder="请选择">
                <el-option label="工作人员" value="工作人员"></el-option>
                <el-option label="指挥人员" value="指挥人员"></el-option>
                <el-option label="专家" value="专家"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button @click="editUserCancel">取 消</el-button>
              <el-button type="primary" @click="editUser">修 改</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
      </el-col>
      <el-col :span="16">
        <div class="search">
          <el-input placeholder="请输入用户信息" @input="search" v-model="keyword" clearable class="input-with-select">
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
        @row-click="preEditUser">

      <el-table-column type="selection" prop="checked" label="" show-overflow-tooltip>

      </el-table-column>
      <el-table-column prop="id" label="ID" show-overflow-tooltip></el-table-column>
      <el-table-column prop="name" label="姓名" show-overflow-tooltip></el-table-column>
      <el-table-column prop="age" label="年龄" show-overflow-tooltip></el-table-column>
      <el-table-column prop="username" label="用户名" show-overflow-tooltip></el-table-column>
      <el-table-column prop="password" label="密码" show-overflow-tooltip></el-table-column>
      <el-table-column prop="type" label="用户类型" show-overflow-tooltip></el-table-column>
      <el-table-column prop="gender" label="性别" show-overflow-tooltip></el-table-column>
      <el-table-column prop="birthYear" label="出生年份" show-overflow-tooltip></el-table-column>
      <el-table-column prop="status" label="账户状态" show-overflow-tooltip></el-table-column>

    </el-table>
    <el-pagination
        class="pagination"
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="pageSize"
        @current-change="pageChange"
        @prev-click="pageChange"
        @next-click="pageChange">
    </el-pagination>

  </div>
</template>

<script>
import { users, userType, userStatus, queryUserByUsername, queryUserByBlur } from '@/data/staff/user'

export default {
  name: "Staff",
  data() {
    return {
      yearList: [],
      selection: [],
      find: [],
      addDialogVisible: false,
      editDialogVisible: false,
      form: {
        id: 0,
        username: '',
        password: '',
        name: '',
        gender: '',
        birthYear: '',
        type: ''
      },
      pageSize: 6,
      total: 6, // task总数
      srcList: [],
      tableData: [],
      keyword: "",
      headers: {
        token: localStorage.getItem("token")
      },
    };
  },
  created: function() {
    this.getTemplateList()
    this.initYearList()
  },
  methods: {
    deleteUser() {
      if (this.selection.length === 0) {
        this.$message.error("您尚未选择待删除的用户！")
        return
      }
      let ins = []
      for (let user of this.selection) {
        for (let i = 0; i < users.length; i++) {
          if (users[i].id === user.id) {
            users.splice(i, 1)
          }
        }
      }
      this.$message.success("删除成功！")
      this.selection = []
    },
    handleSelectionChange(val) {
      this.selection = val
    },
    preEditUser(row, column, event) {
      this.editDialogVisible = true;
      this.form.id = row.id;
      this.form.name = row.name;
      this.form.username = row.username;
      this.form.password = row.password;
      this.form.type = row.type;
      this.form.gender = row.gender;
      this.form.birthYear = row.birthYear;
      this.form.status = row.status;
    },
    getTemplateList() {
      this.tableData = users
    },
    editUser() {
      const id = this.form.id
      users[id].name = this.form.name;
      users[id].username = this.form.username;
      users[id].password = this.form.password;
      users[id].age = new Date().getFullYear() - this.form.birthYear;
      users[id].gender = this.form.gender
      users[id].birthYear = this.form.birthYear;
      users[id].status = this.form.status;
      this.$message.success("修改成功！")
      this.editDialogVisible = false
      this.clearForm()
    },
    editUserCancel() {
      this.editDialogVisible = false
      this.clearForm()
    },
    addUserCancel() {
      this.addDialogVisible = false
      this.clearForm()
    },
    clearForm() {
      this.form.id = ''
      this.form.name = ''
      this.form.username = ''
      this.form.password = ''
      this.form.type = ''
      this.form.gender = ''
      this.form.birthYear = ''
      this.form.status = ''
    },
    initYearList() {
      for (let i = new Date().getFullYear(); i >= 1900; i--) {
        this.yearList.push(i);
      }
    },
    addUser() {
      let max = 0;
      for (let user of users) {
        max = Math.max(max, user.id)
      }
      let user = {
        id: max + 1,
        name: this.form.name,
        age: new Date().getFullYear() - this.form.birthYear,
        username: this.form.username,
        password: this.form.password,
        type: this.form.type,
        gender: this.form.gender,
        birthYear: this.form.birthYear,
        status: userStatus[0]
      }
      users.push(user)
      this.$message.success("添加成功！")
      this.addDialogVisible = false
    },
    search() {
      if (this.keyword === null || this.keyword.length === 0) {
        this.tableData = users
      } else {
        this.tableData = queryUserByBlur(this.keyword)
      }
    },
    goSearch() {
      let that = this;
      if (that.keyword.length < 1) {
        that.getTemplateList();
        return 0;
      }
      this.req({
        url: "searchTemplate?keyword=" + that.keyword,
        data: {},
        method: "GET"
      }).then(
          res => {
            console.log("res :", res);
            if (res.data.length < 1) {
              that.$message("查询无果~");
              return 0;
            } else {
              that.$message("查询成功~");
            }
            for (let i = 0; i < res.data.length; i++) {
              res.data[i].createDate = that.getTime(res.data[i].createDate);
            }
            that.tableData = res.data;
          },
          err => {
            console.log("err :", err);
          }
      );
    },
    deleteTemplate(id) {
      let that = this;
      this.$confirm("此操作将删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
          .then(() => {
            that
                .req({
                  url: "deleteTemplate?id=" + id,
                  data: {},
                  method: "GET"
                })
                .then(
                    res => {
                      console.log("res :", res);
                      that.getTemplateList();
                      that.$message("删除成功~");
                    },
                    err => {
                      console.log("err :", err);
                    }
                );
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
    },
    uploadSuccess(response, file, fileList) {
      let that = this;
      console.log(":", response);
      this.$message("上传成功~");
      this.$prompt("请输入模板名称", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
          .then(({ value }) => {
            that
                .req({
                  url: "addTemplate",
                  data: {
                    name: value,
                    imgUrl: response.data,
                    createDate: new Date().getTime()
                  },
                  method: "POST"
                })
                .then(
                    res => {
                      console.log("res :", res);
                      that.getTemplateList();
                    },
                    err => {
                      console.log("err :", err);
                    }
                );
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "取消上传"
            });
          });
    },
    getTime(timestamp) {
      let that = this;
      timestamp = parseInt(timestamp);
      const date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      let Y = date.getFullYear() + "-";
      let M = (
          (date.getMonth() + 1 < 10) ?
              "0" + (date.getMonth() + 1) : date.getMonth() + 1) + "-";
      let D = that.change(date.getDate()) + " ";
      let h = that.change(date.getHours()) + ":";
      let m = that.change(date.getMinutes()) + ":";
      let s = that.change(date.getSeconds());
      return Y + M + D + h + m + s;
    },
    change(t) {
      if (t < 10) {
        return "0" + t;
      } else {
        return t;
      }
    },
    // 下载文件
    downloadFile(name, href) {
      console.log("name :", name);
      console.log("href :", href);
      let a = document.createElement("a"), //创建a标签
          e = document.createEvent("MouseEvents"); //创建鼠标事件对象
      e.initEvent("click", false, false); //初始化事件对象
      a.href = href; //设置下载地址
      a.download = name; //设置下载文件名
      a.dispatchEvent(e); //给指定的元素，执行事件click事件
    },
    pageChange(page) {
      console.log("page :", page);
      this.getTemplateList(page);
    }
  }
};
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
