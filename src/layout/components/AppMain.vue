<template>
  <section class="app-main">
    <transition
      name="fade-transform"
      mode="out-in"
    >
      <router-view />
    </transition>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'AppMain'
})
export default class extends Vue {}
</script>

<style lang="scss" scoped>
.app-main {
  display: flex;
  flex-direction: column;
  // position: absolute;
  min-height: 100%;
  padding: 0 $gapNormal $gapNormal;
  overflow: hidden;
}
</style>
