import { defineStore } from 'pinia';

export const MainStores = defineStore('mainStores', {
  state: () => ({
    userAttestation: {
      username: '',
      password: '',
    },
    user: null,
    domainId: 1,
  }),
  actions: {
    setUserAttestation({ userFrom, user }) {
      this.userAttestation = userFrom;
      this.user = user;
      this.setLocalStorageUser(user.username);
      this.setLocalStorageIsLogin(true);
    },
    clearUserAttestation() {
      this.setLocalStorageUser('');
      this.setLocalStorageIsLogin(false);
    },
    setLocalStorageUser(username) {
      localStorage.setItem('username', username);
    },
    setLocalStorageIsLogin(is) {
      localStorage.setItem('islogin', String(is));
    },
    getLocalStorageUser() {
      return localStorage.getItem('username');
    },
    getLocalStorageIsLogin() {
      return localStorage.getItem('islogin') === 'true';
    },
    getIsLogin() {
      return [this.getLocalStorageUser(), this.getLocalStorageIsLogin()].every(
        Boolean,
      );
    },
  },
  persist: {
    enabled: true, // 启用插件
  },
});
