<template>
  <div class="logomain" @contextmenu.prevent>
    <CommonHeader></CommonHeader>
    <div v-if="nowStep===1">
      <div class="message-box">
        <p class="message-box-text">请向我描述您所需的logo模样。</p>
      </div>
      <p class="example-title">案例参考</p>
      <p class="example-text">小鸭子坐在火车上&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;三层简约蛋糕切片
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;三文鱼和叉子
        <br>小猫坐在船上，旁边散落一些花瓣</p>
      <div class="transcription-box" v-if="transcription !== ''">
        <div id="transcription" class="record">
          <span class="record-text">{{ transcription }}</span>
        </div>
      </div>
      <div class="ripple-container" v-if="showRipple">
        <div class="ripple"></div>
      </div>
      <img ref="recordButton" @touchstart="startRecording" @touchend="stopRecording" src="@/assets/images/voice.png" class="record-button"/>
    </div>
    <div v-if="nowStep===2">
      <div class="message-box">
        <p class="message-box-text">常用标签预设推荐，如果合适请勾选。</p>
      </div>
      <div class="item-container1">
              <div v-for="item in gridItems1" :key="item.name" class="xuanxiang1" @click="handleClick(item.name, 1)"
                :class="{ selected: selectedName1 === item.name }">
                {{ item.name }}
              </div>
            </div>
    </div>
    <div v-if="nowStep===3">第三步</div>
    <div v-if="nowStep===4">第四步</div>
    <PageChangeComp :nowStep="nowStep" :total-steps="4" @change-step="handleStep" @start-create="handleCreate" v-if="button"></PageChangeComp>

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
const router = useRouter();
import { showNotify } from "vant";
import { fa } from "element-plus/es/locales.mjs";
import { addNumber } from "vant/lib/utils";

//创建第一个网格数据
const gridItems1 = ref([
  { name: "三维" },
  { name: "简易" },
  { name: "抽象" },
  { name: "塔罗牌" },
  { name: "水彩" },
]);

const gridItems4 = ref([
  { name: "复古风格" },
  { name: "卡通" },
  { name: "油画" },
  { name: "新艺术运动" },
  { name: "单色" },
  { name: "剪影" },
  { name: "强阴影" },
])
const selectedName1 = ref(null);
//创建第二个网络数据
const gridItems2 = ref([
  { name: "红色" },
  { name: "橙色" },
  { name: "黄色" },
  { name: "绿色" },
  { name: "蓝色" },
  { name: "紫色" },
  { name: "黑色" },
  { name: "棕色" },
  { name: "粉色" },
  { name: "金色" },
  { name: "银色" },
  { name: "白色" },
]);
const selectedName2 = ref(null);
//创建第三个网络数据
const gridItems3 = ref([
  { name: "猫" },
  { name: "云" },
  { name: "狗" },
  { name: "剑" },
  { name: "树" },
  { name: "鸟" },
  { name: "拳" },
  { name: "花" },
  { name: "猴子" },
  { name: "火箭" },
  { name: "太阳" },
  { name: "月亮" },
]);
const selectedName3 = ref(null);

const drawStore = useDrawStore();
let nowStep = ref(2);
let showRipple = ref(false);
const handleStep = (mystep) => {
  
  // mystep的值为-1或1,对应改变nowStep的值
  console.log("mystep", mystep);
  nowStep.value += mystep;
  if(nowStep.value==1 && mystep==-1){
    window.location.reload();
  }
}


//录音设置
const recordButton = ref(false);
const transcription = ref('');
const showTranscription = ref(false);
let recognition = new webkitSpeechRecognition();
recognition.lang = 'zh-CN'; // 设置语言为中文

let button = false;
let lastTranscription = '';

const API_URL = `http://10.45.8.111:5003/RealTimeTranscript`;

// 初始化MediaRecorder（录音功能）
let mediaRecorder;
let recordedChunks = [];

navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
  mediaRecorder = new MediaRecorder(stream);
  mediaRecorder.addEventListener('dataavailable', (event) => {
    recordedChunks.push(event.data);
  });
});

const startRecording = () => {
  showTranscription.value = true;
  transcription.value = '......';
  showRipple.value = true;
  
  if (!mediaRecorder) {
    console.error('MediaRecorder not initialized');
	showRipple.value = false;
    return;
  }
  mediaRecorder.start();
};

