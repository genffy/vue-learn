<template>
  <!-- <el-dialog
    :visible.sync="visible"
    title="新建排行榜"
    :modal-append-to-body="false"
    width="900px"
  > -->
  <div class="leader-board">
    <div class="body">
      <div>
        <tree :data="organization" ref="tree" />
      </div>
      <div>
        <ul class="list">
          <template v-for="(item, index) in organization">
            <li v-if="showLabel(item)" :key="index">
              <div v-for="(i, key) in showLabel(item)" :key="key">
                <span>{{ i.label }}</span>
                <span @click="handleClose(i.value, item)"
                  ><i class="el-icon-close"></i
                ></span>
              </div>
            </li>
          </template>
        </ul>
      </div>
    </div>
    <div style="text-align: center" slot="footer">
      <el-button type="primary" @click="handleConfirm">确定</el-button>
    </div>
  </div>
  <!-- </el-dialog> -->
</template>

<script>
import Tree from "./tree";

const map = {
  1: "buId",
  2: "districtId",
  3: "teamId",
  4: "sellerId",
};
export default {
  name: "leaderBoard",
  componentName: "leaderBoard",
  components: { Tree },
  data() {
    return {
      visible: false,
      // organization: [],
      checkedList: [],
      timer: null,
      total: 0,
    };
  },
  props: {
    type: {
      type: String,
      default: '',
    },
    data: {
      type: Array,
      required: true,
      default: () => {
        return [];
      }
    },
    checked: {
      type: Array,
      default: ()=>{
        return [];
      }
    }
  },
  computed: {
    organization() {
      return this.data;
    }
  },
  watch: {
    data(val) {
      // 构建map
      // eslint-disable-next-line no-unused-vars
      const pathMap = {};
      // // 深度遍历
      // const DFS = (data, floor = 1, pathArr=[]) => {
      //   data.forEach((item, idx) => {
      //     // 去掉多余的
      //     pathArr.splice(floor);
      //     item.checked = false;
      //     item.expand = false;
      //     item.floor = map[floor]; 
      //     pathArr[floor-1] = idx;
      //     const path = pathArr.join('-');
      //     pathMap[path] = item.value;
      //     console.log('path', path);
      //     if (item.children && item.children.length) {
      //       DFS(item.children, floor + 1, pathArr);
      //     }
      //   });
      // };
      // DFS(val);
      // console.log(val);
      // console.log(pathMap['0-0-1']);
      // console.log(pathMap['0-0-0']);
      // console.log(pathMap['1-0-0-2']);
      // 广度遍历
      // 广度遍历, 创建一个执行队列, 当队列为空的时候则结束
      function BFS(data) {
        let queue = data;
        let floor = 0;
        let pathArr = [];
        while (queue.length > 0) {
          floor++;
          [...queue].forEach((item, idx) => {
            queue.shift();
            // do stuff
            item.checked = false;
            item.expand = false;
            item.floor = map[floor];
            pathArr[floor-1] = idx;
            const path = pathArr.join('-');
            pathMap[path] = item.value;
            console.log(item.floor, path);
            if(item.children && item.children.length > 0){
              console.log(item.children.length);
              queue.push(...item.children);
            }
          });
        }
      }
      BFS(val);
    }
  },
  methods: {
    handleConfirm() {
      this.checkedList = [];
      let total = 0;
      const fn = (data) => {
        data.forEach((i) => {
          if (i.checked) {
            this.checkedList.push({
              [i.floor]: i.value,
            });
          } else {
            if (i.children && i.children.length) {
              fn(i.children);
            }
          }
        });
      };
      fn(this.organization);
      const computed = (data) => {
        data.forEach((item) => {
          if (item.children && item.children.length) {
            computed(item.children);
          } else {
            if (item.checked) {
              total++;
            }
          }
        });
      };
      computed(this.organization);
      this.total = total;
      this.visible = false;
      // console.log('this.checkedList', this.checkedList);
      this.$emit('done', {
        data: this.checkedList,
        total,
      });
    },
    handleClose(item) {
      item.checked = !item.checked;
      if (item.children && item.children.length) {
        const checked = (i) => {
          i.forEach((m) => {
            m.checked = item.checked;
            if (m.children && m.children.length) {
              checked(m.children);
            }
          });
        };
        checked(item.children);
      }
    },
    processData(data) {
      const checkedOrganization = (data, floor = 1) => {
        data.forEach((item) => {
          item.checked = false;
          item.expand = false;
          item.floor = map[floor];
          // item.parent = parent;
          // if (
          //   (this.type === "teamList" && floor === 3) ||
          //   (this.type === "regionList" && floor === 2)
          // ) {
          //   item.children = null;
          // }
          if (item.children && item.children.length) {
            checkedOrganization(item.children, floor + 1);
          }
        });
      };
      checkedOrganization(data);
      this.organization = data;
      console.log('this.organization', this.organization);
    },
    showLabel(item) {
      const checkedList = [];
      const fn = (i) => {
        if (i.checked) {
          const label =
            i.label + (i.children ? `（${i.children.length}）` : "");
          checkedList.push({
            label,
            value: i,
          });
        } else {
          if (i.children && i.children.length) {
            i.children.forEach((m) => {
              fn(m);
            });
          }
        }
      };
      fn(item);
      return checkedList;
    },
    open(initData = []) {
      this.visible = true;
      console.log(initData);
    }
  },
  mounted(){
    // this.visible = true;
  }
};
</script>

<style scoped lang="less">
.leader-board {
  .el-tree {
    border: none;
  }
  .body {
    display: flex;
    // max-height: 50vh;
    overflow: auto;
    & > div {
      flex: 1;
    }
  }

  .list {
    margin-left: 25px;
    list-style: none;
    li {
      > div {
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 2px;

        > span:first-child {
          background: rgba(24, 144, 255, 0.12);
          border: 1px solid rgba(24, 144, 255, 0.24);
          padding: 5px 10px;
        }
      }
    }
  }

  .el-icon-close {
    background: #1890ff;
    color: #fff;
    border-radius: 50%;
    padding: 5px;
    cursor: pointer;
  }
}
</style>