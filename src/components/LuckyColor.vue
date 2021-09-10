<template>
  <div class>
    <p>今日のラッキーカラーは？</p>
    <a href="#" class="lookLuckyColor">
      <button @click="lookLuckyColor"><span>CHECK!</span></button>
    </a>
    <div>
      <p v-if="result">今日のラッキーカラーは{{ result }}です！</p>
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
  box-shadow: 0 0.2rem rgba(0, 0, 0, 0.26);
}
.lookLuckyColor:active {
  transform: translateY(0.2rem);
  box-shadow: none;
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
