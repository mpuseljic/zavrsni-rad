<template>
    <div>
        <div class="heading">
            <img class="heading-img" src="@/assets/logorsg.jpg" alt="" />
        </div>
        <div class="main" style="background-color: black; margin: 0">
            <div class="gender">
                <h1 class="naslov">BMI CALCULATOR</h1>
                <button
                    @click="maleChoose"
                    :class="{ 'btn-primary': male, 'btn-secondary': !male }"
                    :style="maleBtnStyle"
                    size="lg"
                >
                    <span class="material-symbols-outlined gender-icon">
                        male
                    </span>
                </button>
                <button
                    @click="femaleChoose"
                    :class="{ 'btn-primary': female, 'btn-secondary': !female }"
                    :style="femaleBtnStyle"
                    size="lg"
                >
                    <span class="material-symbols-outlined gender-icon">
                        female
                    </span>
                </button>
            </div>
            <div class="bmi">
                <div class="input">
                    <input
                        style="background-color: #d29433"
                        class="form-control height"
                        v-model="height"
                        type="number"
                        placeholder="Height (cm)"
                    />
                    <input
                        style="background-color: #d29433"
                        class="form-control weight"
                        v-model="weight"
                        type="number"
                        placeholder="Weight (kg)"
                    />
                    <input
                        style="background-color: #d29433"
                        class="form-control age"
                        v-model="age"
                        type="number"
                        placeholder="Age"
                    />
                </div>

                <button class="btn btn-success" @click="calculateBMI">
                    Calculate
                </button>

                <div v-if="bmi != null">
                    <h2 class="result">Your BMI: {{ bmi }}</h2>
                    <p class="message">{{ bmiMessage }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "calculateBMIComponent",
    components: {},
    data() {
        return {
            height: null,
            weight: null,
            age: null,
            bmi: null,
            male: false,
            female: false,

            maleBtnStyle: {
                height: "100px",
                width: "100px",
                margin: "10px 43px 10px 43px",
                borderRadius: "20px",
                backgroundColor: "#D29433",
            },
            femaleBtnStyle: {
                height: "100px",
                width: "100px",
                margin: "10px 43px 10px 43px",
                borderRadius: "20px",
                backgroundColor: "#D29433",
            },
        };
    },
    methods: {
        calculateBMI() {
            if (this.height && this.weight) {
                const heightInMeters = this.height / 100;
                this.bmi = (
                    this.weight /
                    (heightInMeters * heightInMeters)
                ).toFixed(2);
            } else {
                this.bmi = null;
            }
        },
        maleChoose() {
            this.male = !this.male;
            this.female = false;
            this.maleBtnStyle.backgroundColor = this.male ? "cyan" : "#D29433";
            this.femaleBtnStyle.backgroundColor = "#D29433";
        },
        femaleChoose() {
            this.female = !this.female;
            this.male = false;
            this.femaleBtnStyle.backgroundColor = this.female
                ? "pink"
                : "#D29433";
            this.maleBtnStyle.backgroundColor = "#D29433";
        },
    },

    computed: {
        bmiMessage() {
            if (this.bmi === null) {
                return "";
            } else if (this.bmi < 18.5) {
                return "You are undernourished. Consult your doctor to increase body weight.";
            } else if (this.bmi > 24.9) {
                return "You have excess body weight. Consult a doctor to reduce it.";
            } else {
                return "You have a normal body weight. Eat healthily and engage in physical activity to maintain it.";
            }
        },
    },
};
</script>

<style scoped>
.gender-icon {
    scale: 1.9;
}
.heading-img {
    height: 100%;
    width: auto;
    object-fit: contain;
    overflow: hidden;
}
.heading {
    margin: 0;
    padding: 1vw 5vw 0 2vw;
    height: 7vh;
    background-color: #000;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.gender {
    text-align: center;
}

.bmi {
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.result {
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
        "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
}

.input {
    margin: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.height,
.weight,
.age {
    background-color: #d29433;
    max-width: 300px;
    padding: 20px;
    border-radius: 20px;
    text-align: center;
    margin: 5px;
    font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
        "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
    font-size: medium;
}

.btn {
    font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
        "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
    padding: 10px;
    margin: 20px;
}

.naslov {
    font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
        "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
    color: aliceblue;
}

.message {
    margin-left: 21px;
    font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
        "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
    color: rgb(222, 174, 43);
}

.navbar {
    position: fixed;
    bottom: 0;
    width: 100%;
    text-align: center;
}
</style>
