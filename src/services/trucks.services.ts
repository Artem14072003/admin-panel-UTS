import axiosConfig from "./axiosConfig.ts";
import {FieldValues} from "react-hook-form";

class TrucksServices {

    async getCSRF () {
        return await axiosConfig.get('/sanctum/csrf-cookie')
    }

    async getTrucks() {
        return await (await (axiosConfig.get('/api/catalog'))).data
    }

    async getTruck(id: number) {
        return await (await (axiosConfig.get(`/api/catalog/${id}`))).data
    }

    async setTruck(data: FieldValues) {
        await this.getCSRF()
        return await axiosConfig.post('/api/catalog', data)
    }

    async updateTruck(id:number, data: FieldValues) {
        await this.getCSRF()
        return await axiosConfig.patch(`/api/catalog/${id}`, data)
    }

    async delTruck(id: number) {
        return await axiosConfig.delete(`/api/catalog/${id}`)
    }

}

export const trucksServices = new TrucksServices();