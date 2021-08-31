<template>
  <div>
    <SelectSex @select-male="selectMale" @select-female="selectFemale" />
    <Weather @send-weather-data="setWeather" />
    <!-- データ表示用 -->
    <div>
      {{ allData }}
    </div>
    <div>
      {{ selectedSex }}
    </div>
    <!-- データ表示用 ここまで -->
  </div>
</template>

<script>
import firebase from "firebase"
import SelectSex from "@/components/SelectSex.vue"
import Weather from "@/components/Weather.vue"
export default {
  components: {
    SelectSex,
    Weather,
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
