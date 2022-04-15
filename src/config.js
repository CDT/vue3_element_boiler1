export const SYSTEM_TITLE = '互联互通备胎'
export const API_BASE = 'http://localhost:3000'
export const TOKEN_NAME = 'access_token'

export const config = {
  system_title: SYSTEM_TITLE
}

export default {
  install: app => {
    app.config.globalProperties.$config = config
  }
}