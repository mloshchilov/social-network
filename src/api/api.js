import * as axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': 'вставьте ключ доступа'
    }
});

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`).then(response => response.data);
    },
    follow(userId) {
        return instance.post(`follow/${userId}`).then(response => response.data);
    },
    unfollow(userId) {
        return instance.delete(`follow/${userId}`).then(response => response.data);
    }
};

export const authAPI = {
    getAuthData() {
        return instance.get(`auth/me`).then(response => response.data);
    },
    login(email, password, rememberMe = false, captcha = null) {
        return instance.post(`auth/login`, { email, password, rememberMe, captcha }).then(response => response.data);
    },
    logout() {
        return instance.delete(`auth/login`).then(response => response.data);
    }
};

export const profileAPI = {
    getUserData(userId) {
        return instance.get(`profile/${userId}`).then(response => response.data);
    },
    getStatus(userId) {
        return instance.get(`profile/status/${userId}`).then(response => response.data);
    },
    updateStatus(status) {
        return instance.put(`profile/status`, {status: status}).then(response => response.data);
    },
    updatePhoto(photo) {
        const formData = new FormData();
        formData.append('image', photo);
        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-type': 'multipart/form-data'
            }
        }).then(response => response.data);
    },
    updateProfile(profile) {
        return instance.put(`profile`, profile);
    }
}

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get(`security/get-captcha-url`).then(response => response.data);
    }
}