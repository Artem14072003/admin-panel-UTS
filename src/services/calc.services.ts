import axiosConfig from "./axiosConfig.ts";
import {FieldValues} from "react-hook-form";

class CalcServices {

    async getCalc() {
        try {
            return await axiosConfig.get('/api/calculators')
        } catch (e) {
            console.error(e)
        }
    }

    async setTruck(data: FieldValues) {
        return await axiosConfig.post('/api/calculators', data)
    }

}

export const calcServices = new CalcServices();