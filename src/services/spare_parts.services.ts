import axiosConfig from "./axiosConfig.ts";
import {FieldValues} from "react-hook-form";

class SparePartsServices {

    async getCSRF () {
        return await axiosConfig.get('/sanctum/csrf-cookie')
    }

    async getSpareParts() {
        return await (await (axiosConfig.get('/api/spare-parts'))).data
    }

    async getSparePart(id: number) {
        return await (await (axiosConfig.get(`/api/spare-parts/${id}}`))).data
    }

    async setSparePart(data: FieldValues) {
        await this.getCSRF()
        return await axiosConfig.post('/api/spare-parts', data)
    }

    async updateSparePart(id: number, data: FieldValues) {
        await this.getCSRF()
        return await axiosConfig.post(`/api/spare-parts/${id}`, data)
    }

    async delSparePart(id: number) {
        return await axiosConfig.delete(`/api/spare-parts/${id}`)
    }

}

export const sparePartsServices = new SparePartsServices();