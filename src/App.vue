<template>
  <div id="app" >
    <el-container  v-if="$route.meta.keepalive">
      <el-header class="">
        <keep-alive>
          <v_Navigation></v_Navigation>
        </keep-alive>
      </el-header>
      <el-container>
        <el-container>
          <el-main>
            <keep-alive>
              <router-view></router-view>
            </keep-alive>
          </el-main>
          <el-footer style=" padding-left: 0px;padding-right: 0px;">
            <!-- <v_footer></v_footer> -->
          </el-footer>
        </el-container>
      </el-container>
    </el-container>
    <router-view v-if="!$route.meta.keepalive"></router-view>
  </div>
</template>

<script>
// import LeftMenu from "./components/LeftMenu"
import Navigation from "./components/common/Navigation"
import Footer from './components/common/Footer'
export default {
  name: 'App',
  components: {
    'v_Navigation': Navigation,
    // 'v_leftmenu': LeftMenu,
    // 'v_footer': Footer
  }
}
</script>

<style>
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
 #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  .header{
    line-height: 60px;
    background-color: #545c64;
    /* text-color: white; */
  }
  .container{
    height: 100%;
  }
  /* *{
    border:1px solid black;
  } */
</style>
