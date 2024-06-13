<template>
    <div class="heading">
        <img class="heading-img" src="@/assets/logorsg.jpg" alt="" />
    </div>
    <div class="main">
        <div class="naslov">
            <h1>My progress</h1>
        </div>
        <div class="align-items-center">
            <label for="datePicker" class="form-label">Select a Date:</label>
            <input
                id="datePicker"
                type="date"
                v-model="value"
                class="form-control"
            />
        </div>
        <div class="align-items-center">
            <label for="diaryEntry" class="form-label">Diary Entry:</label>
            <textarea
                id="diaryEntry"
                v-model="diaryContent"
                class="form-control"
                rows="4"
                placeholder="Write your thoughts..."
            ></textarea>
            <div class="mb-3" style="margin-top: 1vw">
                <button @click="clearForm" class="btn btn-danger me-2">
                    Clear
                </button>
                <button @click="saveEntry" class="btn btn-success">Save</button>
            </div>
        </div>
        <div class="align-items-center">
            <h2 class="naslov">Weight Tracking</h2>
            <label for="weightInput" class="form-label"
                >Enter Weight (kg):</label
            >
            <input
                id="weightInput"
                type="number"
                v-model="currentWeight"
                class="form-control"
            />
            <button
                @click="recordWeight"
                class="btn btn-primary"
                style="width: auto; margin-top: 1vw"
            >
                Record Weight
            </button>
        </div>
        <div class="weight-progress">
            <h2 class="naslov">Weight Progress</h2>
            <div>
                <canvas id="myChart" width="4000" height="700"></canvas>
            </div>
        </div>
    </div>
</template>
<script>
import Chart from "chart.js/auto";
import eventBus from "@/eventBus";
import { useUserDiaryCollectionStore } from "@/stores/userDiaryCollectionStore";
import { useWeightCollectionStore } from "@/stores/weightCollectionStore";

export default {
    name: "diaryComponent",
    data() {
        return {
            value: "",
            diaryContent: "",
            currentWeight: "",
        };
    },
    setup() {
        const userDiaryCollectionStore = useUserDiaryCollectionStore();
        const weightCollectionStore = useWeightCollectionStore();
        return { userDiaryCollectionStore, weightCollectionStore };
    },
    async created() {
        await this.updateChart();
    },
    methods: {
        clearForm() {
            this.value = "";
            this.diaryContent = "";
            this.currentWeight = "";
        },
        async saveEntry() {
            const res = await this.userDiaryCollectionStore.saveDiaryEntry(
                this.diaryContent,
                this.value
            );
            if (res) {
                this.clearForm();
                eventBus.emit("success", "Diary entry added successfully!");
            }
        },
        async recordWeight() {
            const res = await this.weightCollectionStore.recordWeight(
                this.currentWeight
            );
            if (res) {
                this.updateChart();
                this.clearForm();
                eventBus.emit("success", "Weight recorded successfully!");
            }
        },
        async updateChart() {
            const res = await this.weightCollectionStore.updateChart();
            if (res) {
                const weights = res.data.weights;
                this.renderChart(weights);
            }
        },
        renderChart(weights) {
            const ctx = document.getElementById("myChart");
            if (this.chart) {
                this.chart.destroy();
            }
            const monthLabels = [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
            ];
            const data = monthLabels.map((month) => {
                const weightForMonth = weights.find(
                    (entry) => entry.month === month
                );
                return weightForMonth ? weightForMonth.weight : null;
            });

            this.chart = new Chart(ctx, {
                type: "line",
                data: {
                    labels: monthLabels,
                    datasets: [
                        {
                            label: "Weight Progress",
                            data: data,
                            borderWidth: 5,
                            backgroundColor: "black",
                            borderColor: "#d29433",
                            tension: 0.2,
                        },
                    ],
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                        },
                    },
                },
            });
        },
    },
};
</script>

<style scoped>
.heading {
    margin: 0;
    padding: 1vw 5vw 0 2vw;
    height: 7vh;
    background-color: #000;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.heading-img {
    height: 100%;
    width: auto;
    object-fit: contain;
    overflow: hidden;
}
.naslov {
    margin-top: 40px;
    text-align: center;
}
.btn {
    border-radius: 10px;
    width: 100px;
}
.form-label {
    font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
        "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
    font-size: medium;
    color: aliceblue;
}

.form-control {
    background-color: bisque;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    align-items: center;
}

.align-items-center {
    margin: auto;
    padding: 14px;
    justify-content: center;
    display: flex;
    align-items: center;
    flex-direction: column;
    max-width: 450px;
}

#weightInput {
    height: 70px;
    border-radius: 100px;
    border: solid 10px #d29433;
}
#diaryEntry {
    display: block;
    box-sizing: border-box;
    height: 100px;
    margin-left: 10%;
    margin-right: 10%;
}
#myChart {
    color: black;
    background-color: bisque;
    display: block;
    box-sizing: border-box;
    height: 700px;
    width: 1000px;
    margin-left: 10%;
    margin-right: 10%;
    z-index: 1;
}
</style>
