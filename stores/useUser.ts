import {defineStore} from 'pinia';
import {useCookie} from '#app';

interface User {
    username: string;
}

interface UserState {
    user: User | null;
}

export const useUserStore = defineStore('user', {
    state: (): UserState => ({
        user: null,
    }),
    getters: {
        isAuthenticated: (state) => !!state.user,
        getUser: (state) => state.user,
    },
    actions: {
        async login(username: string, password: string) {
            try {
                const response = await $fetch<User>('/api/login', {
                    method: 'POST',
                    body: {username, password},
                });

                this.user = response;
            } catch (error) {
                console.error('Login failed', error);
                throw new Error('Login failed');
            }
        },
        async updateMe() {
            try {
                const response = await $fetch<User>('/api/auth/me');
                this.user = response;
            } catch (error) {
                console.error('Update me failed', error);
                throw new Error('Update me failed');
            }
        },
        async logout() {
            try {
                await $fetch('/api/auth/logout', {
                    method: 'POST',
                });
                this.user = null;
                useCookie('Authorization').value = null;
            } catch (error) {
                console.error('Logout failed', error);
                throw new Error('Logout failed');
            }
        },
    },
});
