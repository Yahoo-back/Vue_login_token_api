<!-- 侧面导航栏-->
<template>
  <div style="height:100%;overflow: auto;overflow-x: hidden">
    <div class="logo-con" :style="{background: menuTheme !== 'dark'?'#495060':''}">
      <!--展开时左侧上面的图片-->
      <h2 class="leftTitle" @click="herfchange" v-show="!sidebar">后台管理系统</h2>
      <!--菜单收起时左侧显示的图片-->
      <a @click="herfchange" v-show="sidebar"><img style="width: 26px; height: 26px" src="../../assets/logo.png"/></a>
    </div>
    <Menu v-if="!sidebar" ref="sideMenu" :active-name="$route.path" :theme="menuTheme" :open-names="openedSubmenuArr"
          width="auto" @on-select="changeMenu">
      <template v-for="item in menuTree" v-if="!item.hidden && item.children && item.children.length>0 && item.uri.split('/')[1] === menu">
        <!--有二级菜单的设置路由-->
        <template v-for="child in item.children">
          <!--设置下面的二级菜单显示-->
          <MenuItem :name="item.uri+'/'+child.uri"  >
            <Icon :type="icon" :size="iconSize" ></Icon>
            <span class="layout-text" >{{ child.muenName }}</span>
          </MenuItem>
        </template>
      </template>
    </Menu>
    <div v-else-if="sidebar" class="shrink">
      <template v-for="(item,index) in menuTree" v-if="!item.hidden && item.children && item.children.length>0 && item.uri.split('/')[1] === menu">
        <!--只展示选择的那个一级菜单的二级菜单-->
        <!--有二级菜单的展示-->
        <Dropdown transfer v-if="item.children.length !== 0" placement="right-start" :key="index"
                  @on-click="changeMenu">
        </Dropdown>
        <template v-for="(child, i) in item.children">
          <Dropdown transfer v-if="item.children && item.children.length !== 0" placement="right-start" :key="index"
                    @on-click="changeMenu">
                    <!-- 二级菜单页面跳转 -->
            <router-link tag='span' :to="item.muenName+'/'+child.muenName"
                         style="display: inline-block;height:100%;width:100%">
              <Button class="shrinkbutton" type="text">
                <Icon :size="20" :color="iconColor" :type="icon"/>
              </Button>
            </router-link>
            <DropdownMenu class="shrinkdropdownMenu" slot="list">
              <DropdownItem :name="item.uri+'/'+child.uri" :key="i">
                <!-- <Icon :type="icon"/> -->
                <span class="dropdownItemIcon">{{ child.muenName }}</span>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </template>
      </template>
    </div>
  </div>
</template>
<script>

  import {mapGetters} from 'vuex';

  export default {
    data() {
      return {
        icon: "key",
        iconSize: 14,
        //当前选中导航的name
        menu: "",
         menuTree: JSON.parse(localStorage.getItem('menuTree'))
      }
    },
    mounted() {
      var menuTree = JSON.parse(localStorage.getItem('menuTree'));
      var uri = menuTree.uri;
    },
    computed: {
      ...mapGetters([
        'permission_routers',
        'sidebar'
      ]),
      menuTheme() {
        return this.$store.state.app.menuTheme;
      },
      openedSubmenuArr() {
        let n = this.$route.path.split("/")[1];
        return [n];
      },
      iconColor() {
        return this.$store.state.app.menuTheme === 'dark' ? 'white' : '#495060';
      },
    },
    methods: {
      
      changeMenu(active) {
        this.$router.push(active);
      },
      changeNavMenu(url) {
        this.menu = url;
      },
      herfchange() {
        let path = "/";
        this.$router.push(path);
        this.menu = path;
      },
    },
  }
</script>

<style lang="less">
  .leftTitle {
    color: #fff;
  }
  .shrink {
    text-align: center;
    .shrinkbutton {
      width: 65px;
      padding: 10px 0;
    }
    .shrinkdropdownMenu {
      width: 200px;
    }
    .dropdownItemIcon {
      padding-left: 10px;
    }
  }
