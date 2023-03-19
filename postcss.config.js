import cssnano from 'cssnano'
import autoprefixer from 'autoprefixer'
import flexbugs from 'postcss-flexbugs-fixes'
import postcssCalc from 'postcss-calc'
import postcssPresetEnv from 'postcss-preset-env'
import merge from 'postcss-merge-rules'
import convert from 'postcss-convert-values'

export default {
  plugins: [
    convert,
    postcssCalc,
    flexbugs,
    autoprefixer,
    postcssPresetEnv,
    merge,
    cssnano({ preset: 'advanced' }),
  ],
}
