import { defineStore } from 'pinia';

export const MainStores = defineStore('mainStores', {
  state: () => ({
    user: {
      userId: null,
      code: null,
    },
    token: null,
  }),
  actions: {
    setUserAttestation({ token, user }) {
      this.user = user;
      this.token = token;
    },
    clearUserAttestation() {
      this.user = {
        userId: null,
        code: null,
      };
      this.token = null;
    },
  },
  persist: {
    enabled: true, // 启用插件
  },
});
