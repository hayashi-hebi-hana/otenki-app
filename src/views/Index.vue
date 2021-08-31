<template>
  <div>
    <SelectSex @select-male="selectMale" @select-female="selectFemale" />
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
export default {
  components: {
    SelectSex,
  },

  data() {
    return {
      allData: [],
      selectedSex: "",
    }
  },
  methods: {
    selectMale() {
      this.selectedSex = "male"
    },
    selectFemale() {
      this.selectedSex = "female"
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
