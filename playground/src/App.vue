<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)

const increment = () => {
  count.value++
}
</script>

<template>
  <section>
    <button @click="increment">
      Count is: {{ count }}
    </button>
  </section>
</template>

<style scoped>
button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
button:hover {
  background-color: #367c6b;
}
button:active {
  background-color: #2c5f54;
}
</style>
