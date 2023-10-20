<template>
  <JatContainer class="w-full h-full">
    <div class="flex p-20px gap-20px">
      <CommonBtn> 默认 </CommonBtn>
      <CommonBtn type="red"> 红色 </CommonBtn>
      <CommonBtn type="green"> 绿色 </CommonBtn>
      <CommonBtn type="purple"> 紫色 </CommonBtn>
      <CommonBtn type="orange"> 橘色</CommonBtn>
      <CommonBtn iconName="icon-icon-edit"> 图标 </CommonBtn>
      <CommonBtn iconName="icon-icon-edit" fill> 填充 </CommonBtn>
      <CommonBtn disabled iconName="icon-icon-edit">按钮禁用</CommonBtn>
      <CommonBtn loading iconName="icon-icon-edit">加载中</CommonBtn>
      <DropDownButton splitButton :dropDownList="dropDownList">
        下拉按钮
      </DropDownButton>
    </div>
  </JatContainer>
</template>
<script>
import { JatContainer, CommonBtn, DropDownButton } from "@jat-comps/components"
export default {
  name: "ButtonIndex",
  components: {
    JatContainer,
    CommonBtn,
    DropDownButton
  },
  data() {
    return {
      dropDownList: [
        { key: "export", name: "导出" },
        { key: "download", name: "下载" }
      ]
    }
  }
}
</script>
