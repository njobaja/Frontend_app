import { authStore } from './../stores/authStore';
import Vendors from '../views/Vendors.vue'
import NotFound from '../views/NotFound.vue'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Assets from '../views/Assets.vue'
import Profile from '@/components/Profile.vue'
import Reports from '@/views/Reports.vue'
import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import Warranty from '@/views/Warranty.vue'
const isLoggedInGuard = () => {
  return authStore.state.isLoggedIn ? true : { path: '/' };
}

const isAnonymousGuard = () => {
  return !authStore.state.isLoggedIn ? true : { path: '/login' };
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      beforeEnter: isLoggedInGuard
    },
    {
      path: '/vendors',
      name: 'vendors',
      component: Vendors
    },
    {

      path: '/Reports',
      name: 'Reports',
      component: Reports

    },
   
    {
      path: '/assets',
      name: 'assets',
      component: Assets
    },
  
    {
    path: "/:catchAll(.*)",
    name: 'Not Found',
    component: NotFound
  },
  {
    path: "/warranty",
    name: 'warranty',
    component: Warranty
  },
  
  {
    path: '/login',
    name: 'login',
    component: Login,
    beforeEnter: isAnonymousGuard
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    beforeEnter: isAnonymousGuard
  }
  ]
})

export default router

