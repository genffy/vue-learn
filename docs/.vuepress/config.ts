import type { UserConfig } from 'vuepress'
import type { DefaultThemeOptions } from '@vuepress/theme-default'
import { name } from '../../package.json'
const config: UserConfig<DefaultThemeOptions> = {
  base: `/${name}/`,
  lang: 'zh-CN',
  title: 'Learn Vue',
  description: 'Just playing around',
  theme: '@vuepress/theme-default',
  themeConfig: {
    logo: '/images/vue.svg',
    navbar: [
      // NavbarItem
      {
        text: 'Github',
        link: 'https://github.com/genffy',
      },
      {
        text: 'Email',
        link: 'mailto:lee.genffy@gmail.com',
      },
      {
        text: 'DM',
        link: 'https://t.me/genffy',
      }
    ],
  },
  head: [['link', { rel: 'icon', href: '/images/vue.svg' }]],
}

export = config