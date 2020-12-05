<template>
  <div>
    <!-- <el-cascader
      :options="options"
      v-model="selectedOptions"
      @change="handleChange">
    </el-cascader> -->

    <dtsTree ref="dtsTree" :type="'sellerId'" :data="options" @done="handleDone"/>
    <el-button @click="openChoose">打开选择框</el-button>
  </div>
</template>
<script>
/* eslint-disable no-unused-vars */
import dts from './data-dts';
import bdts from './data-bdts';
import dtsTree from '../components/dts-tree/index';
const map = {
  1: "buId",
  2: "districtId",
  3: "teamId",
  4: "sellerId",
};
var recursiveFunction = function(data){
  const getStr = function(list, floor = 1){
    list.forEach(function(row){
      row.checked = false;
      row.floor = map[floor];
      if(row.children){
        row.expand = false;
        getStr(row.children, floor + 1)
      }
    })
  }
  getStr(data);
  return data;
}

export default {
  components: {
    dtsTree
  },
  data() {
    return {
      options: [], //bdts.data,
      selectedOptions: [],
      chooseData: {},
    }
  },
  methods: {
    handleChange(value) {
      console.log(value);
    },
    handleDone(data) {
      this.chooseData = data;
      console.log(data);
    },
    openChoose() {
      this.$refs['dtsTree'].open([
        {districtId: '31'},
        {teamId: '36'},
        {sellerId: '12'},
        {buId: '2'},
      ]);
    }
  },
  mounted() {
    // 预处理数据
    // eslint-disable-next-line no-unused-vars
    // const ckData = recursiveFunction(dts.data);
    const bdtsData = recursiveFunction([
		{
			"children":[
				{
					"children":[
						{
							"children":[
								{
									"children":null,
									"label":"兰兰(T3333)",
									"value":"12"
                },
                {
									"children":null,
									"label":"兰兰(T3333)",
									"value":"12"
                },
                {
									"children":null,
									"label":"兰兰(T3333)",
									"value":"12"
								}
							],
							"label":"叶老师新人组",
							"value":"62"
						}
					],
					"label":"大区涵涵",
					"value":"123322"
        },
        {
          "children":null,
          "label":"兰兰(T3333)",
          "value":"12"
        },
        {
          "children":null,
          "label":"兰兰(T3333)",
          "value":"12"
        }
			],
			"label":"一对一",
			"value":"1"
		}
	]);
    this.options = bdtsData;
    console.log('ckData', bdtsData);
  },
}
</script>