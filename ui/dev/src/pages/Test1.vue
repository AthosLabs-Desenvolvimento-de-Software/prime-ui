<template>
  <q-page padding>
    <BuscarVenda :type="1" :id-terminal="6" :api="api" @pdv="selectSale" />
  </q-page>
</template>

<script>
export default {
  setup () {
    function selectSale (val) {
      console.log('pdv', val)
    }

    return {
      selectSale,
      api: process.env.API
    }
  }
}
</script>

<style lang="sass" scoped>
.directive-target
  width: 50px
  height: 50px
</style>
