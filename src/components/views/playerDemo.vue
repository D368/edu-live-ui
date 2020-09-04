<template>
  <el-row :gutter="20" type="flex">
    <el-col :span="12" :offset="3">
      <div ref="playerBox" class>
        <video-player
          class="video-player vjs-custom-skin"
          ref="VideoPlayer"
          :playsinline="true"
          :options="playerOptions"
          style="width: 100%;margin:0 auto;height: auto"
        ></video-player>
      </div>
      <div style="display:flex;margin-top:20px">
       <el-input v-model="input" placeholder="请输入内容"></el-input>
       <el-button type="primary" @click="send">发送</el-button>
      </div>
    </el-col>
    <el-col :span="6" :offset="0">
      <div>
        <div class="message-box" :style="{height:playerHeight}">
          <!-- <div class="infinite-list-wrapper" style="overflow:auto"> -->
          <!-- <ul class="list" v-infinite-scroll="load" infinite-scroll-disabled="disabled"> -->
          <el-scrollbar ref="messageScrollbar" style="height: 100%;">
            <li v-for="item in contentList" class="list-item" :key="item.id">
              <el-tag effect="plain" type="info">{{ item.name}}：{{ item.text }}</el-tag>
            </li>
          </el-scrollbar>
          <!-- </ul> -->
          <!-- <p v-if="loading">加载中...</p> -->
          <!-- <p v-if="noMore">没有更多了</p> -->
        </div>
      </div>
    </el-col>  
  </el-row>
</template>

<script>
// import 'video.js/dist/video-js.css'
// import {videoPlayer} from 'vue-video-player'
// import SWF_URL from '../../static/video-js.swf'
// import 'videojs-flash'
export default {
  data() {
    //这里存放数据
    return {
      count: 10,
      loading: false,
      contentList: [],
      playerHeight: "",
      playerOptions: {
        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        // fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: "application/x-mpegURL", //这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
            src: "http://121.36.228.230:8080/hls/test.m3u8", //url地址
          },
        ],
        hls: true, //如果是播放m3u8必须加（需注释掉techOrder,不然会有报错）
        // techOrder: ['flash'], //播放rtmp必须加
        poster: "", //你的封面地址
        notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true, //全屏按钮
        },
      },
      path: "ws://127.0.0.1:8099/edu/test/admin",
      socket: "",
      input:''
    };
  },
  //监听属性 类似于data概念
  computed: {
    noMore() {
      return this.count >= 20;
    },
    disabled() {
      return this.loading || this.noMore;
    },
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    load() {
      this.loading = true;
      setTimeout(() => {
        this.count += 2;
        this.loading = false;
      }, 2000);
    },
    addItem(msg) {
      let key = Math.floor(Math.random() * 1000000000);
      this.contentList.push({ id: key, name: "jack", text: msg });
      this.scrollBottom();
    },
    scrollBottom() {
      this.$nextTick(function () {
        this.$refs["messageScrollbar"].wrap.scrollTop = this.$refs[
          "messageScrollbar"
        ].wrap.scrollHeight;
      });
    },
    init: function () {
      if (typeof WebSocket === "undefined") {
        alert("您的浏览器不支持socket");
      } else {
        // 实例化socket
        this.socket = new WebSocket(this.path);
        // 监听socket连接
        this.socket.onopen = this.open;
        // 监听socket错误信息
        this.socket.onerror = this.error;
        // 监听socket消息
        this.socket.onmessage = this.getMessage;
      }
    },
    open: function () {
      console.log("socket连接成功");
    },
    error: function () {
      console.log("连接错误");
    },
    getMessage: function (msg) {
      console.log(msg.data);
      this.addItem(msg.data);
      console.log(msg);
    },
    send: function () {
      this.socket.send(this.input);
      this.scrollBottom();
    },
    close: function () {
      console.log("socket已经关闭");
    },
  },
  mounted() {
    this.playerHeight = window.getComputedStyle(this.$refs.playerBox).height;
    // 初始化
    this.init()
  },
  destroyed() {
    // 销毁监听
    this.socket.onclose = this.close;
  },
};
</script>
<style scoped>
.message-box {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  width: 100%;
  overflow: hidden;
}
.message-box > .el-scrollbar__wrap {
  overflow-x: hidden;
}
.list-item {
  border-radius: 5px;
  margin: 10px;
  display: flex;
  align-items: left;;
  
  justify-content: left;
  /* height: 50px; */
  margin-top: 10px;
  /* background: #e8f3fe; */
  /* color: black; */
}
</style>
