import { defineStore } from 'pinia';
interface UserInfo {
    name: string | null;
    email: string | null;
    role: 0 | 1;
}
interface TokenInfo {
    access_token: string | null;
    refresh_token: string | null;
}

const user = defineStore('userlogin', {
    state: () => {
        return {
            userInfo: <UserInfo>{
                name: localStorage.getItem('name'),
                email: localStorage.getItem('email'),
                role: parseInt(localStorage.getItem('role')),
            },
            tokenInfo: <TokenInfo>{
                access_token: localStorage.getItem('access_token'),
                refresh_token: localStorage.getItem('refresh_token'),
            },
        };
    },
    getters: {},
    actions: {
        setuserInfo(userInfo: UserInfo) {
            console.log(userInfo);

            this.userInfo.name = userInfo.name;
            this.userInfo.email = userInfo.email;
            this.userInfo.role = userInfo.role ?? 0;
            localStorage.name = userInfo.name;
            localStorage.email = userInfo.email;
            localStorage.role = userInfo.role;
        },

        setToken(tokenInfo: TokenInfo) {
            this.tokenInfo.access_token = tokenInfo.access_token;
            this.tokenInfo.refresh_token = tokenInfo.refresh_token;
            localStorage.access_token = tokenInfo.access_token;
            localStorage.refresh_token = tokenInfo.refresh_token;
        },
        removeToken() {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            this.tokenInfo = <TokenInfo>{
                access_token: null,
                refresh_token: null,
            };
        },
        removeuserInfo() {
            localStorage.removeItem('name');
            localStorage.removeItem('email');
            this.userInfo.name = null;
            this.userInfo.email = null;
        },
    },
});
export { user };
