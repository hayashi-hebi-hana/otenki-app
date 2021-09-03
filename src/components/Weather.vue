<template>
  <div class="otenkiAPI">
    <h1>天気取得API</h1>
    <div class="tenki-hyouji">
      <div id="result">
        <div id="weather">
          <div class="tenki-wrapper">
            <div id="description">
              <span class="bold">現在の天気</span><br />
              {{ description }}
            </div>
            <img src="" id="icon" />
          </div>
        </div>
        <div id="temp">
          <div class="temp-wrapper">
            <div id="kion">
              <span class="bold">現在の気温</span>
              {{ kion }}℃
            </div>
            <div id="taikan">
              <span class="bold">体感気温</span><br />
              {{ taikan }}℃
            </div>
          </div>
        </div>
        <div id="humidity">
          <p id="humidText">
            <span class="bold">現在の湿度</span><br />
            {{ sitsudo }}%
          </p>
        </div>
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
      kion: "",
      taikan: "",
      sitsudo: "",
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
          this.description = data.current.weather[0].description
          this.kion = data.current.dew_point
          this.taikan = data.current.feels_like
          this.sitsudo = data.current.humidity
          this.sendData(data)
          console.log(data)
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
          // document.getElementById("kion").textContent =
          //   "現在の気温：" + data.current.dew_point + "℃"
          // document.getElementById("taikan").textContent =
          //   "体感温度：" + data.current.feels_like + "℃"
          // document.getElementById("humidText").textContent =
          //   "現在の湿度：" + data.current.humidity + "%"
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
  height: 7rem;
  width: 24%;
  padding: 0.5rem;
  color: white;
  background-color: #87cefa;
  position: relative;
}

#weather,
#temp {
  border-right: 0.1rem white solid;
}

#kion {
  padding-bottom: 0.2rem;
}

#taikan {
  padding-bottom: 0.2rem;
}

.tenki-wrapper,
.temp-wrapper {
  width: 80%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
}

/* #kion,
#taikan,
#description,
#icon {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
} */

.bold {
  font-weight: 500;
  font-size: 120%;
  text-decoration-line: underline;
}

.bold::after {
  white-space: pre;
}

#humidText {
  width: 80%;
  margin-block-start: 0rem;
  margin-block-end: 0rem;
  text-align: center;
  color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
}
</style>
