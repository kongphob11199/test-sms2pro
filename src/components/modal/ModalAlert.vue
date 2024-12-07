<template>
  <ModalCustom>
    <CardCustom>
      <div class="modal-alert-custom">
        <div class="modal-alert-custom-header">
          <img :src="IconError" />
        </div>
        <div class="modal-alert-custom-body">
          {{ `Do you want to delete this task?` }}
        </div>
        <div class="modal-alert-custom-footer">
          <ButtonCustom :onClick="() => handleResponse(false)"
            >Cancel</ButtonCustom
          >
          <ButtonCustom :onClick="() => handleResponse(true)"
            >Confirm</ButtonCustom
          >
        </div>
      </div>
    </CardCustom>
  </ModalCustom>
</template>

<script lang="ts">
import { Vue, Prop, Component } from "vue-property-decorator";

import ModalCustom from "./ModalCustom.vue";
import CardCustom from "../card/CardCustom.vue";
import ButtonCustom from "../button/ButtonCustom.vue";

@Component({
  components: {
    ModalCustom,
    CardCustom,
    ButtonCustom,
  },
})
export default class ModalAlertCustom extends Vue {
  @Prop({ type: Function, required: true }) readonly responseAlert?: (
    status: boolean
  ) => void;

  IconError = require("@/assets/icons/icon-error.png");

  handleResponse(status: boolean) {
    if (this.responseAlert) {
      this.responseAlert(status);
    }
  }
}
</script>

<style lang="css">
.modal-alert-custom {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
}
.modal-alert-custom-header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.modal-alert-custom-header img {
  height: 100px;
}
.modal-alert-custom-body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.modal-alert-custom-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
}
</style>
