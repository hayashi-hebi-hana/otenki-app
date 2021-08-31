<template>
  <div>
    <button @click="emitMale">Male</button>
    <button @click="emitFemale">Female</button>
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
