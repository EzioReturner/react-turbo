import { RouteConfig, RouteChild } from '@models/index';
export const constantRouteConfig: { app: RouteConfig; user: RouteConfig } = {
  app: {
    path: '/',
    component: ['/layout/MainLayout', 'fadeRA'],
    authority: ['admin', 'guest'],
    routes: []
  },
  user: {
    path: '/user',
    component: ['/layout/UserLayout', 'fadeRA'],
    routes: [
      {
        name: 'Login',
        path: '/user/login',
        component: ['/views/User/Login']
      }
    ]
  }
};

export const asyncRouteConfig: RouteChild[] = [
  {
    name: 'dashboard',
    icon: 'pie-chart',
    path: '/dashboard',
    component: ['/views/Dashboard'],
    loading: true
  },
  {
    path: '/',
    exact: true,
    redirect: '/dashboard',
    hideMenu: true
  },
  {
    name: 'program',
    icon: 'appstore',
    path: '/program',
    routes: [
      {
        name: 'analysis',
        path: '/program/analysis',
        component: ['/views/Program/Analysis'],
        authority: ['admin'],
        loading: true
      },
      {
        name: 'monitor',
        path: '/program/monitor',
        component: ['/views/Program/Monitor'],
        loading: true
      },
      {
        name: 'platform',
        path: '/program/platform',
        component: ['/views/Program/Platform'],
        loading: true
      }
    ]
  },
  {
    name: 'form',
    icon: 'form',
    path: '/form',
    routes: [
      {
        name: 'basicForm',
        path: '/form/basicForm',
        component: ['/views/Form/BasicForm'],
        authority: ['admin'],
        loading: true
      },
      {
        name: 'stepForm',
        path: '/form/stepForm',
        component: ['/views/Form/StepForm']
      },
      {
        name: '三级菜单',
        path: '/form/test',
        routes: [
          {
            name: '三级菜单',
            path: '/form/test/test1',
            component: ['/views/Form/TestDetail']
          }
        ]
      }
    ]
  },
  {
    name: 'list',
    icon: 'ordered-list',
    path: '/list',
    routes: [
      {
        name: 'basicList',
        path: '/list/basicList',
        component: ['/views/List/BasicList'],
        loading: true
      },
      {
        name: 'cardList',
        path: '/list/cardList',
        component: ['/views/List/CardList'],
        loading: true
      },
      {
        name: 'basicTable',
        path: '/list/basicTable',
        component: ['/views/List/BasicTable']
      }
    ]
  },
  {
    name: 'map',
    icon: 'heat-map',
    path: '/map',
    component: ['/views/Map'],
    authority: ['admin']
  },
  {
    name: 'gallery',
    icon: 'picture',
    path: '/gallery',
    component: ['/views/Gallery'],
    authority: ['admin']
  },
  {
    name: 'result',
    icon: 'check-circle',
    path: '/result',
    routes: [
      {
        name: 'successResult',
        path: '/result/successResult',
        component: ['/views/Result/SuccessResult']
      },
      {
        name: 'failedResult',
        path: '/result/failedResult',
        component: ['/views/Result/FailedResult']
      }
    ]
  },
  {
    name: 'exception',
    icon: 'warning',
    path: '/exception',
    routes: [
      {
        name: '403',
        path: '/exception/403',
        component: ['/views/Exception/403', 'bounceIn-animated']
      },
      {
        name: '404',
        path: '/exception/404',
        component: ['/views/Exception/404']
      },
      {
        name: '500',
        path: '/exception/500',
        component: ['/views/Exception/500']
      },
      {
        name: 'index',
        path: '/exception/home',
        component: ['/views/Exception'],
        hideMenu: true
      }
    ]
  }
];
