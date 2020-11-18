// module.exports = (file: string) => () => import(/* webpackChunkName: "[request]" */ `@/views${file}.vue`)


module.exports = (file: string) => (resolve: any) => require([`@/views${file}.vue`], resolve)

