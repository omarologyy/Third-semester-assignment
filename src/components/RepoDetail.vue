<template>
  <div class="repo-detail" v-if="repo">
    <h2>{{ repo.name }}</h2>
    <p>{{ repo.description }}</p>
    <p>Language: {{ repo.language }}</p>
    <a :href="repo.html_url" target="_blank">View on GitHub</a>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      repo: null,
      error: null
    }
  },
  created() {
    const repoName = this.$route.params.name
    axios
      .get(`https://api.github.com/repos/omarologyy/${repoName}`)
      .then((response) => {
        this.repo = response.data
      })
      .catch((error) => {
        console.error(error)
        this.error = 'Failed to load repository details'
      })
  }
}
</script>
