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
    <div>
      <input
        type="file"
        accept="image/*"
        :disabled="disabled"
        @change="onFileChange"
      />
      <span>{{ message }}</span>
    </div>
  </div>
</template>

<script>
import firebase from "firebase"
import { db, storage } from "@/firebase"

export default {
  data() {
    return {
      clothes: [],
      disabled: false,
      message: "",
      sex: "",
      name: "",
      weather: "",
      season: "",
      color: "",
      url: "",
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
    onFileChange(e) {
      const file = e.target.files[0]
      this.upload(file)
    },
    upload(file) {
      this.message = "アップロード中..."
      this.disabled = true
      // ref は reference の略。データの在り処＝住所を表すイメージ。
      const storageRef = storage.ref()
      // 同じ名前のファイルと区別できるように timestamp を追加して、ユニークなファイル名をつける
      const createdAt = new Date()
      const timestamp = createdAt.getTime()
      const uniqueFileName = timestamp + "_" + file.name
      const fileRef = storageRef.child("images/" + uniqueFileName)
      // fileRef の場所に file を送る。 put は "置き換える" の意味。
      // uploadTask.on("state_changed", ...) を使う方法もあるが、ひとまず then で実装する
      fileRef
        .put(file)
        .then(() => fileRef.getDownloadURL())
        // 上の then のなかで snapshot.getDownloadURL().then(...) と書いてもいいが、
        // then で続けられるやつを return すると、外側に then を続けることができ、よみやすい
        // 例 fetch(...).then(res => res.json()).then(...)
        .then((url) => {
          // storage にアップロードしたファイルに対応するドキュメントを保存する
          const image = {
            name: file.name,
            url,
            createdAt,
          }
          return db.collection("images").add(image)
        })
        .then(() => {
          this.message = "アップロード完了！"
          setTimeout(() => {
            this.message = ""
            this.disabled = false
          }, 1000)
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
