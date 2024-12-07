<template>
  <div class="modal-custom">
    <div class="modal-custom-content">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component } from "vue-property-decorator";

@Component
export default class ModalCustom extends Vue {
  @Prop({ type: Function, required: false }) readonly onChange?: (
    value: unknown
  ) => void;
}
</script>

<style>
.modal-custom {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-custom-content {
  padding: 16px;
}
</style>
