import { createRouter, createWebHistory } from 'vue-router'
import { supabase } from '../clients/supabase'
import UnauthorizedView from '../views/UnauthorizedView.vue'

let localUser;

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue')
    },
    {
      path: '/cadastro',
      name: 'cadastro',
      component: () => import('@/views/CadastroView.vue')
    },
    {
      path: '/esqueci-minha-senha',
      name: 'esqueci-minha-senha',
      component: () => import('@/views/PasswordView.vue')
    },
    {
      path: '/resgatar-acesso',
      name: 'resgatar-acesso',
      component: () => import('@/views/RestoreView.vue')
    },
    {
      path: '/afiliar-cliente',
      name: 'afiliar-cliente',
      component: () => import('@/views/empresas/galeradapa263/afiliar-cliente/index.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/views/dashboard/index.vue'),
	    meta: { requiresAuth: true },
      children: [
        // PARA TODAS AS ROLES
        {
          path: '/dashboard',
          name: 'dashboard',
          component: () => import('@/views/dashboard/view.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/configuracoes',
          name: 'configuracoes',
          component: () => import('@/views/configuracao/config.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/funcionarios',
          name: 'funcionarios',
          component: () => import('@/views/funcionario/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/novo-acesso',
          name: 'novo-acesso',
          component: () => import('@/views/novo-acesso/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/github',
          name: 'github',
          component: () => import('@/views/github/index.vue'),
          meta: { requiresAuth: true }
        },
        // GALERA DA PA 263 (24/01/2025)
        {
          path: '/produtos-galera-da-pa',
          name: 'produtos-galera-da-pa',
          component: () => import('@/views/empresas/galeradapa263/produtos/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/clientes-galera-da-pa',
          name: 'clientes-galera-da-pa',
          component: () => import('@/views/empresas/galeradapa263/clientes/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/carteira-galera-da-pa',
          name: 'carteira-galera-da-pa',
          component: () => import('@/views/empresas/galeradapa263/carteira/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/todo-galera-da-pa',
          name: 'todo-galera-da-pa',
          component: () => import('@/views/empresas/galeradapa263/todo/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/marca-galera-da-pa',
          name: 'marca-galera-da-pa',
          component: () => import('@/views/empresas/galeradapa263/marca/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/banners-galera-da-pa',
          name: 'banners-galera-da-pa',
          component: () => import('@/views/empresas/galeradapa263/banners/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/pagamento-galera-da-pa',
          name: 'pagamento-galera-da-pa',
          component: () => import('@/views/empresas/galeradapa263/pagamento/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/vendas-galera-da-pa',
          name: 'vendas-galera-da-pa',
          component: () => import('@/views/empresas/galeradapa263/vendas/index.vue'),
          meta: { requiresAuth: true }
        },
        // POSTO ROTA (A DEFINIR/A DEFINIR/2025)
        {
          path: '/produtos-posto-rota',
          name: 'produtos-posto-rota',
          component: () => import('@/views/empresas/postorota/produtos/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/clientes-posto-rota',
          name: 'clientes-posto-rota',
          component: () => import('@/views/empresas/postorota/clientes/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/carteira-posto-rota',
          name: 'carteira-posto-rota',
          component: () => import('@/views/empresas/postorota/carteira/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/todo-posto-rota',
          name: 'todo-posto-rota',
          component: () => import('@/views/empresas/postorota/todo/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/marca-posto-rota',
          name: 'marca-posto-rota',
          component: () => import('@/views/empresas/postorota/marca/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/pagamento-posto-rota',
          name: 'pagamento-posto-rota',
          component: () => import('@/views/empresas/postorota/pagamento/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/novo-acesso-posto-rota',
          name: 'novo-acesso-posto-rota',
          component: () => import('@/views/empresas/postorota/novo-acesso/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/funcionarios-posto-rota',
          name: 'funcionarios-posto-rota',
          component: () => import('@/views/empresas/postorota/funcionarios/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/vendas-posto-rota',
          name: 'vendas-posto-rota',
          component: () => import('@/views/empresas/postorota/vendas/index.vue'),
          meta: { requiresAuth: true }
        },
      ]
    },
    {
      path: '/unauthorized',
      name: 'unauthorized',
      component: UnauthorizedView
    }
  ]
})

async function getUser(next) {
	localUser = await supabase.auth.getSession();
	if (localUser.data.session == null) {
		next('/unauthorized')
	}
	else {
		next();
	}
}

router.beforeEach((to, from, next) => {
	if (to.meta.requiresAuth) {
		getUser(next);
	}
	else {
		next();
	}
})

export default router;
