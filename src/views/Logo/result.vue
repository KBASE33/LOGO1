<template>
    <div class="logoresult">
      <CommonHeader></CommonHeader>
      生成页
      <VanButton class="redraw">重新生成</VanButton>
      <VanButton class="backtohome" @click="backtohome">回到主页</VanButton>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import {ref} from 'vue'
import { useDrawStore } from "@/stores/drawStore";
import { showNotify, closeNotify } from 'vant';
import { useRouter } from 'vue-router';
let drawStore = useDrawStore();
const router=useRouter()
const backtohome=()=>{
  router.push("/")
}
</script>

<style scoped>
.van-button {
    width: 32.4vw;
    height: 9.72vw;
    font-size: 4vw;
    font-weight: bold;
    /* letter-spacing: 5px; */
    /* position: absolute;
    bottom: 13.888vw;
    border-radius: 1vw; */
    /* top: 730px; */
    border:0.5vw solid #4768FF;



}

.redraw {
    /* background-color: #E3E3E3; */
    color: #4768FF;
    /* left: 10.42vw; */



}


.backtohome {
    background-color: #4768FF;
    color: white;
    /* right: 10.42vw; */
    /* bottom: 85px; */



}
</style>