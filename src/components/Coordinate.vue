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
  props: ["clothes", "weather", "luckyColor", "selectedSex", "season"],
  data() {
    return {
      recommendedClothes: [],
      temperature: "",
      tenki: "",
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
    tenkiHantei() {
      const tenki = this.weather.current.weather[0].main
      if (tenki === "Clear") {
        this.tenki = "晴れ"
      } else if (tenki === "Clouds") {
        this.tenki = "曇り"
      } else if (tenki === "Rain") {
        this.tenki = "雨"
      } else {
        this.tenki = ""
      }
    },
    getCloth() {
      this.getTemperature()
      this.tenkiHantei()
      // this.clothes から sex と weather と color が 一致してる アイテムだけを取り出した recommendedClothes を作る
      // for文とif 文で 条件に当てはまるものを temp に入れてく
      let temp = []
      for (let i = 0; i < this.clothes.length; i++) {
        console.log(
          // this.clothes[i].weather
          this.weather
          // this.clothes[i].temperature, this.teperature
          // this.clothes[i].color, this.luckyColor
        )
        console.log("this. luckyColor", this.luckyColor)
        console.log("this.clothes[i].color", this.clothes[i].color)
        if (
          // colorとweatherがいけない
          this.clothes[i].sex === this.selectedSex &&
          this.clothes[i].season === this.season &&
          this.clothes[i].temperature === this.temperature &&
          this.clothes[i].color === this.luckyColor
          // 今のtemperatureとseasonの情報を取得したい
          // temperature は
        ) {
          console.log("tenki", this.tenki)
          if (this.clothes[i].weather === this.tenki || this.tenki === "") {
            temp.push(this.clothes[i])
          }
        }
      }
      this.recommendedClothes = temp
    },
  },
}
</script>

<style scoped>
.button {
  margin: 20px;
  padding: 20px;
  color: white;
  background-image: linear-gradient(
    90deg,
    #d2f0da 0%,
    #acc7d1 49%,
    #f7c3ee 80%,
    #eaf0c7 100%
  );
  border-radius: 10px;
  text-transform: uppercase;
  font-size: 1em;
  font-weight: bold;
  filter: opacity(70%);
  transition: 1s;
}
.button:hover {
  filter: opacity(100%);
  transform: scale(1.04);
}

@keyframes slidebg {
  to {
    background-position: 20vw;
  }
}
</style>
