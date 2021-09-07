<template>
  <div class="otenkiAPI">
    <h1>天気取得API</h1>
    <div class="tenki-hyouji">
      <div class="weather keyframe1 animation">
        <div class="tenki-wrapper">
          <div class="description">
            <div class="tenki">
              <div class="bold">現在の天気</div>
              <div>
                {{ description }}
              </div>
            </div>
          </div>
          <img src="" class="icon" id="picture" />
        </div>
      </div>
      <div class="temp keyframe1 animation">
        <div class="temp-wrapper">
          <div class="kion">
            <div class="bold">現在の気温</div>
            <div>{{ kion }}℃</div>
          </div>
          <div class="taikan">
            <div class="bold">体感気温</div>
            <div>{{ taikan }}℃</div>
          </div>
        </div>
      </div>
      <div class="humidity keyframe1 animation">
        <div class="humidText">
          <div class="bold">現在の湿度</div>
          <div>{{ sitsudo }}%</div>
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
      kuwasiiTenki: "",
      iconID: "",
      callURL:
        "https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid=1b9025d02ac2423f55483b43946ed204&lang=ja&units=metric",
    }
  },
  methods: {
    sendData(data) {
      this.$emit("send-weather-data", data)
    },
    tenkiHantei(tenki) {
      if (tenki === "Clear") {
        this.description = "晴れ"
        document.getElementById("picture").src =
          "https://illalet.com/wp-content/uploads/2017/05/16_2_19.png"
      } else if (tenki === "Clouds") {
        this.description = "曇り"
        document.getElementById("picture").src =
          "https://previews.123rf.com/images/fokaspokas/fokaspokas1803/fokaspokas180300313/96761206-%E6%9B%87%E3%82%8A%E3%81%AE%E5%A4%A9%E6%B0%97%E3%82%A2%E3%82%A4%E3%82%B3%E3%83%B3%E3%80%82%E9%80%8F%E6%98%8E%E3%81%AA%E8%83%8C%E6%99%AF%E3%81%AB%E5%BD%B1%E4%BB%98%E3%81%8D%E3%81%AE%E7%99%BD%E3%81%84%E3%82%A2%E3%82%A4%E3%82%B3%E3%83%B3.jpg"
      } else if (tenki === "Rain") {
        this.description = "雨"
        document.getElementById("picture").src = ""
      } else {
        this.description = this.kuwasiiTenki
        document.getElementById("picture").src =
          "http://openweathermap.org/img/w/" + this.iconID + ".png"
      }
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
          this.kuwasiiTenki = data.current.weather[0].description
          this.tenkiHantei(data.current.weather[0].main)
          this.kion = data.current.dew_point
          this.taikan = data.current.feels_like
          this.sitsudo = data.current.humidity
          this.iconID = data.current.weather[0].icon
          this.sendData(data)
          console.log(data)
        })
    })
  },
}
</script>

<style scoped>
.tenki-hyouji {
  display: flex;
  justify-content: center;
  align-items: center;
}

.animation {
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  animation-duration: 1.5s;
}

.keyframe1 {
  animation-name: anim_v;
}

@keyframes anim_v {
  0% {
    transform: translate(0, 0px);
  }
  100% {
    transform: translate(0rem, -0.5rem);
  }
}

.description {
  justify-content: center;
  align-items: center;
  display: flex;
}

.weather,
.temp,
.humidity {
  height: 8.5rem;
  width: 20%;
  padding: 0.5rem;
  color: #cab8d9;
  background-color: whitesmoke;
  position: relative;
  border-radius: 50%;
  margin: 0.3rem;
  box-shadow: 0 5px 6.1px rgba(0, 0, 0, 0.03),
    0 10.1px 11.4px rgba(0, 0, 0, 0.04), 0 38.4px 34.8px rgba(0, 0, 0, 0.06);
}

/* .weather,
.temp {
  border-right: 0.1rem #FBDEDE solid;
} */

.kion,
.tenki {
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

.bold {
  font-weight: 500;
  font-size: 120%;
  text-decoration-line: underline;
}

.humidText {
  width: 80%;
  margin-block-start: 0rem;
  margin-block-end: 0rem;
  text-align: center;
  color: #cab8d9;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
}

.icon {
  width: 20%;
}
</style>
