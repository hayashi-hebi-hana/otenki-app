<template>
  <div>
    <h1>Otenki Up!</h1>
    <SelectSex @select-male="selectMale" @select-female="selectFemale" />
    <Weather @send-weather-data="setWeather" />
    <LuckyColor @lucky-color="LuckyColor" />
    <div class="imagepost"></div>
    <!-- データ表示用 -->
    <div>
      {{ allData }}
    </div>
    <div>
      {{ selectedSex }}
    </div>
    <!-- データ表示用 ここまで -->
    <Coordinate
      v-bind:clothes="allData"
      v-bind:weather="weather"
      :color="luckyColor"
      :selectedSex="selectedSex"
    />
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
    LuckyColor(data) {
      this.LuckyColor = data
    },
  },
  created() {
    {
      firebase
        .firestore()
        .collection("clothes")
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            this.allData.push(doc.data())
          })
        })
    }
  },
  computed: {},
}
</script>
<style>
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

h1 {
  font-size: calc(10px + 8vh);
  line-height: calc(10px + 10vh);
  font-family: "Sacramento", cursive;
  text-align: center;
  animation: blink 10s infinite;
  -webkit-animation: blink 10s infinite;
}

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
