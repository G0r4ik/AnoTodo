import flexbugs from 'postcss-flexbugs-fixes'
import convert from 'postcss-convert-values'
import presentEnv from 'postcss-preset-env'
import autoprefixer from 'autoprefixer'
import merge from 'postcss-merge-rules'
import calc from 'postcss-calc'
import cssnano from 'cssnano'

export default {
  plugins: [
    convert,
    calc,
    flexbugs,
    autoprefixer,
    presentEnv,
    merge,
    cssnano({ preset: 'default' }),
  ],
}
