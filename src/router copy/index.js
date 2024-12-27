import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/scan',
    name: 'scan',
    component: () => import('../views/ScanView.vue')
  },
  {
    path: '/keypad',
    name: 'keypad',
    component: () => import('../views/KeyPadView.vue')
  },
  {
    path: '/close',
    name: 'close',
    component: () => import('../views/CloseCavinet.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'home',
    component: () => import('../views/HomeView.vue') // No necesitamos por el momento una pagina de no encontrado, por eso lo envio a home
  },
  
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
