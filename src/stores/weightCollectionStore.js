import { defineStore } from "pinia";
import config from "../../config.json";
import axios from "axios";

export const useWeightCollectionStore = defineStore("weightCollectionStore", {
    state: () => ({}),
    getters: {},
    actions: {
        async recordWeight(weight) {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.post(
                    `${config.BACKEND_URL}/weight/record`,
                    {
                        weight: weight,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                return response;
            } catch (error) {
                console.error("Error saving weight:", error);
            }
        },
        async updateChart() {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(
                    `${config.BACKEND_URL}/weight`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                return response;
            } catch (error) {
                console.error("Error fetching weights:", error);
            }
        },
    },
});
