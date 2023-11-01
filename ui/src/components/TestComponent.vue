<template>
  <div>
    <h1>Novo teste</h1>
  </div>
</template>
<script>
export default {
  name: "BuscarVenda",

  computed() {
    console.log("oi");
    this.test();
  },

  methods: {
    async test() {
      await console.log("teste");
    },
  },
};
</script>
