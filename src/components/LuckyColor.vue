<template>
  <div>
    <p>今日のラッキーカラーは？</p>
    <a href="#" class="lookLuckyColor">
      <v-button @click="lookLuckyColor">CHECK!</v-button>
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
body {
  margin: 0;
  background-color: rgba(223, 230, 223, 0.699);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Helvetica, Sans-serif;
}
a {
  text-decoration: none;
  text-align: center;
  color: #fff;
  margin: 10px auto;
  width: 50px;
}
.lookLuckyColor {
  width: calc(12vw + 6px);
  height: calc(4vw + 6px);
  margin: 10px auto;
  background-image: linear-gradient(
    90deg,
    #77ceeb 0%,
    #e6d58d 49%,
    #db94c4 80%,
    #9de2c2 100%
  );
  border-radius: 5px;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  text-transform: uppercase;
  font-size: 2.5vw;
  font-weight: bold;
}
.lookLuckyColor:after {
  content: attr(alt);
  width: 12vw;
  height: 4vw;
  display: flex;
  align-items: center;
  justify-content: center;
}
.lookLuckyColor:hover {
  animation: slidebg 2s linear infinite;
}
@keyframes slidebg {
  to {
    background-position: 20vw;
  }
}
</style>
