<template>
  <div>
    <h1>Otenki Up!</h1>
    <SelectSex @select-male="selectMale" @select-female="selectFemale" />
    <Weather @send-weather-data="setWeather" />
    <LuckyColor @lucky-color="setLuckyColor" />
    <div class="imagepost"></div>
    <!-- データ表示用 -->
    <div>
      <!-- {{ allData }} -->
    </div>
    <div>
      {{ selectedSex }}
    </div>
    <!-- データ表示用 ここまで -->
    <Coordinate
      v-bind:clothes="allData"
      v-bind:weather="weather"
      :luckyColor="luckyColor"
      :selectedSex="selectedSex"
      :season="season"
    />
    <!-- <div> -->
    <!-- <img src="recommendedClothes.imageUrl" alt="" /> -->
    <!-- </div> -->
  </div>
</template>

<script>
import firebase from "firebase"
import SelectSex from "@/components/SelectSex.vue"
import Weather from "@/components/Weather.vue"
import LuckyColor from "@/components/LuckyColor.vue"
import Coordinate from "@/components/Coordinate.vue"

export default {
  components: {
    SelectSex,
    Weather,
    LuckyColor,
    Coordinate,
  },

  data() {
    return {
      allData: [],
      selectedSex: "",
      luckyColor: "",
      weather: {},
      season: "",
    }
  },
  methods: {
    selectMale() {
      this.selectedSex = "male"
    },
    selectFemale() {
      this.selectedSex = "female"
    },
    setWeather(data) {
      this.weather = data
    },
    setLuckyColor(data) {
      this.luckyColor = data
    },
  },
  created() {
    // firestore から clothes の documentsを取得
    firebase
      .firestore()
      .collection("clothes")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.allData.push(doc.data())
        })
      })

    // 今日の日付からseasonを設定
    const getSeason = () => {
      const now = new Date()
      const month = now.getMonth() + 1
      switch (month) {
        // 春
        case 3:
        case 4:
        case 5:
          return "春"

        // 夏
        case 6:
        case 7:
        case 8:
          return "夏"

        // 秋
        case 9:
        case 10:
        case 11:
          return "秋"

        // 冬
        case 12:
        case 1:
        case 2:
          return "冬"
      }
    }
    this.season = getSeason()
  },
  computed: {},
}
</script>
<style>
h1 {
  position: relative;
  display: inline-block;
  padding: 0 2.5em;
  color: #fff;
}
h1:before,
h1:after {
  position: absolute;
  display: inline-block;
  content: "";
  top: 50%;
  width: 44px;
  height: 2px;
  background-color: #fff;
  -webkit-transform: rotate(-60deg);
  transform: rotate(-60deg);
}
h1:before {
  left: 0;
}
h1:after {
  right: 0;
}
body {
  background: #f1e2db;
  -webkit-animation: colour 10s linear infinite;
  -moz-animation: colour 10s linear infinite;
}
@-webkit-keyframes colour {
  0% {
    background: #f1e2db;
  }

  40% {
    background: #e5f3da;
  }

  80% {
    background: #d1e7f0;
  }

  100% {
    background: #f1dbee;
  }
}
@import url("https://fonts.googleapis.com/css?family=Sacramento&display=swap");

@keyframes blink {
  20%,
  24%,
  55% {
    color: rgb(250, 242, 242);
    text-shadow: none;
  }

  0%,
  19%,
  21%,
  23%,
  25%,
  54%,
  56%,
  100% {
    text-shadow: 0 0 5px rgb(204, 242, 245), 0 0 15px rgb(222, 225, 245),
      0 0 20px rgb(194, 243, 243), 0 0 40px #f0ccea, 0 0 60px #daa8e0,
      0 0 10px #f7c8e9, 0 0 98px #f7c7f4;
    color: #fff;
  }
}
</style>
