<template>
  <div class="input-custom">
    <div>
      <p class="input-label">
        {{ label }}
        <span v-if="required" style="color: red"> * </span>
      </p>
    </div>
    <input
      :class="`input-custom-base ${textHelper ? 'input-error' : ''}`"
      :placeholder="placeholder"
      @input="handleChangeInput"
      :value="value"
    />
    <div>
      <p class="input-helper">
        {{ textHelper }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component } from "vue-property-decorator";

@Component
export default class InputCustom extends Vue {
  @Prop({ type: Boolean, required: false }) readonly required?: boolean;
  @Prop({ type: String, required: false }) readonly label?: string;
  @Prop({ type: String, required: false }) readonly placeholder?: string;
  @Prop({ type: String, required: false }) readonly value?: string;
  @Prop({ type: Function, required: false }) readonly onChange?: (
    event: Event
  ) => void;
  @Prop({ type: String, required: false }) readonly textHelper?: string;

  handleChangeInput(e: Event) {
    if (this.onChange) {
      this.onChange(e);
    }
  }
}
</script>

<style lang="css">
.input-custom {
  width: 100%;
}
.input-label {
  margin: 0;
}
.input-custom-base {
  width: calc(100% - 18px);
  font-size: 16px;
  border: 1px solid #fff;
  padding: 8px;
  border-radius: 4px;
}
.input-custom-base:focus {
  outline: none;
}
.input-custom-base.input-error {
  font-size: 16px;
  color: red;
  border: 1px solid red;
  padding: 8px;
  border-radius: 4px;
}

.input-helper {
  margin: 0 0 0 8px;
  color: red;
  font-size: 13px;
}
</style>
