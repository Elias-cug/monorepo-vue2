import {
  defineConfig,
  presetAttributify,
  presetUno,
  presetWind,
  transformerVariantGroup,
  transformerDirectives
} from "unocss"

export default defineConfig({
  presets: [presetAttributify(), presetUno(), presetWind()],
  transformers: [transformerDirectives(), transformerVariantGroup()]
})
