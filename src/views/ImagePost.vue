<template>
  <div>
    <section>
      <h1>画像投稿</h1>
    </section>
    <div>
      <input type="text" v-model="name" placeholder="name" />
      <select name="wether" id="" v-model="weather">
        <option value="hot">hot</option>
        <option value="warm">warm</option>
        <option value="cold">cold</option>
        <option value="rain">rain</option>
      </select>
      <input type="text" v-model="url" placeholder="url" />
      <button v-on:click="postCloth">追加</button>
      <div>
        <p v-for="cloth in clothes" :key="cloth.id">
          {{ cloth.name }} + {{ cloth.weather }} + {{ cloth.url }}
        </p>
      </div>
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
        name: this.name,
        weather: this.weather,
        url: this.url,
        imageUrl: "",
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
