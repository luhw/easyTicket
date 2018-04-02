// https://github.com/michael-ciniawsky/postcss-load-config
module.exports = {
  "plugins": {
    "postcss-import": {},
    "postcss-url": {},
    // to edit target browsers: use "browserslist" field in package.json
    "autoprefixer": {},
    "postcss-functions": {
      functions: {
        px2rem: function(px) {
          var designWidth = 750
          return px * 320 / designWidth / 20 + 'rem'
        }
      }
    }
  }
}
