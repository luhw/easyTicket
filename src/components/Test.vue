<template>
  <div @click="t()">
    {{ msg }}
  </div>
</template>

<script>
export default {
  name: 'Test',
  data () {
    return {
      msg: 'test666'
    }
  },
  methods: {
    t: () => {
      alert('t')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
