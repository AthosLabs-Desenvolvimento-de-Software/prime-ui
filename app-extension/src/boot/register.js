import { boot } from 'quasar/wrappers'
import VuePlugin from 'quasar-ui-prime-ui'

export default boot(({ app }) => {
  app.use(VuePlugin)
})
