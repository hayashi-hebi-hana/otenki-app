<template>
   <div>
      <p>今日のラッキーカラーは？</p>
      <div >
     <button @click="startOmikuji">ラッキーカラーを見る！</button>
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
            choice: ["赤", "青", "緑", "黄","紫","オレンジ","黒","グレー","白","ピンク","水色","茶色","ライトグリーン","紺色","ワインレッド"],
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