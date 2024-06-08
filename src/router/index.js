import { createRouter, createWebHistory } from 'vue-router'
import RepoLayout from '../components/RepoLayout.vue'
import RepoList from '../components/RepoList.vue'
import RepoDetail from '../components/RepoDetail.vue'
import ErrorComponent from '../components/ErrorComponent.vue'
import NotFound from '../components/NotFound.vue'

const routes = [
  {
    path: '/',
    component: RepoLayout,
    children: [
      { path: '', name: 'RepoList', component: RepoList },
      { path: 'repo/:name', name: 'RepoDetail', component: RepoDetail },
      { path: 'test-error', name: 'ErrorComponent', component: ErrorComponent }
    ]
  },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
