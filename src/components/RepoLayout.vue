<template>
  <div class="repo-layout">
    <header>
      <h1>My GitHub Repositories</h1>
      <div class="search-container">
        <input type="text" v-model="searchQuery" placeholder="Search by repository name" />
      </div>
    </header>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: ''
    }
  },
  watch: {
    searchQuery(newQuery) {
      this.$router.push({ name: 'RepoList', query: { search: newQuery } })
    }
  }
}
</script>
<style scoped>
.repo-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

header {
  background-color: white;
  padding: 20px;
  text-align: center;
  border-bottom: 1px solid #ddd;
}

header h1 {
  margin: 0;
  color: black;
}

main {
  flex: 1;
  padding: 20px;
  background-color: #f9f9f9;
}
</style>
