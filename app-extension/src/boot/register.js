import { boot } from 'quasar/wrappers'
import * as VuePlugin from '@lennonsbueno/quasar-ui-prime-ui/src/vue-plugin'

export default boot(({ app }) => {
  app.use(VuePlugin)
})
