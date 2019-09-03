<style lang="less">
.ivu-card {
  background: none ;
}
.ivu-card-head p, .ivu-card-head-inner {
  color: #fff;
  text-align: center;
  height: 100%;
  font-size: 24px;
  line-height: 24px;
}
.ivu-card-head {
  border-bottom: none;
  padding: none;
}
.ivu-input {
  background: transparent;
  border: 2px solid rgba(255,255,255,0.3);
  box-shadow: inset 0 0 4px rgba(255,255,255,0.2),0 0 4px	rgba(255,255,255,0.2); 
  -moz-border-radius:6px;
  -webkit-border-radius:6px;
  border-radius:6px;
  border:2px solid #F0F0F0;
  -o-transition:all .5s;
  -moz-transition:all .5s;
  -webkit-transition:all .5s;
  -ms-transition:all .5s;
  height: 45px;
  color: #fff;
  font-size: 15px;
  line-height: 20px;
}
.ivu-input:focus{
  border-color: #fff;
  outline:none;
  box-shadow:0 0 5px #fff;
}
.ivu-input:hover{
  border-color: #fff;
  outline:none;
  box-shadow:0 0 5px #fff;
}
.ivu-form-item-error .ivu-input {
  border: 2px solid #ed3f14;
}
.ivu-form-item-error-tip {
  font-size: 13px;
}
.ivu-btn-primary{
  background: transparent;
  border-color: #fff;
}
.ivu-btn-primary:hover{
  background: #fff;
  border-color: #fff;
  color: #000;
}
.ivu-btn {
  border: 2px solid #fff;
}
.tlogin{
  width: 328px;
  height: 45px;
  font-size: 18px;
}
</style>
<template>
  <div id="particles">
    <div class="login" @keydown.enter="handleSubmit">
      <div class="login-con">
        <Card :bordered="false">
          <p slot="title">
            后台管理系统
          </p>
          <div class="form-con">
            <Form ref="loginForm" :model="form" :rules="rules">
              <FormItem prop="username">
                <Input v-model="form.username" placeholder="请输入用户名">
                
                </Input>
              </FormItem>
              <FormItem prop="password">
                <Input type="password" v-model="form.password" placeholder="请输入密码">
               
                </Input>
              </FormItem>
              <FormItem>
                <Button @click="handleSubmit" type="primary" :loading="loading" class="tlogin">登录</Button>
              </FormItem>
            </Form>
            <!-- <p class="login-tip">密码:123456</p> -->
          </div>
        </Card>
      </div>
    </div>
  </div>
</template>
<style lang="less">
  .el-collapse-item__header {
    font-size: 15px;
  }
	.main .single-page-con {
			background: #fff;
		}
</style>
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
      right: 42%;
      top: 50%;
      transform: translateY(-60%);
      width: 360px;
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
