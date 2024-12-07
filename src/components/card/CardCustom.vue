<template>
  <div class="card-custom">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component } from "vue-property-decorator";

@Component
export default class CardCustom extends Vue {}
</script>

<style>
.card-custom {
  border-radius: 4px;
  background-color: #a7a6ca;
  width: auto;
  height: auto;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
}
</style>
