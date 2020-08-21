// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';

const { REACT_APP_ENV } = process.env;
export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    // default true, when it is true, will use `navigator.language` overwrite default
    antd: true,
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/user',
      component: '../layouts/UserLayout',
      routes: [
        {
          name: 'login',
          path: '/user/login',
          component: './user/login',
        },
      ],
    },
    {
      path: '/',
      component: '../layouts/SecurityLayout',
      routes: [
        {
          path: '/',
          component: '../layouts/BasicLayout',
          authority: ['admin', 'user'],
          routes: [
            {
              path: '/',
              redirect: '/welcome',
            },
            {
              path: '/welcome',
              name: 'welcome',
              icon: 'smile',
              component: './Welcome',
            },
            {
              path: '/admin',
              name: 'admin',
              icon: 'crown',
              component: './Admin',
              authority: ['admin'],
              routes: [
                {
                  path: '/admin/sub-page',
                  name: 'sub-page',
                  icon: 'smile',
                  component: './Welcome',
                  authority: ['admin'],
                },
              ],
            },
            {
              path: '/list/:resourceName',
              component: './CommonList',
              hideInMenu: true,
            },
            {
              name: 'list.orgn-list',
              icon: 'ApartmentOutlined',
              path: '/list/orgn',
            },
            {
              name: 'list.class-list',
              icon: 'TeamOutlined',
              path: '/list/class',
            },
            {
              name: 'list.course-list',
              icon: 'BookOutlined',
              path: '/list/course',
            },
            {
              // 考试
              name: 'list.test-list',
              icon: 'FormOutlined',
              path: '/test',
              component: './test/List',
            },
            {
              // 创建考试
              path: '/test/edit',
              component: './test/Edit',
              hideInMenu: true,
            },
            {
              // 编辑考试
              path: '/test/edit/:testId',
              component: './test/Edit',
              hideInMenu: true,
            },
            {
              // 作业
              name: 'list.homework-list',
              icon: 'CopyOutlined',
              path: '/homework',
              component: './homework/List',
            },
            {
              // 创建作业
              path: '/homework/edit',
              component: './homework/Edit',
              hideInMenu: true,
            },
            {
              // 编辑作业
              path: '/homework/edit/:homeworkId',
              component: './homework/Edit',
              hideInMenu: true,
            },
            {
              name: 'list.question-list',
              icon: 'EditOutlined',
              routes: [
                {
                  name: 'list',
                  path: '/question/list',
                  component: './question/List',
                },
                {
                  // 创建
                  name: 'edit',
                  path: '/question/edit',
                  component: './question/Edit',
                },
                {
                  // 编辑
                  name: 'edit',
                  path: '/question/edit/:questionId',
                  component: './question/Edit',
                  hideInMenu: true,
                },
                {
                  name: 'check',
                  path: '/question/check',
                  component: './question/Check',
                },
              ],
            },

            {
              name: 'list.table-list',
              icon: 'table',
              path: '/list/rule',
            },
            {
              component: './404',
            },
          ],
        },
        {
          component: './404',
        },
      ],
    },
    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  // @ts-ignore
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
});
