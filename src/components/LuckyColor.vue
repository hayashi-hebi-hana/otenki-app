<template>
  <div class>
    <p>今日のラッキーカラーは？</p>
    <div class="lookLuckyColor">
      <button @click="lookLuckyColor"><span>CHECK!</span></button>
    </div>
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
      if (this.result === "黄") return "yellow"
      if (this.result === "橙") return "orange"
      if (this.result === "緑") return "green"
      if (this.result === "紫") return "violet"
      if (this.result === "白") return "white"
      if (this.result === "黒") return "black"
      return "black"
    },
  },
}
</script>

<style>
button {
  display: inline-block;
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
  box-shadow: 0 0.2rem rgba(0, 0, 0, 0.26);
}

button:active {
  transform: translateY(0.2rem);
  box-shadow: none;
}

@keyframes slidebg {
  to {
    background-position: 20vw;
  }
}
p {
  margin: 15px;
  font-size: 1.4rem;
  font-style: italic;
  letter-spacing: 0.1em;
  color: #fff;
  text-shadow: -3px 2px 0 rgb(180, 176, 176);
}
</style>
