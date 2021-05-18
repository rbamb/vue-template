<template>
  <div class="user-dialog">
    <el-dialog title="用户信息" v-if="visible" :visible.sync="visible" width="600px">
      <el-form :model="form" label-width="120px" style="width: 60%; margin-left: 15%; margin-right: 30%">
        <el-form-item label="用户名">
          <el-input clearable="true" v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input show-password v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input clearable="true" v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <template>
            <el-radio v-model="form.gender" label="1" value="男">男</el-radio>
            <el-radio v-model="form.gender" label="2" value="女">女</el-radio>
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
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="addUser()">注 册</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'EditUserInfoDialog',
  props: {
    form: {
      type: Array,
      default: []
    },
    visible: {
      type: Boolean,
      default: false
    },
    yearList: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      user: {
        id: 0,
        name: "",
        age: 0,
        username: "",
        password: "",
        type: "",
        gender: "",
        birthYear: 0,
        status: ""
      },
    }
  },
  watch: {
    visible: {
      immediate: true,
      handler(val, oldVal) {
        this.visible = val;
        console.log(this.visible)
      },
      deep: true
    },
    from: {
      handler(val) {
        this.user.id = this.form.id;
        this.user.name = this.form.name;
        this.user.age = this.form.age;
        this.user.username= this.form.username;
        this.user.password = this.form.password;
        this.user.type = this.form.type;
        this.user.gender = this.form.gender;
        this.user.birthYear = this.form.birthYear;
        this.user.status= this.form.status;
      }
    }
  },
  methods: {
    addUser() {
      this.visible = false;
      this.$emit('addUser', this.form)
    },
    cancel() {
      this.visible = false;
    }
  },
}
</script>

<style scoped>

</style>
