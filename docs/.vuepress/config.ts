import type { UserConfig } from 'vuepress'
import type { DefaultThemeOptions } from '@vuepress/theme-default'
import { name } from '../../package.json'
const config: UserConfig<DefaultThemeOptions> = {
  base: `/${name}/`,
  lang: 'zh-CN',
  title: 'Learn Vue By Upgrade Element-ui',
  description: 'Just playing around',

  themeConfig: {
    logo: 'https://vuejs.org/images/logo.png',
  },
}

export = config