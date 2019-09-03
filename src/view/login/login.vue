<template>
  <div id="particles">
    <div class="login" @keydown.enter="handleSubmit">
      <div class="login-con">
        <Card :bordered="false">
          <p slot="title">
            <Icon type="log-in"></Icon>
            欢迎登录
          </p>
          <div class="form-con">
            <Form ref="loginForm" :model="form" :rules="rules">
              <FormItem prop="username">
                <Input v-model="form.username" placeholder="请输入用户名">
                <span slot="prepend">
                    <Icon :size="16" type="person"></Icon>
                  </span>
                </Input>
              </FormItem>
              <FormItem prop="password">
                <Input type="password" v-model="form.password" placeholder="请输入密码">
                <span slot="prepend">
                    <Icon :size="14" type="locked"></Icon>
                  </span>
                </Input>
              </FormItem>
              <FormItem>
                <Button @click="handleSubmit" type="primary" :loading="loading" long>登录</Button>
              </FormItem>
            </Form>
            <!-- <p class="login-tip">密码:123456</p> -->
          </div>
        </Card>
      </div>
    </div>
  </div>
</template>

<script>
  import Cookies from 'js-cookie';
  import particles from 'particles.js';
  import {login} from '../../api/login';
  import {adminPermission} from '../../api/login';
  import {mapMutations} from  'vuex';
  export default {
    data () {
      return {
        loading: false,
        redirect: undefined,
        form: {
          userName: '',
          password: ''
        },
        rules: {
          username: [
            {required: true, message: '账号不能为空', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '密码不能为空', trigger: 'blur'}
          ]
        }
      };
    },
    watch: {
      $route: {
        handler: function(route) {
          this.redirect = route.query && route.query.redirect
        },
        immediate: true
      }
    },
    methods: {
      handleSubmit (option) {
        //表单验证
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            //登录接口传值
            login({username: this.form.username, password: this.form.password})
              .then(res => {
                if(res.data.code == 200) {
                  let head = res.data.data.tokenHead;
                  let tokens = res.data.data.token;
                  let token = head+tokens;
                  let userId = res.data.data.userId;
                  localStorage.setItem('token',token);
                  this.$store.commit('$_setToken',token)
                  localStorage.setItem('userId',userId);
                  this.$message.success(`${res.data.message}`)
                  //完成页面跳转
                  let userInfo = {
                    username: this.form.username,
                    password: this.form.password,
                  };
                  Cookies.set('userInfo', userInfo);
                  this.$store.commit('setUserInfo', userInfo);
                  //设置收缩栏默认为展开
                  this.$store.state.app.sidebar = false;
                  this.$router.push("/");
                  const userIds = localStorage.getItem('userId')
                  //获取权限接口
                  adminPermission({userId: userIds}).then(res=>{
                  var menu = JSON.stringify(res.data.data);
                  localStorage.setItem('menu',menu);
              })
                }else {
                  this.$message.error(`${res.data.message}`)
                  return false;
                }
              })
              .catch(err => {
                this.$message.error(`${err.message}`, 'ERROR!')
              }) 
          }else{
            this.$message.error(`表单验证失败`)
            return false;
          }
        });
      },
    },
    mounted() {
      particlesJS.load('particles','../../static/particles.json');
      var menu= JSON.parse(localStorage.getItem('menu'));
      //myId,pId为随机定义的主键（muenId）; 父级（parentMuenId）；menu：后端返回的菜单数组链式
      //parentMuenId：后端返回数组的主键，
      //注意：myId和pId为随机定义的
      function list(myId,pId,menu){
        function exists(menu, parentMuenId){
          for(var i=0; i<menu.length; i++){
          if (menu[i][myId] == parentMuenId) return true;
          }
          return false;
        }

        var nodes = [];
        // get the top level nodes
        for(var i=0; i<menu.length; i++){
          var row = menu[i];
          if (!exists(menu, row[pId])){
          nodes.push(row);
          // console.log(nodes)
          }
        }
        var toDo = [];
        for(var i=0; i<nodes.length; i++){
          toDo.push(nodes[i]);
        }
        while(toDo.length){
          var node = toDo.shift(); // the parent node
          // get the children nodes
          for(var i=0; i<menu.length; i++){
          var row = menu[i];
          if (row[pId] == node[myId]){
            //var child = {id:row.id,text:row.name};
            if (node.children){
            node.children.push(row);
            } else {
            node.children = [row];
            }
            toDo.push(row);
          }
          }
        }
        return nodes;
        // console.log(nodes)
      }
        var menuTree = list("muenid","parentMuenId",menu);
        var m = JSON.stringify(menuTree)
        localStorage.setItem('menuTree',m);
        //将菜单存储至本地
        var menuTree = JSON.parse(localStorage.getItem('menuTree'))
        // console.log(menuTree)
        // console.log(menuTree[0].children)
    },
  }
</script>
<style lang="less">
  canvas{
    display:block;
    vertical-align:bottom;
  }
  #particles{
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #000;
    background-repeat: no-repeat;
    background-size: cover;
  }
  .login {
    width: 100%;
    height: 100%;
    // background: #000;
    // background-image: url("../../assets/bg1.jpg");
    background-size: cover;
    background-position: center;
    position: absolute;
    &-con {
      position: absolute;
      right: 160px;
      top: 50%;
      transform: translateY(-60%);
      width: 300px;
      &-header {
        font-size: 16px;
        font-weight: 300;
        text-align: center;
        padding: 30px 0;
      }
      .form-con {
        padding: 10px 0 0;
      }
      .login-tip {
        font-size: 10px;
        text-align: center;
        color: #c3c3c3;
      }
    }
  }
</style>
