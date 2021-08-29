<template>
  <div>
    <section>
      <h1>画像投稿</h1>
    </section>
    <div>
      <select name="sex" id="" v-model="sex">
        <option value="male">male</option>
        <option value="female">female</option>
      </select>
      <input type="text" v-model="name" placeholder="name" />
      <select name="wether" id="" v-model="weather">
        <option value="hot">hot</option>
        <option value="warm">warm</option>
        <option value="cold">cold</option>
        <option value="rain">rain</option>
      </select>
      <select name="season" id="" v-model="season">
        <option value="春">春</option>
        <option value="夏">夏</option>
        <option value="秋">秋</option>
        <option value="冬">冬</option>
      </select>
      <select name="color" id="" v-model="color">
        <option value="赤">赤</option>
        <option value="青">青</option>
        <option value="黄">黄</option>
        <option value="橙">橙</option>
        <option value="緑">緑</option>
        <option value="紫">紫</option>
        <option value="白">白</option>
        <option value="黒">黒</option>
      </select>
      <input type="text" v-model="url" placeholder="url" />
      <button v-on:click="postCloth">追加</button>
      <!-- <div>
        <p v-for="cloth in clothes" :key="cloth.id">
          {{ cloth.name }} + {{ cloth.weather }} + {{ cloth.season }} +
          {{ cloth.url }}
        </p>
      </div> -->
    </div>
  </div>
</template>

<script>
import firebase from "firebase"

export default {
  data() {
    return {
      clothes: [],
    }
  },
  methods: {
    postCloth() {
      const cloth = {
        sex: this.sex,
        name: this.name,
        weather: this.weather,
        season: this.season,
        color: this.color,
        url: this.url,
        imageUrl: "https://via.placeholder.com/600x800",
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      }

      firebase
        .firestore()
        .collection("clothes")
        .add(cloth)
        .then((ref) => {
          this.clothes.push({
            id: ref.id,
            ...cloth,
          })
        })
    },
  },
  created() {
    firebase
      .firestore()
      .collection("clothes")
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          this.clothes.push({
            id: doc.id,
            ...doc.data(),
          })
        })
      })
  },
}
</script>
