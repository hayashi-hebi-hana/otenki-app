<template>
  <div>
    <a href="#" class="SelectMale">
      <v-button @click="emitMale">Male</v-button></a
    ><a href="#" class="SelectFemale"
      ><v-button @click="emitFemale">Female</v-button>
    </a>
  </div>
</template>

<script>
export default {
  methods: {
    emitMale() {
      this.$emit("select-male")
    },
    emitFemale() {
      this.$emit("select-female")
    },
  },
}
</script>
<style scoped>
a {
  text-decoration: none;
  color: #fff;
  justify-content: csnter;
}
.SelectMale {
  display: inline-block;
  width: calc(8vw + 2px);
  height: calc(3vw + 2px);
  margin: 0 auto;
  background-image: linear-gradient(
    90deg,
    #145bdf 0%,
    #4f509c 49%,
    #7fcffd 80%,
    #aaceec 100%
  );
  border-radius: 5px;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  text-transform: uppercase;
  font-size: 1.5vw;
  font-weight: bold;
}
.SelectMale:after {
  content: attr(alt);
  width: 8vw;
  height: 3vw;
  display: flex;
  align-items: center;
  justify-content: center;
}
.SelectMale:hover {
  animation: slidebg 2s linear infinite;
  margin: 0 auto;
}
@keyframes slidebg {
  to {
    background-position: 20vw;
  }
}

a {
  text-decoration: none;
  color: #fff;
  display: flex;
  justify-content: csnter;
}
.SelectFemale {
  display: inline-block;
  width: calc(8vw + 2px);
  height: calc(3vw + 2px);
  background-image: linear-gradient(
    90deg,
    #e76f9d 0%,
    #fac0e2 49%,
    #f3c8ef 80%,
    #ed64f1 100%
  );
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  font-size: 1.5vw;
  font-weight: bold;
}
.SelectFemale:after {
  content: attr(alt);
  width: 8vw;
  height: 3vw;
  display: flex;
  align-items: center;
  justify-content: center;
}
.SelectFemale:hover {
  animation: slidebg 2s linear infinite;
}
@keyframes slidebg {
  to {
    background-position: 20vw;
  }
}
</style>
