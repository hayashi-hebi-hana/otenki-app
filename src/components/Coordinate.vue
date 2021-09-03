<template>
  <section>
    <button @click="getCloth">服取得</button>
    {{ recommendedClothes }}
  </section>
</template>

<script>
export default {
  props: ["clothes", "weather", "color"],
  data() {
    return {
      recommendedClothes: [],
    }
  },
  methods: {
    getCloth() {
      // this.clothes から sex と weather と color が 一致してる アイテムだけを取り出した recommendedClothes を作る
      if (this.clothes.sex === this.selectedSex) {
        if (this.clothes.weather === this.weather) {
          if (this.clothes.color === this.color) {
            this.recommendedClothes.push(this.clothes)
          }
        }
      }
      let temp = []

      // for文とif 文で 条件に当てはまるものを temp に入れてく

      if (this.clothes.season === this.season) {
        this.temp.push(this.clothes)
      }

      //
      this.recommendedClothes = temp
    },
  },
}
</script>
