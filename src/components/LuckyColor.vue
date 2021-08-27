<template>
   <div>
      <p>今日のラッキーカラーは？</p>
      <div >
     <button @click="lookLuckyColor">ラッキーカラーを見る！</button>
        </div>
        <div>
            <p v-if="result">今日のラッキーカラーは：{{result}}です！</p>
        </div>
 </div>
</template>

<script>
export default {
    data(){
        return{
            choice: ["赤", "青", "黄", "橙", "緑", "紫", "白", "黒"],
            result: null,
        }
    },
    methods:{
        lookLuckyColor(){
            let num = Math.floor( Math.random()*15 );
            this.result = this.choice[num]
        }
    }
}
</script>

<style scoped>

</style>