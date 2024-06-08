<template>
  <div class="repo-list">
    <div class="create-repo">
      <input type="text" v-model="newRepoName" placeholder="Repository Name" />
      <button @click="createRepo">Create Repository</button>
    </div>

    <div v-for="repo in paginatedRepos" :key="repo.id" class="repo">
      <router-link :to="{ name: 'RepoDetail', params: { name: repo.name } }" class="repo-link">
        <h3>{{ repo.name }}</h3>
        <p v-if="repo.description">{{ repo.description }}</p>
      </router-link>
      <button @click="deleteRepo(repo.name)">Delete</button>
    </div>

    <div class="pagination">
      <button @click="prevPage" :disabled="page === 1">Prev</button>
      <span
        v-for="n in totalPages"
        :key="n"
        class="page-number"
        @click="goToPage(n)"
        :class="{ active: page === n }"
        >{{ n }}</span
      >
      <button @click="nextPage" :disabled="page === totalPages">Next</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      repos: [],
      page: 1,
      perPage: 5,
      searchQuery: '',
      newRepoName: ''
    }
  },
  computed: {
    filteredRepos() {
      let filtered = this.repos
      if (this.searchQuery) {
        filtered = filtered.filter((repo) =>
          repo.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        )
      }
      return filtered
    },
    paginatedRepos() {
      const start = (this.page - 1) * this.perPage
      const end = start + this.perPage
      return this.filteredRepos.slice(start, end)
    },
    totalPages() {
      return Math.ceil(this.filteredRepos.length / this.perPage)
    }
  },
  methods: {
    fetchRepos() {
      axios
        .get('https://api.github.com/users/omarologyy/repos')
        .then((response) => {
          this.repos = response.data
        })
        .catch((error) => {
          console.error(error)
        })
    },
    createRepo() {
      if (this.newRepoName.trim() === '') {
        alert('Repository name cannot be empty.')
        return
      }

      const token = process.env.VUE_APP_GITHUB_TOKEN

      axios
        .post(
          'https://api.github.com/user/repos',
          {
            name: this.newRepoName
          },
          {
            headers: {
              Authorization: `token ${token}`
            }
          }
        )
        .then((response) => {
          this.repos.push(response.data)
          this.newRepoName = ''
        })
        .catch((error) => {
          console.error(error)
        })
    },
    deleteRepo(repoName) {
      const token = process.env.VUE_APP_GITHUB_TOKEN

      axios
        .delete(`https://api.github.com/repos/omarologyy/${repoName}`, {
          headers: {
            Authorization: `token ${token}`
          }
        })
        .then(() => {
          this.repos = this.repos.filter((repo) => repo.name !== repoName)
        })
        .catch((error) => {
          console.error(error)
        })
    },
    prevPage() {
      if (this.page > 1) this.page--
    },
    nextPage() {
      if (this.page < this.totalPages) this.page++
    },
    goToPage(n) {
      this.page = n
    },
    search() {
      this.page = 1
    }
  },
  watch: {
    '$route.query.search'(newSearchQuery) {
      this.searchQuery = newSearchQuery || ''
      this.search()
    }
  },
  created() {
    this.fetchRepos()
    this.searchQuery = this.$route.query.search || ''
  }
}
</script>

<style>
.repo-list {
  margin: 20px;
}

.create-repo {
  margin-bottom: 20px;
}

.repo {
  margin: 10px 0;
}

.pagination {
  margin-top: 20px;
}

.page-number {
  margin: 0 5px;
  cursor: pointer;
}

.page-number.active {
  font-weight: bold;
}

.repo-link {
  text-decoration: none;
  color: black;
}

.repo-link:hover {
  text-decoration: underline;
}
</style>
