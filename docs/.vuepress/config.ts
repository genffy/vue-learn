import type { UserConfig, DefaultThemeOptions } from 'vuepress'

const config: UserConfig<DefaultThemeOptions> = {
  lang: 'zh-CN',
  title: 'Learn Vue By upgrade element-ui',
  description: 'Just playing around',

  themeConfig: {
    logo: 'https://vuejs.org/images/logo.png',
  },
}

export = config