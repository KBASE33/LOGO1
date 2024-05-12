<template>
    <div>
        <div class="container">
            <div class="message">
                <p style="margin-bottom: 0.4vh;">指导老师：张随雨</p>
                <p>团队成员</p>
                <p>桑菲阳 徐嘉杞 贾贝希 王紫茹 汪瑾</p>
                <p>李牧展 顾菁仪 宋鹏伟 张洛 杨云戈</p>
            </div>
            <VanButton @click="gotostart">开始生成我的LOGO</VanButton>
            <img src="@/assets/images/background.png"  style="height: 100vh;width: 100vw;" alt="">
            <img src="@/assets/images/logo.png"  style="position: absolute;left: 0;width: 80vw;margin: 0 2vw;" alt="">
            <img src="@/assets/images/title.png" style="position: absolute;top: 15vh; left: 14vw; width: 70vw; margin: 0 2vw;" alt="">
        </div>
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
.container {
  position: relative;
  display: flex;
  justify-content: center;
  /* align-items: center; */
  width: 100vw;
  height: 100vh;
}

.van-button{
    width: 65vw; 
    height:5.5vh;
    top: 65vh;
    font-size: 4vw;
    color: white;
    font-family: '方正黑体简体';
    font-weight: bold;
    border: none;
    border-radius: 10px;
    letter-spacing: 1vw;
    position: absolute;
    background-color: rgba(255, 255, 255, 0.312);

}
.container .message {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    bottom: 0;
    margin-bottom: 3vh;
}
.container .message p{
    font-family: '方正黑体简体';
    color: white;
    font-size: 2.5vw; 
    letter-spacing: 0.5vw;
    margin: 0.2vh 0;
}
</style>