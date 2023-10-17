<template>
  <div id="anchorPoint" class="anchor-point flex flex-col mb--12px">
    <div
      class="cursor-pointer mb-12px"
      v-for="o in data"
      :key="o.id"
      @click="onClick(o)"
      :class="{ active: o.id === activeItem }"
    >
      {{ o.title }}
    </div>
  </div>
</template>
<script>
export default {
  name: "AchorPoint",
  props: {
    data: {
      type: Array,
      default: () => []
    },
    pid: {
      type: String
    }
  },
  data() {
    return {
      pEle: null,
      scrollStatus: false,
      activeItem: this.data[0].id
    }
  },
  methods: {
    onClick(item) {
      this.scrollStatus = false
      const ele = document.querySelector(`#${item.id}`)
      ele.scrollIntoView(true)
      document.querySelector(".admin-layout").scrollTop = 0
      this.activeItem = item.id
    },
    onScroll() {
      let scrollTop = this.pEle.scrollTop
      let clientHeight = this.pEle.clientHeight
      let scrollHeight = this.pEle.scrollHeight
      if (this.scrollStatus) {
        this.data.forEach((item) => {
          if (scrollTop >= document.getElementById(item.id).offsetTop) {
            this.activeItem = item.id
          }
        })
        if (scrollTop + clientHeight >= scrollHeight) {
          this.activeItem = this.data[this.data.length - 1].id
        }
      } else {
        this.scrollStatus = true
      }
    }
  },
  mounted() {
    this.pEle = document.querySelector(`#${this.pid}`)
    this.pEle.addEventListener("scroll", this.onScroll)
  },
  beforeDestroy() {
    this.pEle.addEventListener("scroll", this.onScroll)
  }
}
</script>
<style scoped lang="less">
.anchor-point {
  position: fixed;
  right: 30px;
  top: 100px;
  padding: 20px 12px 8px 12px;
  background: #ffffff;
  box-shadow: 0px 0px 6px 0px rgba(228, 230, 238, 1);
  border-radius: 4px;
  font-size: 14px;
  .active {
    position: relative;
    color: #167cf3;
    &::before {
      position: absolute;
      content: "";
      top: 2px;
      left: -10px;
      width: 2px;
      height: 14px;
      background-image: linear-gradient(180deg, #1c83fb 0%, #0054b7 100%);
    }
  }
}
</style>
