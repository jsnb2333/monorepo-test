<script setup>
import { reactive } from "vue";
import { UserOutlined, KeyOutlined } from "@ant-design/icons-vue";
import { BsImg } from "@shared/components";
import { useI18n } from "vue-i18n";

const { t, rulesT } = useI18n();

const emits = defineEmits(["submit"]);
const props = defineProps({
  loading: Boolean,
});

const formState = reactive({
  username: "",
  password: "",
});

const rules = reactive({
  username: [{ required: true, message: rulesT.input(t("login.username")) }],
  password: [{ required: true, message: rulesT.input(t("login.password")) }],
});


function handleSubmit() {
  emits("submit", formState);
}
</script>

<template>
  <div class="h100vh">
    <div class="login">
      <div class="login-header">
        <BsImg src="/login/logo.svg" />
      </div>
      <div class="login-body">
        <a-form
          layout="vertical"
          :model="formState"
          name="basic"
          autocomplete="off"
          @finish="handleSubmit"
        >
          <a-form-item
            :label="t('login.username')"
            name="username"
            :rules="rules.username"
          >
            <a-input v-model:value="formState.username">
              <template #addonAfter> <UserOutlined /> </template
            ></a-input>
          </a-form-item>

          <a-form-item
            :label="t('login.password')"
            name="password"
            :rules="rules.password"
          >
            <a-input-password v-model:value="formState.password">
              <template #addonAfter> <KeyOutlined /> </template
            ></a-input-password>
          </a-form-item>

          <div class="buttons">
            <a-button
              type="primary"
              html-type="submit"
              :loading="props.loading"
              >{{ t("login.login") }}</a-button
            >
          </div>
        </a-form>
      </div>
    </div>
    <div class="login_bottom">
      <BsImg src="/login/bottom.svg" />
    </div>
  </div>
</template>

<style scoped lang="less">
.h100vh {
  height: 100vh;
  background-color: #fff;
  position: relative;
  overflow: hidden;
}
.login {
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  transition: box-shadow 0.35s;
  border: 0;
  border-radius: 12px;
  margin: 80px auto;
  width: 450px;
  overflow: hidden;
  z-index: 99;
  background-color: #fff;
}
.login-header {
  height: 80px;
  background-color: #222222;
  padding: 10px 15px;
  display: flex;
  justify-content: center;
  img {
    width: 400px;
  }
}
.login-body {
  padding: 20px;
}
.login_bottom {
  position: fixed;
  bottom: 0;
  height: 33.33vh;
  width: 100%;
  display: flex;
  align-items: flex-end;
  img {
    // height: 100%;
    width: 100%;
  }
}
.buttons {
  display: flex;
}
</style>
