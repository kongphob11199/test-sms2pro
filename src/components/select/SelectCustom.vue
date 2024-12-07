<template>
  <div class="select-custom">
    <ButtonCustom class="btn-select-custom" :onClick="handleOpenOption">
      <div class="box-btn-select-custom">
        {{ value }}
        <div
          class="icon-end"
          :style="{ transform: isOpen ? 'rotate(180deg)' : '' }"
        >
          <img :src="IconExpand" alt="Expand Icon" />
        </div>
      </div>
    </ButtonCustom>

    <div v-if="isOpen" class="select-custom-options">
      <ul>
        <li
          v-for="(option, index) in options"
          :key="index"
          @click="() => handleChangeValue(option)"
        >
          <p>
            {{ option.label }}
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component } from "vue-property-decorator";
import ButtonCustom from "@/components/button/ButtonCustom.vue";

@Component({
  components: {
    ButtonCustom,
  },
})
export default class SelectCustom extends Vue {
  @Prop({ type: Function, required: false }) readonly onChange?: (
    value: unknown
  ) => void;
  @Prop({ type: String, required: false }) readonly value?: string;
  @Prop({ type: Array, required: false }) readonly options?: {
    label: string;
    value: unknown;
  }[];

  isOpen = false;
  IconExpand = require("@/assets/icons/icon-expand.png");

  handleChangeValue(e: { label: string; value: unknown }) {
    if (this.onChange) {
      this.onChange(e.value);
      this.isOpen = false
    }
  }

  handleOpenOption(e: MouseEvent) {
    this.isOpen = !this.isOpen;
  }

  handleClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!this.$el.contains(target)) {
      this.isOpen = false;
    }
  }

  mounted() {
    document.addEventListener("click", this.handleClickOutside);
  }

  beforeDestroy() {
    document.removeEventListener("click", this.handleClickOutside);
  }
}
</script>

<style lang="css">
.select-custom {
  min-width: 150px;
}

.select-custom-options {
  z-index: 2;
  min-width: 150px;
  position: fixed;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}
.select-custom-options ul {
  padding: 0;
  margin: 0;
  list-style-type: none;
  display: flex;
  flex-direction: column;
}

.select-custom-options ul li {
  cursor: pointer;
  padding: 8px;
  transition: background-color 0.15s ease-in-out;
}

.select-custom-options ul li p {
  margin: 0;
  font-size: 16px;
}

.select-custom-options ul li:hover {
  background-color: #cbcaf1a4;
}

.btn-select-custom {
  width: 100%;
  background-color: #abaacc;
  color: #000000;
}

.btn-select-custom:hover {
  background-color: #7e7da0;
}

.box-btn-select-custom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.box-btn-select-custom .icon-end {
  height: 16px;
}

.box-btn-select-custom .icon-end img {
  height: 16px;
  /* filter: invert(100%) brightness(200%); */
}
</style>
