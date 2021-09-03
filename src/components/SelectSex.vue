<template>
  <div>
    <div class="select-buttons">
      <button @click="emitMale" class="select-button select-button--male">
        Male
      </button>
      <button @click="emitFemale" class="select-button select-button--female">
        Female
      </button>
    </div>
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
.select-buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3rem;
}
.select-button {
  width: 5rem;
  height: 3rem;
  color: white;
  background-image: linear-gradient(
    90deg,
    #145bdf 0%,
    #4f509c 49%,
    #7fcffd 80%,
    #aaceec 100%
  );
  border-radius: 5px;
  text-transform: uppercase;
  font-size: 1em;
  font-weight: bold;
}

.select-button:hover {
  animation: slidebg 300ms linear infinite;
}

@keyframes slidebg {
  to {
    background-position: 20vw;
  }
}

.select-button--male {
  background-image: linear-gradient(
    90deg,
    #145bdf 0%,
    #4f509c 49%,
    #7fcffd 80%,
    #aaceec 100%
  );
}

.select-button--female {
  background-image: linear-gradient(
    90deg,
    #e76f9d 0%,
    #fac0e2 49%,
    #f3c8ef 80%,
    #ed64f1 100%
  );
}
</style>
