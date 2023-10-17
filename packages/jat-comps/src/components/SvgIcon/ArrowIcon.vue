<template>
  <div>
    <svg
      width="19px"
      height="19px"
      viewBox="0 0 19 19"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      :style="{ transform: `rotate(${rotate}deg)` }"
    >
      <g
        id="0802-分析模型管理"
        stroke="none"
        stroke-width="1"
        fill="none"
        fill-rule="evenodd"
      >
        <g
          id="01全部模型-列表展开"
          transform="translate(-384.000000, -114.000000)"
        >
          <g id="icon-展开" transform="translate(384.000000, 114.000000)">
            <rect
              id="矩形"
              fill="#000000"
              fill-rule="nonzero"
              opacity="0"
              x="0"
              y="0"
              width="19"
              height="19"
            ></rect>
            <g
              id="编组-9"
              transform="translate(3.000000, 3.500000)"
              stroke="#167CF3"
              stroke-width="1.6"
            >
              <polyline
                id="路径"
                transform="translate(6.500000, 3.000000) scale(1, -1) translate(-6.500000, -3.000000) "
                points="0 6 6.5 0 13 6"
              ></polyline>
              <polyline
                id="路径备份"
                transform="translate(6.500000, 8.500000) scale(1, -1) translate(-6.500000, -8.500000) "
                points="0 11.5 6.5 5.5 13 11.5"
              ></polyline>
            </g>
          </g>
        </g>
      </g>
    </svg>
  </div>
</template>
<script>
export default {
  name: "ExpandIcon",
  props: {
    rotate: Number
  }
}
</script>
