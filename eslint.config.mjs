// @ts-check
import { FlatCompat } from "@eslint/eslintrc"
import withNuxt from "./.nuxt/eslint.config.mjs"

const compat = new FlatCompat()
const tailwindCompatConfig = compat.config({
  extends: ["plugin:tailwindcss/recommended"],
  rules: { "tailwindcss/no-custom-classname": "off" },
})

export default withNuxt({

}, ...tailwindCompatConfig)
