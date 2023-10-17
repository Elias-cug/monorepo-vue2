export default {
  data() {
    return {
      minix_window_size: { width: 0, height: 0 }
    }
  },
  methods: {
    windowSize() {
      const width = document.documentElement.getBoundingClientRect().width
      const height = document.documentElement.getBoundingClientRect().height
      this.minix_window_size = {
        width,
        height
      }
    }
  },
  mounted() {
    this.windowSize()
    window.addEventListener("resize", this.windowSize)
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.windowSize)
  }
}