</style>




<!-- <template> -->
  <!-- <div style="height:100%;overflow: auto;overflow-x: hidden">
    <div class="logo-con" :style="{background: menuTheme !== 'dark'?'#495060':''}"> -->
      <!--展开时左侧上面的图片-->
      <!-- <h2 class="leftTitle" @click="herfchange" v-show="!sidebar">后台管理系统</h2> -->
      <!--菜单收起时左侧显示的图片-->
      <!-- <a @click="herfchange" v-show="sidebar"><img style="width: 26px; height: 26px" src="../../assets/logo.png"/></a> -->
    <!-- </div>
    <Menu v-if="!sidebar" ref="sideMenu" :active-name="$route.path" :theme="menuTheme" :open-names="openedSubmenuArr"
          width="auto" @on-select="changeMenu">
      <template v-for="item in permission_routers"
                v-if="!item.hidden && item.children.length>0 && item.path.split('/')[1] === menu"> -->
        <!--有二级菜单的设置路由-->
        <!-- <template v-for="child in item.children"> -->
          <!--设置下面的二级菜单显示-->
          <!-- <MenuItem :name="item.path+'/'+child.path" :key="child.name">
            <Icon :type="child.icon" :size="iconSize" :key="child.name"></Icon>
            <span class="layout-text" :key="child.name">{{ child.title }}</span>
          </MenuItem>
        </template> -->
      <!-- </template>
    </Menu>
    <div v-else-if="sidebar" class="shrink">
      <template v-for="(item,index) in permission_routers"
                v-if="!item.hidden && item.children.length>0 && item.path.split('/')[1] === menu"> -->
        <!--只展示选择的那个一级菜单的二级菜单-->
        <!--有二级菜单的展示-->
        <!-- <Dropdown transfer v-if="item.children.length !== 0" placement="right-start" :key="index"
                  @on-click="changeMenu">
        </Dropdown>
        <template v-for="(child, i) in item.children">
          <Dropdown transfer v-if="item.children.length !== 0" placement="right-start" :key="index"
                    @on-click="changeMenu">
            <router-link tag='span' :to="item.path+'/'+child.path"
                         style="display: inline-block;height:100%;width:100%">
              <Button class="shrinkbutton" type="text">
                <Icon :size="20" :color="iconColor" :type="child.icon"/>
              </Button>
            </router-link>
            <DropdownMenu class="shrinkdropdownMenu" slot="list">
              <DropdownItem :name="item.path+'/'+child.path" :key="i">
                <Icon :type="child.icon"/>
                <span class="dropdownItemIcon">{{ child.title }}</span>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </template>
      </template>
    </div>
  </div>
</template> -->

<!-- <script>

//   import {mapGetters} from 'vuex';

//   export default {
//     data() {
//       return {
//         iconSize: 14,
//         //当前选中导航的name
//         menu: ""
//       }
//     },
//     computed: {
//       ...mapGetters([
//         'permission_routers',
//         'sidebar'
//       ]),
//       menuTheme() {
//         return this.$store.state.app.menuTheme;
//       },
//       openedSubmenuArr() {
//         let n = this.$route.path.split("/")[1];
//         return [n];
//       },
//       iconColor() {
//         return this.$store.state.app.menuTheme === 'dark' ? 'white' : '#495060';
//       },
//     },
//     methods: {
//       changeMenu(active) {
//         this.$router.push(active);
//       },
//       changeNavMenu(url) {
//         this.menu = url;
//       },
//       herfchange() {
//         let path = "/";
//         this.$router.push(path);
//         this.menu = path;
//       },
//     },
//   }
// </script>

// <style lang="less">
//   .leftTitle {
//     color: #fff;
//   }
//   .shrink {
//     text-align: center;
//     .shrinkbutton {
//       width: 65px;
//       padding: 10px 0;
//     }
//     .shrinkdropdownMenu {
//       width: 200px;
//     }
//     .dropdownItemIcon {
//       padding-left: 10px;
//     }
//   }
// </style> -->

