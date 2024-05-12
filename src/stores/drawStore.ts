import { defineStore } from "pinia"
import { ref } from "vue"

export const useDrawStore = defineStore('draw2', () => {
    
    const logoimgurl1 = ref('')
    const logoimgurl2 = ref('')
  
  
    return { logoimgurl1,logoimgurl2}
  },{persist:true})