<template>
  <div>
    <button @click="emitMale">Male</button>
    <button @click="emitFeale">Female</button>
  </div>
</template>

<script>
export default {
  methods: {
    emitMale() {
      this.$emit("event-male")
    },
    emitFemale() {
      this.$emit("event-female")
    },
  },
}
</script>
