module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/ccsp-portal/'
    : '/',
  transpileDependencies: [
    "vuetify"
  ]
}