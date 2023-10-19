import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SearchView from '../views/SearchView.vue'
import LibraryView from '../views/LibraryView.vue'
import LoginView from '../views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      component: LoginView
    },
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/home',
      component: HomeView
    },
    {
      path: '/search',
      component: SearchView
    },
    {
      path: '/types/:id',
      component: LibraryView
    },
    {
      path: '/singers/:id',
      component: LibraryView
    }
  ]
})

export default router
