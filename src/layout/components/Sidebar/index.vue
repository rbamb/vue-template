<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical">
        <sidebar-item v-for="route in routes" :key="route.path" :item="route"
                      :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'

export default {
  components: { SidebarItem, Logo },
  methods: {
    translate(type) {
      switch (type) {
        case "系统管理员":
          return "admin"
        case "工作人员":
          return "worker"
        case "指挥人员":
          return "director"
        case "专家":
          return "expert"
      }
      return null
    },
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    routes() {
      for (let r of this.$router.options.routes) {
        if (r.path.substr(1) === this.translate(this.$store.getters.getLoginUser.type)) {
          r.hidden = false
        }
      }
      return this.$router.options.routes
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    },
  }
}
</script>
