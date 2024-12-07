<template>
  <button class="button-custom" @click="handleClick">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { Vue, Prop, Component } from "vue-property-decorator";
@Component
export default class ButtonCustom extends Vue {
  @Prop({ type: Function, required: false }) readonly onClick?: () => void;

  handleClick(e: MouseEvent) {
    if (this.onClick) {
      this.onClick()
    }

    const button = e.currentTarget as HTMLElement;
    const ripple = document.createElement("span");

    ripple.classList.add("ripple");

    button.appendChild(ripple);

    const x = e.clientX - button.offsetLeft;
    const y = e.clientY - button.offsetTop;

    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    setTimeout(() => {
      ripple.remove();
    }, 300);
  }
}
</script>

<style lang="css">
.button-custom {
  font-family: "Noto Sans Thai", sans-serif;
  padding: 12px 16px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  color: #fff;
  font-weight: 500;
  background-color: #5247bb;
  font-size: 16px;
  transition: background-color 0.15s ease-in-out;

  position: relative;
  overflow: hidden;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
}
.button-custom:hover {
  background-color: #3b3097;
}
.button-custom span {
  position: absolute;
  border-radius: 50%;
  background-color: rgba(252, 252, 252, 0.3);

  width: 100px;
  height: 100px;
  margin-top: -50px;
  margin-left: -50px;

  animation: ripple 1s;
  opacity: 0;
}
@keyframes ripple {
  from {
    opacity: 1;
    transform: scale(0);
  }

  to {
    opacity: 0;
    transform: scale(10);
  }
}
</style>
