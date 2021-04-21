import { defineConfig } from 'umi'

export default defineConfig({
  logo: '/tarojs-router-next/logo.png',
  favicon: '/tarojs-router-next/favicon.ico',
  title: ' ',
  description: '可能是最好的 Taro 路由解决方案',
  mode: 'site',
  exportStatic: {},
  base: process.env.NODE_ENV === 'production' ? '/tarojs-router-next' : '/tarojs-router-next',
  publicPath: process.env.NODE_ENV === 'production' ? '/tarojs-router-next/' : '/tarojs-router-next/',
  navs: [
    {
      title: '使用指南',
      path: '/guide',
    },
    {
      title: 'API文档',
      path: '/api',
    },
    {
      title: '示例',
      children: [
        { title: '查看代码', path: 'https://github.com/lblblong/tarojs-router-next/tree/master/examples' },
        { title: '开发者工具打开', path: 'https://developers.weixin.qq.com/s/2CcFkJmo7Dpb' },
      ],
    },
    {
      title: 'GitHub',
      path: 'https://github.com/lblblong/tarojs-router-next',
    },
  ],
})