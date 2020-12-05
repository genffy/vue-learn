<template>
  <ul class="tree-container">
    <li v-for="item in data" :key="item.value">
      <div @click="handleClickNode(item)">
        <span @click.stop.prevent="handleCheckedNode(item, $event)">
          <el-checkbox v-model="item.checked" />
        </span>
        <span>{{ item.label }}</span>
        <span v-if="item.children && item.children.length">（{{ item.children.length }}）</span>
        <span style="float: right; color: rgba(0, 0, 0, 0.26); margin-right: 20px" v-if="item.children && item.children.length">
          <i class="el-icon-arrow-up" v-if="item.expand"></i>
          <i class="el-icon-arrow-down" v-else></i>
        </span>
      </div>
      <template v-if="item.children && item.children.length && item.expand">
        <tree :data="item.children" :parent="item" ref="tree"/>
      </template>
    </li>
  </ul>
</template>

<script>
export default {
  name: "tree",
  componentName: "treeNode",
  data() {
    return {
      checkedList: [],
    };
  },
  props: {
    data: {
      type: Array,
      required: true,
    },
    parent: {
      type: Object,
      default: () => {
        return {}
      }
    },
  },
  methods: {
    handleClickNode(item) {
      console.log('item.expand', JSON.stringify(item.expand));
      item.expand = !item.expand;
    },
    handleCheckedNode(item) {
      item.checked = !item.checked;
      //子节点是否选中
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
      //父节点是否选中
      if (this.parent) {
        this.checkedParent(item);
      }
    },
    // 处理数据逻辑就好了，为啥还处理了dom。。。
    checkedParent(item) {
      let that = this;
      console.log('that.parent', that.parent);
      if (!item.checked) {
        // eslint-disable-next-line no-debugger
        while (that && that.$options.componentName === "treeNode") {
          (that.parent.checked != undefined) && (that.parent.checked = false);
          that = that.$parent;
        }
      } else {
        while (that && that.$options.componentName === "treeNode") {
          if (
            that.parent &&
            that.parent.children &&
            that.parent.children.every((item) => item.checked === true)
          ) {
            that.parent.checked = true;
          }
          that = that.$parent;
        }
      }
    },
  },
};
</script>

<style scoped lang="less">
.tree-container {
  padding-left: 15px;
  list-style: none;
  li {
    > div {
      width: 100%;
      border-bottom: 1px solid rgba(0, 0, 0, 0.14);
      cursor: pointer;
      line-height: 50px;
      height: 50px;
      > span {
        margin-left: 20px;
      }
    }
  }
}
</style>