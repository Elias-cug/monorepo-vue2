<template>
  <div class="loadingComponentBox">
    <div class="imgContent">
      <img src="../../assets/img/loading.jpg" alt="" />
      <div class="loadingMsg">数据正在加载中...</div>
    </div>
  </div>
</template>
<style lang="less">
.loadingComponentBox {
  position: absolute;
  top: 0;
  z-index: 9999;
  width: 100%;
  height: 100%;
  margin: 0;
  background-color: rgb(255 255 255 / 90%);
  transition: opacity 0.3s;

  .imgContent {
    position: absolute;
    top: 15%;

    /* line-height: 30%; */
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 70%;
    text-align: center;

    img {
      height: 100%;
    }

    .loadingMsg {
      position: absolute;
      bottom: 20%;
      left: 50%;
      margin-left: 25px;
      text-align: center;
      transform: translateX(-50%);
    }
  }
}
</style>
