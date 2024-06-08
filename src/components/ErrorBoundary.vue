<template>
  <div>
    <slot v-if="!hasError"></slot>
    <div v-else>
      <h2>An error occurred</h2>
      <p>{{ error.message }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hasError: false,
      error: null
    }
  },
  errorCaptured(err, vm, info) {
    this.hasError = true
    this.error = err
    console.error(err)
    return false // prevents the error from propagating further
  }
}
</script>

<style scoped>
.error-boundary {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: #fff3f3;
  border: 1px solid #ffcccc;
  color: #cc0000;
  text-align: center;
  border-radius: 8px;
  margin: 20px;
}

.error-boundary h1 {
  margin: 0 0 10px;
}

.error-boundary p {
  margin: 0 0 20px;
}

.error-boundary button {
  padding: 10px 20px;
  background-color: #cc0000;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.error-boundary button:hover {
  background-color: #a30000;
}
</style>
