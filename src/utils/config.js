export const config = {
  system_title: '管理系统'
}

export default {
  install: app => {
    app.config.globalProperties.$config = config
  }
}