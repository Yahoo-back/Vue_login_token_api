<!--顶部导航-->
  <!-- <div> -->
    <!-- 这里显示 index 小于 maxItem 的内容 -->
    <!-- <div v-for="(item,index) in currentPathArr" :href="item.path" :key="item.name"
         v-if="!item.hidden && index < maxItem"> -->
      <!--这里设置一个长度大于了多少就下拉显示一级菜单-->
      <!-- <MenuItem :name="item.path.split('/')[1]" >
        <Icon :type="item.icon" :size="iconSize" :key="item.path"></Icon>
        {{item.title}}
      </MenuItem> -->

      <!-- <MenuItem :name="item.path.split('/')[1]" v-if="item.children.length<=0">
        <router-link tag='span' :to="item.path + '/' + item.children[0].path"
                     style="display: inline-block;height:100%;width:100%">
          <Icon :type="item.icon" :size="iconSize" :key="item.path"></Icon>
          {{item.title}}
        </router-link>
      </MenuItem>
    </div>
    <Submenu name="group" v-if="maxItem !== currentPathArr.length && maxItem <= currentPathArr.length">
      <template slot="title">
        <Icon type="stats-bars"/> -->
        <!--其他内容-->
      <!-- </template> -->
      <!-- <MenuGroup title="列表">
        <div v-for="(item,index) in currentPathArr" :href="item.path" :key="item.name"
             v-if="!item.hidden && index >= maxItem"> -->
          <!--无二级菜单-->
          <!-- <MenuItem :name="item.path.split('/')[1]" v-if="item.children.length>0">
            <Icon :type="item.icon" :size="iconSize" :key="item.path" style="width: 20px"/>
            <span class="dropdownItemIcon">{{item.title}}</span>
          </MenuItem> -->
          <!--有二级菜单-->
          <!-- <MenuItem :name="item.path.split('/')[1]" v-if="item.children.length<=0">
            <router-link tag='span' :to="item.path + '/' + item.children[0].path"
                         style="display: inline-block;height:100%;width:100%">
              <Icon :type="item.icon" :size="iconSize" :key="item.path" style="width: 20px"/>
              <span class="dropdownItemIcon">{{item.title}}</span>
            </router-link>
          </MenuItem> -->
        <!-- </div>
      </MenuGroup>
    </Submenu>
  </div> -->

<!-- <script>
  export default {
    data() {
      return {
        iconSize: 14,
        //超过几个列表后显示下拉菜单 (前面有两个隐藏列，所以需要加上2)
        maxItem: 11
      }
    },
    computed: {
      currentPathArr() {
        return this.$store.state.app.routers;
        console.log(this.$store.state.app.routers)
      },
    }
  }
</script>



<!--顶部导航-->
<template>
  <div>
    <!-- 这里显示 index 小于 maxItem 的内容 -->
   <div v-for="(item,index) in menu" :href="item.uri" :key="item.uri.split('/')[1]"
         v-if="item.children"> 
      <!--这里设置一个长度大于了多少就下拉显示一级菜单-->
      <!-- <MenuItem :name="item.uri.split('/')[1]" > -->
        <!-- <Icon :type="item.icon" :size="iconSize" :key="item.uri"></Icon> -->
        <!-- {{item.muenName}} -->
        <!-- {{Object.keys(item.children).length}} -->
      <!-- </MenuItem> -->

    <!-- :name="item.path.split('/')[1]":控制导航栏左侧的字段 -->

      <MenuItem :name="item.uri.split('/')[1]" v-if="item.children && item.children.length>=0" >
        <router-link tag='span' :to="item.uri + '/' + item.children[0].uri"
                     style="display: inline-block;height:100%;width:100%">
          <Icon :type="icon" :size="iconSize" :key="item.uri"></Icon>
          {{item.muenName}}
        </router-link>
      </MenuItem>
    </div>

    <!-- 导航栏不受影响 -->
    <!-- <Submenu name="group" >
      <template slot="title">
        <Icon type="stats-bars"/> -->
        <!--其他内容-->
      <!-- </template>
      <MenuGroup title="列表">
        <div v-for="(item,index) in menuTree" :href="item.uri" :key="item.uri.split('/')[1]"
             v-if="!item.hidden && index >= maxItem"> -->
          <!--无二级菜单-->
          <!-- <MenuItem :name="item.uri.split('/')[1]">
            <Icon :type="item.icon" :size="iconSize" :key="item.uri" style="width: 20px"/>
            <span class="dropdownItemIcon">{{item.muenName}}</span>
          </MenuItem> -->
          <!--有二级菜单-->
          <!-- <MenuItem :name="item.uri.split('/')[1]" >
            <router-link tag='span' 
                         style="display: inline-block;height:100%;width:100%">
              <Icon :type="item.icon" :size="iconSize" :key="item.uri" style="width: 20px"/>
              <span class="dropdownItemIcon">{{item.muenName}}</span>
            </router-link>
          </MenuItem> -->
        <!-- </div>
      </MenuGroup>
    </Submenu> -->
  </div>
</template>
<script>
  export default {
    data() {
      return {
        icon: "speedometer",
        iconSize: 14,
        //超过几个列表后显示下拉菜单 (前面有两个隐藏列，所以需要加上2)
        maxItem: 11,
        // menuTree: JSON.parse(localStorage.getItem('menuTree'))
      }
    },
    methods:{
   
    },
    // mounted() {
    //   var menu= JSON.parse(localStorage.getItem('menu'));
    //   //myId,pId为随机定义的myId：主键（muenId）;pId: 父级（parentMuenId）；menu：后端返回的菜单数组链式
    //   //parentMuenId：后端返回数组的主键，
    //   //注意：myId和pId为随机定义的
    //   function list(myId,pId,menu){
    //     function exists(menu, parentMuenId){
    //       for(var i=0; i<menu.length; i++){
    //       if (menu[i][myId] == parentMuenId) return true;
    //       }
    //       return false;
    //     }

    //     var nodes = [];
    //     // get the top level nodes
    //     for(var i=0; i<menu.length; i++){
    //       var row = menu[i];
    //       if (!exists(menu, row[pId])){
    //       nodes.push(row);
    //       // console.log(nodes)
    //       }
    //     }
    //     var toDo = [];
    //     for(var i=0; i<nodes.length; i++){
    //       toDo.push(nodes[i]);
    //     }
    //     while(toDo.length){
    //       var node = toDo.shift(); // the parent node
    //       // get the children nodes
    //       for(var i=0; i<menu.length; i++){
    //       var row = menu[i];
    //       if (row[pId] == node[myId]){
    //         //var child = {id:row.id,text:row.name};
    //         if (node.children){
    //         node.children.push(row);
    //         } else {
    //         node.children = [row];
    //         }
    //         toDo.push(row);
    //       }
    //       }
    //     }
    //     return nodes;
    //     console.log(nodes)
    //   }
    //     var menuTree = list("muenid","parentMuenId",menu);
    //     var m = JSON.stringify(menuTree)
    //     localStorage.setItem('menuTree',m);
    //     //将菜单存储至本地
    //     var menuTree = JSON.parse(localStorage.getItem('menuTree'))
    //     console.log(menuTree)
    // },
      
    computed: {
      currentPathArr() {
        // console.log(1)
        return this.$store.state.app.routers;
        console.log(this.$store.state.app.routers)
        // console.log(2)
      },
      menu(){
        return this.$store.state.app.menuTree;
      }
     
      
    }
  }
</script>