import { h } from 'vue'
import { QBadge } from 'quasar'

export default {
  name: 'BuscarVenda',

  setup () {
    return () => h(QBadge, {
      class: 'BuscarVenda',
      label: 'BuscarVenda'
    })
  }
}