const stopRecording = () => {
  showRipple.value = false;

  if (mediaRecorder) {
    mediaRecorder.stop();
    const audioBlob = new Blob(recordedChunks, { type: 'audio/wav' });
    recordedChunks = [];

    // 发送POST请求
    const formData = new FormData();
    formData.append('file', audioBlob, 'recording.wav');

    axios.post(API_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => {
      // 处理响应数据 
      const transcript = response.data.transcript;
      transcription.value = transcript;
      lastTranscription = transcript;
      button = true;
      recordButton.value.style.display = "none";
    })
    .catch((error) => {
      // 处理错误
      console.error('语音识别请求失败:', error);
      transcription.value = '发生错误，请重试。';
      showRipple.value = false;
    });
  }

  if (lastTranscription.trim() === '') {
    showTranscription.value = false;
  }
};


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

<style lang="scss" scoped>

.message-box{
box-sizing: border-box;
height: 20vw;
width: 60vw;
margin-left: 5vw;
margin-top: 2vw;
border: 1px solid #464646;
box-shadow: 0px 2px 3.1px 2px rgba(0, 0, 0, 0.11);
border-radius: 0px 15px 15px 15px;
}

.message-box-text{
width: 55vw;
height: 30vw;
padding: 3.5vw;
font-family: 'Source Han Sans CN VF';
font-style: normal;
font-weight: bold;
font-size: 4vw;
line-height: 6vw;
letter-spacing: 0.1vw;
color: #585858;
}

.example-title{
margin-left: 6.5vw;
margin-top: 1.5vw;
font-family: 'Inter';
font-style: normal;
font-size: 2.5vw;
line-height: 6vw;
letter-spacing: 0.1vw;
color: #4D4D4D;
}

.example-text{
margin-left:7.5vw;
margin-top: -0.5vw;
font-family: 'Source Han Sans CN VF';
font-style: normal;
font-size: 2.5vw;
line-height: 6vw;
letter-spacing: 0.1vw;
color: #252525;
}


.record-button {
position: fixed;
left: 46vw;
top: 150vw;
}

.ripple-container {
  top: 50vw;
  left: 50vw;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
}

.ripple {
  margin-top: 33vw;
  margin-left: 51vw;
  width: 20px;
  height: 20px;
  background-color: #4B6BFF;
  border-radius: 50%;
  transform: scale(6);
  animation: rippleEffect 1.5s linear infinite;
}

@keyframes rippleEffect {
  to {
    transform: scale(10);
    opacity: 0;
  }
}

.record{
box-sizing: border-box;
position: absolute;
max-width: 50vw;
padding: 10px;
border: 0.2vw solid #4B6BFF;
box-shadow: 0px 2px 3.1px 2px rgba(0, 0, 0, 0.11);
border-radius: 15px 0px 15px 15px;
overflow-wrap: break-word;
text-orientation: sideways-right;
transform-origin: top right; /* 指定变换的原点 */
}

.transcription-box {
margin-top: 5vw;
margin-left: -8vw;
width: 100%;
height: 30vw;
display: flex;
justify-content: flex-end; /* 框位于画面最右侧 */
align-items: flex-start;
overflow: hidden;
}

.record-text{
font-size: 5vw;
padding: 3vw;
font-family: 'Source Han Sans CN VF';
font-style: normal;
font-weight: 300;
font-size: 4vw;
line-height: 6vw;
letter-spacing: 0.1vw;
display: flex;
align-items: center;
color: #585858;
}

.item-container1 {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  row-gap: 0vw;
  column-gap: -20vw;
  margin-top: 5vw;
  margin-left: 5vw;
}

.xuanxiang1 {
  position: relative;
  display: flex; /* 使用 Flexbox 布局 */
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  width: 10vw; /* 确保整个区域可点击 */
  height: 10vw;
  border: none; /* 移除边框 */
  padding: 10px;
  font-size: 30px;
  cursor: pointer;
  overflow: hidden; /* 确保溢出部分被隐藏 */
  writing-mode: vertical-lr; /* 设置垂直书写模式 */
  text-orientation: mixed; /* 确保文字方向混合 */
  background-image: url('src/assets/images/diamond.png'); /* 用你的图片路径替换 'src/assets/images/diamond.png' */
  background-size: cover; /* 确保背景图案覆盖整个区域 */
}
.selected {
  background-color: transparent; /* Remove background color */
}


</style>
