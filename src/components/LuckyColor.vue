<template>
  <div class="lucky-color">
      <p>今日のラッキーカラーは？</p>
      <div class="lucky-color_look">
     <button @click="startOmikuji">ラッキーカラーを見る！</button>
        </div>
        <div class="lucky-color_result">
            <p v-if="result">今日のラッキーカラーは：{{result}}です！</p>
        </div>
 </div>
</template>

<script>
export default {
    data(){
        return{
            choice: ["1", "2", "3", "4","5","6","7","8","9","10","11","12","13","14","15"],
            result: null,
        }
    },
    methods:{
        lookLuckyColor(){
            var num = Math.floor( Math.random()*15 );
            this.result = this.choice[num]
        }
    }
}
</script>

<style scoped>

</style>