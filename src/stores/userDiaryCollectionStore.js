import { defineStore } from "pinia";
import config from "../../config.json";
import axios from "axios";

export const useUserDiaryCollectionStore = defineStore(
    "userDiaryCollectionStore",
    {
        state: () => ({}),
        getters: {},
        actions: {
            async getUserDiary() {
                try {
                    const token = localStorage.getItem("token");
                    const response = await axios.get(
                        `${config.BACKEND_URL}/users/profile-diary`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                    return response.data;
                } catch (error) {
                    console.error(error.response.data);
                }
            },
            async saveDiaryEntry(content, date) {
                try {
                    const token = localStorage.getItem("token");
                    const response = await axios.post(
                        `${config.BACKEND_URL}/diary/record`,
                        {
                            content: content,
                            date: date,
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                    return response;
                } catch (error) {
                    console.error("Error saving diary entry:", error);
                }
            },
            async deleteDiaryEntry(diaryId) {
                try {
                    const token = localStorage.getItem("token");
                    // const diaryId = this.diaries[index]._id;
                    const response = await axios.delete(
                        `${config.BACKEND_URL}/diary/record/${diaryId}`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                    return response;
                } catch (error) {
                    console.error(error.response.data);
                }
            },
        },
    }
);
