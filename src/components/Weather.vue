<template>
  <div class="otenkiAPI">
    <h1>天気取得API</h1>
    <div class="tenki-hyouji">
      <div>↓現在地の体感温度、湿度、天気を下に表示↓</div>
      <div id="result"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      callURL:
        "https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid=1b9025d02ac2423f55483b43946ed204&lang=ja&units=metric",
    }
  },
  methods: {},
  created: function () {
    navigator.geolocation.getCurrentPosition((position) => {
      const newURL =
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
        position.coords.latitude +
        "&lon=" +
        position.coords.longitude +
        "&exclude=hourly,daily&appid=1b9025d02ac2423f55483b43946ed204&lang=ja&units=metric"
      this.callURL = newURL
      console.log(newURL)
      fetch(this.callURL)
        .then((res) => {
          return res.json()
        })
        .then((data) => {
          console.log(data)
          const kekka = document.getElementById("result")
          kekka.textContent =
            "現在地の体感温度は" +
            data.current.feels_like +
            "℃、湿度は" +
            data.current.humidity +
            "%、天気は" +
            data.current.weather[0].description +
            "です。"
        })
    })
  },
}
</script>

<style scoped>
.tenki-hyouji {
  margin-top: 1.3rem;
}
</style>
