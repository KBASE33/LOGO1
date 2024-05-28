<template>
    <div class="logomain" @contextmenu.prevent>
        <CommonHeader></CommonHeader>
        标签选择页
        <div v-if="nowStep === 1">第一步</div>
        <div v-if="nowStep === 2">第二步</div>
        <div v-if="nowStep === 3">第三步</div>
        <div v-if="nowStep === 4">第四步</div>
        <PageChangeComp :nowStep="nowStep" :total-steps="4" @change-step="handleStep" @start-create="handleCreate">
        </PageChangeComp>

    </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from 'axios';
import { postGenerateApi } from "@/api/generateApi";
import { getBlob } from "@/utils/getblob.js";
import { ElLoading } from "element-plus";
import { onMounted } from "vue";
import { getViewApi } from "@/api/userApi";
import { useDrawStore } from "@/stores/drawStore";
import { showNotify } from "vant";
import { fa } from "element-plus/es/locales.mjs";
import { addNumber } from "vant/lib/utils";
const drawStore = useDrawStore();
const router = useRouter();

let nowStep = ref(2);

const handleStep = (mystep) => {

    // mystep的值为-1或1,对应改变nowStep的值
    console.log("mystep", mystep);
    nowStep.value += mystep;
    if (nowStep.value == 1 && mystep == -1) {
        //   window.location.reload();
        router.push('/logo')
    }
}


// 点击生成与后端交互
const handleCreate = () => {
    router.push('/logo/view')
    // let myweight = 0.6
    // //  不存在图片weight就为0
    // // 如果有自定义颜色,添加到颜色数组
    // if (mycolor.value) {
    //   selectedName3.value.push(mycolor.value);
    // }

    // var fd = new FormData();

    // fd.append("logoKeys", logokeysarr.value);
    // fd.append("language", "chinese simplified");
    // fd.append("weight", myweight);
    // fd.append("prompt", "Custom_Logo");
    // fd.append("client", "cuz");
    // // getViewApi({prompt_id: "64e8f292-3db5-41cc-b9fa-b37a4e128450", client_id: "client_id_argv" })
    // // .then((res)=>console.log(res))
    // console.log("执行生成逻辑", bodyImg, logokeysarr.value);
    // postGenerateApi(fd, { product: "logo" })
    //   .then((postres) => {
    //     console.log("posterupload res", postres);

    //     const intervalId = setInterval(() => {
    //       if (calledGetViewApi.value) {
    //         console.log("calledGetViewApi", calledGetViewApi.value);

    //         getViewApi({ prompt_id: postres.prompt_id, client_id: "cuz" })
    //           .then((response) => {
    //             console.log("view res", response);
    //             if (response.statusCode === 200) {
    //               console.log("绘图成功", response);

    //               const keys = Object.keys(response.data); // 获取对象的所有键
    //               const firstKey = keys[0]; // 获取数组中的第一个键
    //               const secondKey = keys[1]; // 获取数组中的第一个键
    //               const imgurl1 = response.data[firstKey]; // 获取第一个键对应的值
    //               const imgurl2 = response.data[secondKey]; // 获取第一个键对应的值
    //               console.log("imgurl,", imgurl1, imgurl2);
    //               drawStore.logoimgurl1 = imgurl1;
    //               drawStore.logoimgurl2 = imgurl2;

    //               loadingInstance.close();
    //               calledGetViewApi.value = false;

    //               clearInterval(intervalId);
    //               router.push("/logo/view");
    //             } else if (response.statusCode === 400) {
    //               console.log("等待绘图中...");
    //             } else {
    //               console.log("绘图失败");
    //               loadingInstance.close();
    //               // calledGetViewApi.value = false

    //               clearInterval(intervalId);
    //               showNotify({ type: "danger", message: "绘图失败,请重试" });

    //             }
    //           })
    //           .catch((error) => {
    //             console.error("获取绘图数据失败:", error);
    //             loadingInstance.close();
    //             clearInterval(intervalId);
    //             // showNotify({ type: "danger", message: "网络错误" });

    //             // calledGetViewApi.value = false

    //             // setTimeout(()=>{
    //             //     router.push("/")
    //             // },1000)
    //           });
    //       }
    //     }, 2000);
    //   })
    //   .catch((error) => {
    //     console.error("获取上传数据失败:", error);
    //     showNotify({ type: "danger", message: "网络错误" });
    //     loadingInstance.close();
    //   });
};

</script>

<style lang="scss" scoped></style>