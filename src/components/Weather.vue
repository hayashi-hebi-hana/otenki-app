<template>
  <div class="otenkiAPI">
    <h1>天気取得API</h1>
    <div class="tenki-hyouji">
      <div>↓現在地の体感温度、湿度、天気を下に表示↓</div>
      <div id="result">
        <div id="weather">
          <div id="description">現在の天気：{{ description }}</div>
          <img src="" id="icon" />
        </div>
        <div id="temp">
          <div id="kion"></div>
          <div id="taikan"></div>
        </div>
        <div id="humidity"><p id="humidText"></p></div>
      </div>
      <!-- 温度(気温と体感温度)と湿度と天気を表示したらよい？
      服って一日中着るもんやから現在の情報でなく一日の情報総合すべきなのでは……？ -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      description: "",
      callURL:
        "https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid=1b9025d02ac2423f55483b43946ed204&lang=ja&units=metric",
    }
  },
  methods: {
    sendData(data) {
      this.$emit("send-weather-data", data)
    },
  },
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
          this.sendData(data)
          this.description = data.current.weather[0].description
          // const kekka = document.getElementById("result")
          // kekka.textContent =
          //   "現在地の体感温度は" +
          //   data.current.feels_like +
          //   "℃、湿度は" +
          //   data.current.humidity +
          //   "%、天気は" +
          //   data.current.weather[0].description +
          //   "です。"
          document.getElementById("icon").src =
            "http://openweathermap.org/img/w/" +
            data.current.weather[0].icon +
            ".png"
          // document.getElementById("description").textContent =
          //   "現在の天気：" + data.current.weather[0].description
          document.getElementById("kion").textContent =
            "現在の気温：" + data.current.dew_point + "℃"
          document.getElementById("taikan").textContent =
            "体感温度：" + data.current.feels_like + "℃"
          document.getElementById("humidText").textContent =
            "現在の湿度：" + data.current.humidity + "%"
        })
    })
  },
}
</script>

<style scoped>
.tenki-hyouji {
  margin-top: 1.3rem;
}

#result {
  display: flex;
  justify-content: center;
  align-items: center;
}

#weather,
#temp,
#humidity {
  height: 5rem;
  width: 24%;
  padding: 0.5rem;
  color: white;
  background-color: slategray;
}

#weather,
#temp {
  border-right: 0.1rem white solid;
}

#humidText {
  margin-block-start: 0rem;
  margin-block-end: 0rem;
  text-align: center;
  color: white;
}
</style>
