// https://umijs.org/config/
import os from 'os';
import slash from 'slash2';
import pageRoutes from './router.config';
// import webpackPlugin from './plugin.config';
import defaultSettings from '../src/defaultSettings';

const { pwa, primaryColor, basePath, appName } = defaultSettings;
const { APP_TYPE, TEST } = process.env;

const plugins = [
  [
    'umi-plugin-react',
    {
      antd: true,
      dva: {
        hmr: true,
      },
      locale: false,
      dynamicImport: {
        loadingComponent: './components/PageLoading/index',
        webpackChunkName: true,
        level: 3,
      },
      pwa: pwa
          ? {
            workboxPluginMode: 'InjectManifest',
            workboxOptions: {
              importWorkboxFrom: 'local',
            },
          }
          : false,
      ...(!TEST && os.platform() === 'darwin'
          ? {
            dll: {
              include: ['dva', 'dva/router', 'dva/saga', 'dva/fetch'],
              exclude: ['@babel/runtime', 'netlify-lambda'],
            },
            hardSource: false,
          }
          : {}),
    },
  ],
  [
    'umi-plugin-locale-paik',
    {
      baseNavigator: true,
      locale: {
        momentMap: { zh: 'zh-cn', en: 'en-nz', ru: 'ka' },
        antdMap: { en: 'en_US', zh: 'zh_CN', ru: 'ru_RU' },
      },
      translate: true,
      dynamicIntl: true,
      transLateSupport: {
        // translate 为 true, 才有效，默认四种国际化语言，如果不需要这么多，后续再优化 ~~~
        enUS: 'en-US',
        zhCN: 'zh-CN',
      },
    },
  ],
];

// 针对 preview.pro.ant.design 的 GA 统计代码
// 业务上不需要这个
if (APP_TYPE === 'site') {
  plugins.push([
    'umi-plugin-ga',
    {
      code: 'UA-72788897-6',
    },
  ]);
}

export default {
  // add for transfer to umi
  plugins,
  define: {
    APP_TYPE: APP_TYPE || '',
  },
  base: `${basePath}/${appName}/`,
  publicPath: `${basePath}/${appName}/`,
  treeShaking: true,
  targets: {
    ie: 9,
  },
  // 路由配置
  routes: pageRoutes,
  // Theme for antd
  // https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': primaryColor,
  },
  proxy: {
    '/ecare/webs/': {
      target: 'http://172.16.25.133/',
      changeOrigin: true,
      pathRewrite: { '^/ecare/webs': '/webs' },
    },
    '/cms-portal-service/webs': {
      target: 'http://172.16.25.133/',
      changeOrigin: true,
      pathRewrite: { '^/cms-portal-service/webs': '/cms-portal-service/webs' },
    },
    '/user-center': {
      target: 'http://172.16.25.133/',
      changeOrigin: true,
      pathRewrite: { '^/user-center': '/user-center' },
    },
    '/eshopweb': {
      target: 'http://172.16.25.133/',
      changeOrigin: true,
      pathRewrite: { '^/eshopweb': '/eshopweb' },
    },
    '/get/resource': {
      target: 'http://172.16.25.133/',
      changeOrigin: true,
      pathRewrite: { '^/get/resource': '/get/resource' },
    }
  },
  ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  disableRedirectHoist: true,
  cssLoaderOptions: {
    modules: true,
    getLocalIdent: (context, localIdentName, localName) => {
      if (
          context.resourcePath.includes('node_modules') ||
          context.resourcePath.includes('ant.design.pro.less') ||
          context.resourcePath.includes('global.less')
      ) {
        return localName;
      }
      const match = context.resourcePath.match(/src(.*)/);
      if (match && match[1]) {
        const antdProPath = match[1].replace('.less', '');
        const arr = slash(antdProPath)
            .split('/')
            .map(a => a.replace(/([A-Z])/g, '-$1'))
            .map(a => a.toLowerCase());
        return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-');
      }
      return localName;
    },
  },
  manifest: {
    basePath: '/portal-web/',
  },

  // chainWebpack: webpackPlugin,
};
