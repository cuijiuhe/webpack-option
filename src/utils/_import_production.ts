module.exports = (file: string) => () => import(/* webpackChunkName: "[request]" */ `@/views${file}.vue`)
