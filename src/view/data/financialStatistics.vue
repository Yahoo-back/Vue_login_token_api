<style lang="less">
    @import '../../styles/common.less';
    // @import './components/table.less';
		// 产品访问数据统计
		.main .single-page-con {
			background: #fff;
		}
</style>
<template>
  <div id="app">
		<Card>
			<p slot="title">
        <Icon type="help-buoy"></Icon>
        财务统计
      </p>
      <Row>
        <div class="demo-input-suffix">
           来源：
          <el-select v-model="source" placeholder="请选择" style="width:100px">
            <el-option  value="">请选择</el-option> 
            <el-option v-for="item in rows" :label="item.source" :value="item.source" :key="item.source">{{ item.source }}</el-option>
          </el-select>
        	请选择日期:
          <el-date-picker
            v-model="createTime"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right">
          </el-date-picker>
          <el-button @click="handleView" type="primary" size="small" style="margin-left: 20px">查询</el-button>
        </div>
      </Row>
      <div style="margin-top: 20px">
        <el-table
          :data="historyData"
          border
          style="width: 100%; align: center">
          <el-table-column
            label="序号"
            type="index"
						align="center"
						width="100">
          </el-table-column>
          <el-table-column
            prop="source"
            sortable
						align="center"
            label="来源">
          </el-table-column>
          <el-table-column
            prop="cpaPay"
            sortable
						align="center"
            label="CPA金额（缩量后注册人数 x 渠道CPA）">
          </el-table-column>
          <el-table-column
            prop="uvPay"
            sortable
						align="center"
            label="uvCPA金额（缩量后uv人数 x 渠道CPA）">
          </el-table-column>
          <el-table-column
            prop="withholdPay"
            sortable
						align="center"
            label="已扣款金额">
          </el-table-column>
          <el-table-column
            prop="clickPay"
            sortable
						align="center"
            label="点击CPA金额（点击次数 x 商品CPA）">
          </el-table-column>
          <el-table-column
            prop="payPercent"
            sortable
						align="center"
            label="扣款转化率（已扣款金额 / 应扣款金额）">
          </el-table-column>
          <el-table-column
            prop="cpaPercent"
            sortable
						align="center"
            label="CPA转化率（CPA金额 或 uvCPA金额 / 已扣款金额）">
          </el-table-column>
          <el-table-column
            prop="profit"
            sortable
						align="center"
            label="利润（点击CPA金额 + 已扣款金额 - CPA金额）">
          </el-table-column>
        </el-table>
      </div>
			<!-- <Table :columns="historyColumns" :data="historyData" class="table"></Table> -->
			<Page :total="dataCount" :page-size="pageSize" show-total class="paging" @on-change="changepage"></Page>
		</Card>
  </div>
</template>
<style scoped>
  .paging{
    float:right;
    margin-top:30px;
	}
	.table{
		margin-top: 30px;
	}
</style>
<script>
import * as table from './data/table';
  export default {
      data () {
        return {
          dialogVisibleNo: false,
          createTime: '',
          source: '',
          rows: [
            {
              source: 'android'
            },
            {
              source: 'ios'
            }
          ],
          city : [
            {
              value: 'beijing',
              label: '北京市'
            },
            {
              value: 'shanghai',
              label: '上海市'
            },
            {
              value: 'shenzhen',
              label: '深圳市'
            },
          ],
          status: '',
          status1: '',
          searchProductName: '',
          // historyColumns: table.historyColumns,
          historyData: [],
          initialProduct: [],
          ajaxHistoryData:[],
          // 初始化信息总条数
          dataCount:0,
          // 每页显示多少条
          pageSize:10,
        }
    },
    methods:{
			init () {
				this.historyData = this.initialProduct =  table.financial;
				this.status1 = table.status1;
      },
       handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      // 获取历史记录信息
      handleListApproveHistory(){
        // 保存取到的所有数据
        this.ajaxHistoryData = table.financial
        this.dataCount = table.financial.length;
        // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
        if(table.financial.length < this.pageSize){
          this.historyData = this.ajaxHistoryData;
        }else{
          this.historyData = this.ajaxHistoryData.slice(0,this.pageSize);
        }
      },
      changepage(index){
        var _start = ( index - 1 ) * this.pageSize;
        var _end = index * this.pageSize;
        this.historyData = this.ajaxHistoryData.slice(_start,_end);
			},
			handleSearchProductName() {
				this.historyData = this.initialProduct;
        this.historyData = this.search(this.historyData, {name: this.searchProductName});
      },
      handleView() {
        this.$router.push({ path:'/customer/list/customerInfo'  })
      }
    },
    created(){
      this.handleListApproveHistory();
    }
  }
</script>
