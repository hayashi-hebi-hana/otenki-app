<template>
  <div class>
    <p>今日のラッキーカラーは？</p>
    <a href="#" class="lookLuckyColor">
      <button @click="lookLuckyColor"><span>CHECK!</span></button>
    </a>
    <div>
      <p v-if="result">
        今日のラッキーカラーは<span v-bind:style="{ color: iro }">{{
          result
        }}</span
        >です！
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      choice: ["赤", "青", "黄", "橙", "緑", "紫", "白", "黒"],
      result: null,
    }
  },
  methods: {
    lookLuckyColor() {
      let num = Math.floor(Math.random() * 8)
      this.result = this.choice[num]
      this.sendData(this.result)
    },
    sendData(data) {
      this.$emit("lucky-color", data)
    },
  },
  computed: {
    iro() {
      if (this.result === "赤") return "red"
      if (this.result === "青") return "blue"
      return "black"
    },
  },
}
</script>

<style>
.lookLuckyColor {
  margin: 20px;
  padding: 20px;
  color: white;
  background-image: linear-gradient(
    90deg,
    #d2f0da 0%,
    #acc7d1 49%,
    #f7c3ee 80%,
    #eaf0c7 100%
  );
  border-radius: 10px;
  text-transform: uppercase;
  font-size: 1em;
  font-weight: bold;
  filter: opacity(70%);
  transition: 1s;
}
.lookLuckyColor:hover {
  filter: opacity(100%);
  transform: scale(1.04);
}

@keyframes slidebg {
  to {
    background-position: 20vw;
  }
}
p {
  margin: 30px;
  font-size: 1.4rem;
  font-style: italic;
  letter-spacing: 0.1em;
  color: #fff;
  text-shadow: -3px 2px 0 rgb(180, 176, 176);
}
</style>
