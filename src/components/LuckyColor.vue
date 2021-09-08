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
  display: inline-block;
  padding: 0.3em 1em;
  text-decoration: none;
  color: #67c5ff;
  border: solid 2px #67c5ff;
  border-radius: 3px;
  transition: 0.4s;
}

.lookLuckyColor:hover {
  background: #67c5ff;
  color: white;
}

p {
  font-size: 1.4rem;
  font-style: italic;
  letter-spacing: 0.1em;
  color: #fff;
  text-shadow: -3px 2px 0 rgb(180, 176, 176);
}
</style>
