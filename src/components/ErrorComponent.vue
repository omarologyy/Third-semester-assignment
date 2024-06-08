<template>
  <div>
    <h3>This component will throw an error</h3>
    <button @click="throwError">Throw Error</button>
  </div>
</template>

<script>
export default {
  methods: {
    throwError() {
      throw new Error('This is a test error')
    }
  }
}
</script>

<style scoped>
.error-component {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin: 20px;
  text-align: center;
}

.error-component h3 {
  margin-bottom: 20px;
}

.error-component button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.error-component button:hover {
  background-color: #0056b3;
}
</style>
