<template>
  <div>
    <svg
      width="16px"
      height="12px"
      viewBox="0 0 16 12"
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
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <g
          id="02全部模型-列表收起"
          transform="translate(-1388.000000, -163.000000)"
          stroke="#167CF3"
        >
          <g
            id=""
            transform="translate(1396.000000, 169.269043) scale(1, -1) translate(-1396.000000, -169.269043) translate(1389.000000, 164.000000)"
          >
            <polyline
              id="路径-2"
              points="14 10.5380859 7 3.47973633 0 10.5380859"
            ></polyline>
            <line
              x1="-6.91309972e-13"
              y1="0.5"
              x2="14"
              y2="0.5"
              id="路径-3"
            ></line>
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
    rotate: [String, Number]
  }
}
</script>
