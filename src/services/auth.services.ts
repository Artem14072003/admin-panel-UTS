import axiosConfig from "./axiosConfig.ts";
import {AxiosError} from "axios";
import {FieldValues} from "react-hook-form";

class AuthServices {

    async getCSRF() {
        return await axiosConfig.get('/sanctum/csrf-cookie')
    }

    async getUser() {
        try {
            return await (await (axiosConfig.get('/api/admin'))).data[0]
        } catch (e) {
            if (e instanceof AxiosError) {
                if (e.response && e.response.status === 401) {
                    localStorage.removeItem('auth');
                    window.location.replace('/')
                }
            }
        }
    }

    async authAdmin(data: FieldValues) {
        await this.getCSRF()
        await axiosConfig.post('/login', data)
        return await this.getUser()
    }

    async update(data: FieldValues) {
        return await axiosConfig.patch('/api/admin/update', data)
    }

    async logout() {
        await axiosConfig.post('/logout')
    }
}

export const authServices = new AuthServices();