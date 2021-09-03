<template>
  <section>
    <button @click="getCloth">服取得</button>
    {{ recommendedClothes }}
  </section>
</template>

<script>
export default {
  props: ["clothes", "weather", "color", "selectedSex"],
  data() {
    return {
      recommendedClothes: [],
    }
  },
  methods: {
    getCloth() {
      // this.clothes から sex と weather と color が 一致してる アイテムだけを取り出した recommendedClothes を作る
      // for文とif 文で 条件に当てはまるものを temp に入れてく
      let temp = []
      for (let i = 0; i < this.clothes.length; i++) {
        console.log(this.clothes[i].sex, this.selectedSex)
        if (
          this.clothes[i].sex === this.selectedSex
          // this.clothes[i].weather === this.weather &&
          // this.clothes[i].color === this.color &&
          // this.clothes[i].season === season // 今のseasonの情報を取得する必要あり
        ) {
          temp.push(this.clothes[i])
        }
      }
      this.recommendedClothes = temp
    },
  },
}
</script>
