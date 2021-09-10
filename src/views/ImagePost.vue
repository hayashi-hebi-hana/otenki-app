<template>
  <div>
    <section>
      <h1>画像投稿</h1>
    </section>
    <div class="container">
      <div class="selector-wrapper">
          <select name="sex" id="" v-model="sex">
          <option value="male">male</option>
          <option value="female">female</option>
        </select>
        <input type="text" v-model="name" placeholder="name" />
        <select name="wether" id="" v-model="weather">
          <option value="晴れ">晴れ</option>
          <option value="雨">雨</option>
          <option value="曇り">曇り</option>
        </select>
        <select name="temperature" id="" v-model="temperature">
          <option value="hot">hot28度以上</option>
          <option value="warm">warm23-27度</option>
          <option value="comfortable">comfortable15-22度</option>
          <option value="cold">cold14以下</option>
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
      </div>
      <div class="wear-url">
        <input type="text" v-model="url" placeholder="wear's page url" />
      <button class="url-add" v-on:click="upload">追加</button>
    </div>
    <div>
      <input
        class="picture-upload"
        type="file"
        accept="image/*"
        :disabled="disabled"
        @change="onFileChange"
      />
      <span>{{ message }}</span>
    </div>
  </div>
  </div>
</template>

<script>
import firebase from "firebase"
import { storage } from "@/firebase"

export default {
  data() {
    return {
      clothes: [],
      disabled: false,
      message: "",
      sex: "",
      name: "",
      weather: "",
      temperature: "",
      season: "",
      color: "",
      url: "",
    }
  },
  methods: {
    postCloth(imageUrl) {
      const cloth = {
        sex: this.sex,
        name: this.name,
        weather: this.weather,
        temperature: this.temperature,
        season: this.season,
        color: this.color,
        url: this.url,
        imageUrl: imageUrl,
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
          this.postCloth(url)
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

<style scoped>
.container {
  margin-top: 1rem;
  justify-content: center;
  width: 100vw;
}

select {
  background-color: snow;
  display: inline-block;
  border: black solid 0.1rem;
  -webkit-appearance: auto;
}

input {
  background-color: snow;
  display: inline-block;
  border: black solid 0.1rem;
  -webkit-appearance: auto;
}

select,
input {
  height: 1.4rem;
  margin: 0.1rem;
}

.picture-upload {
  border: none;
  background-color: transparent;
  margin-top: 0.5rem;
  height:fit-content;
}

.url-add {
  margin-left: 0.15rem;
  border: rgb(118, 118, 118) solid 0.06rem;
  padding: 0.1em;
  width: 3em;
  color: initial;
  background-color: rgb(235, 235, 235);
  border-radius: 0.1rem;
}

.url-add:hover {
  background-color: rgb(230, 230, 230);
  border-color: rgb(100, 100, 100);
}

.selector-wrapper {
  display: flex;
  justify-content: center;
}

.wear-url {
  margin: 0.5rem;
}
</style>