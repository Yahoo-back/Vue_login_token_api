<style lang="less">
    .el-dialog{
      width: 30%
    }
</style>
<template>
  <div>
    <div class="main-header">
      <!--设置菜单默认选中条目-->
      <Menu mode="horizontal" :active-name="$route.path.split('/')[1]" @on-select="selectMenu">
        <div class="navicon-con">
          <!--菜单的缩进和展开功能-->
          <Button :style="{transform: 'rotateZ(' + (this.sidebar ? '90' : '0') + 'deg)'}" type="text"
                  @click="toggleSideBar">
            <Icon type="navicon" size="32"></Icon>
          </Button>
        </div>
        <!-- 顶部导航 -->
        <breadcrumbNav/>
        <div class="layout-nav">
          <div class="main-header-operate">
            <div class="header-avator-con-icon">
              <div>
                <screenfull style="margin-top: 4px"/>
              </div>
              <div>
                <themeDropMenu @on-select="selectMenu"/>
              </div>
            </div>
            <div class="header-avator-con">
              <div class="user-dropdown-menu-con">
                <Row type="flex" justify="end" align="middle" class="user-dropdown-innercon">
                  <Dropdown transfer trigger="click">
                    <a href="javascript:void(0)">
                      <span class="main-user-name">{{this.username}}</span>
                      <!--下拉按钮，以后会用到-->
                      <Icon type="arrow-down-b"></Icon>
                    </a>
                    <DropdownMenu slot="list">
                      <DropdownItem name="loginout" divided><span style="color： #000" @click="handleClickUserDropdown">退出登录</span></DropdownItem>
                      <DropdownItem divided><span @click="dialogFormVisible = true">修改密码</span></DropdownItem>
                      <el-dialog title="修改密码" :visible.sync="dialogFormVisible" :append-to-body='true'>
                        <el-form :model="form">
                          <el-form-item label="旧密码" :label-width="formLabelWidth">
                            <el-input v-model="form.name" autocomplete="off" placeholder="请输入旧密码"></el-input>
                          </el-form-item>
                          <el-form-item label="新密码" :label-width="formLabelWidth">
                            <el-input v-model="form.name" autocomplete="off" placeholder="请输入新密码"></el-input>
                          </el-form-item>
                          <el-form-item label="确认密码" :label-width="formLabelWidth">
                            <el-input v-model="form.name" autocomplete="off" placeholder="请确认密码"></el-input>
                          </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                          <el-button @click="dialogFormVisible = false">取 消</el-button>
                          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
                        </div>
                      </el-dialog>
                    </DropdownMenu>
                  </Dropdown>
                  <!-- <Avatar :src="avator" style="background: #2db7f5;margin-left: 10px;"></Avatar> -->
                </Row>
              </div>
            </div>
          </div>
        </div>
      </Menu>
    </div>
    <div class="tags-con">
      <tagsOpened  @on-select="selectMenu" :pageTagsList="pageTagsList"></tagsOpened>
    </div>
  </div>
</template>

<script>
  import {logout,adminInfo} from '../../api/login.js'
  import {mapGetters,mapMutations} from 'vuex';
  import breadcrumbNav from './BreadcrumbNav.vue';
  import tagsOpened from './TagsOpened.vue';
  import screenfull from '@/components/main/Screenfull.vue';
  import themeDropMenu from '@/components/main/ThemeDropMenu.vue';
  import avator from '@/assets/avator.png';

  export default {
    name: 'navbar',
    components: {
      breadcrumbNav,
      tagsOpened,
      screenfull,
      themeDropMenu,
    },
    data() {
      return {
        avator: avator,
        username: '',
        dialogFormVisible: false,
         form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
         formLabelWidth: '120px'
      };
    },
    props: ['menuActive'],
    computed: {
      pageTagsList() {
        return this.$store.state.app.pageOpenedList; // 打开的页面的页面对象
      },
      ...mapGetters([
        'sidebar',
        'userInfo',
      ]),
      userName() {
        if (this.userInfo.username === null && this.userInfo.username !== "") {
          return ""
        } else {
          //导航栏顶部用户名显示
          return this.userInfo.username
        }
      },
    },
    methods: {
      // ...mapMutations(['delToken']),
      getUserInfo() {
        adminInfo().then(res=>{
          if(res.data.code == 200){
            this.username = res.data.data.roles[0];
          }
        })
      },
      toggleSideBar() {
        this.$store.dispatch('ChangeSidebar')
      },
      handleClickUserDropdown () {
        //表单验证
        let token = localStorage.getItem('token')
          if (token) {
            //登录接口传值
            logout()
              .then(res => {
                if(res.data.code == 200) {
                  this.$message.success(`${res.data.message}`)
                  //完成页面跳转
                  // this.delToken({token: ''});
                  this.$store.commit('$_removeStorage',token)
                  this.$router.push("/login");
                }else {
                  this.$message.error(`${res.data.message}`)
                  return false;
                }
              })
              .catch(err => {
                this.$message.error(`${err.message}`, 'ERROR!')
              }) 
          }else{
            this.$message.error(`没有token`)
            return false;
          }
      },
      // handleClickUserDropdown(e) {
      //   if (e === "loginout") {
      //     this.$store.dispatch('LogOut').then(() => {
      //       location.reload();
      //     });
      //   }
      // },
      //选中导航菜单回调
      selectMenu(name) {
        this.$emit("select", name);

      }
    },
     created(){
      this.getUserInfo();
    }
  }
</script>
