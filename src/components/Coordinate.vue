<template>
  <section>
    <div v-on:click="getCloth" class="button">服取得</div>
    <div>{{ recommendedClothes }}</div>
    <!-- コーディネートの名前と画像のみを表示したい -->
    <!-- <img src="recommendedClothes.imageUrl" /> -->
  </section>
</template>

<script>
export default {
  props: ["clothes", "weather", "LuckyColor", "selectedSex", "season"],
  data() {
    return {
      recommendedClothes: [],
      temperature: "",
    }
  },
  methods: {
    getTemperature() {
      const temp = this.weather.current.feels_like
      if (temp >= 28) {
        this.temperature = "hot"
      } else if (temp >= 23) {
        this.temperature = "warm"
      } else if (temp >= 15) {
        this.temperature = "comfortable"
      } else {
        this.temperature = "cold"
      }
    },
    getCloth() {
      this.getTemperature()
      // this.clothes から sex と weather と color が 一致してる アイテムだけを取り出した recommendedClothes を作る
      // for文とif 文で 条件に当てはまるものを temp に入れてく
      let temp = []
      for (let i = 0; i < this.clothes.length; i++) {
        // console.log(
        // this.clothes[i].weather
        // this.weather
        // this.clothes[i].temperature, this.teperature
        // this.clothes[i].color, this.luckyColor
        // )
        if (
          // colorとweatherがいけない
          this.clothes[i].sex === this.selectedSex &&
          this.clothes[i].season === this.season &&
          this.clothes[i].temperature === this.temperature
          // this.clothes[i].color === this.luckyColor
          // this.clothes[i].weather === this.weather
          // 今のtemperatureとseasonの情報を取得したい
          // temperature は
        ) {
          temp.push(this.clothes[i])
        }
      }
      this.recommendedClothes = temp
    },
  },
}
</script>

<style scoped>
.button {
  display: inline-block;
  padding: 0.3em 1em;
  text-decoration: none;
  color: #67c5ff;
  border: solid 2px #67c5ff;
  border-radius: 3px;
  transition: 0.4s;
}
</style>
