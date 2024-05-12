<template>
    <div>
        <p>主页面</p>
        <VanButton @click="gotostart">开始生成我的LOGO</VanButton>
       
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import useUserStore from "@/stores/userStore";
let userStore=useUserStore()
// import router from '@/router';
const router=useRouter()

const gotostart=()=>{
    router.push("/logo")
}

</script>

<style scoped>


.van-button{
    width: 64.35vw; 
    height:9.72vw;
    font-size: 6vw;
    /* letter-spacing: 4px; */
    position: absolute;
    /* left: 50%; */
    /* margin-left: -50px;
    top: 314px;
    border-radius: 9px; */
    /* box-shadow: 2px -2px  #B12ECA ,-2px 2px #090016; */


}

</style>