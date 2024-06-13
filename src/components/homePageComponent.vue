<template>
    <div class="heading">
        <img class="heading-img" src="@/assets/logorsg.jpg" alt="" />
    </div>
    <div class="main">
        <div class="header">
            <h1>Let's crush it!</h1>
        </div>
        <div class="container mt-3">
            <input
                class="form-control search-bar"
                placeholder="Search exercises"
                v-model="searchText"
            />
        </div>
        <div class="recommended-workout" v-if="searchText === ''">
            <h1>RECOMMENDED WORKOUTS</h1>
        </div>
        <v-container v-if="searchText === ''">
            <v-carousel hide-delimiters>
                <template v-slot:prev="{ props }">
                    <v-btn @click="props.onClick" icon>
                        <v-icon>mdi-chevron-left</v-icon>
                    </v-btn>
                </template>
                <template v-slot:next="{ props }">
                    <v-btn class="custom-next-btn" @click="props.onClick" icon>
                        <v-icon>mdi-chevron-right</v-icon>
                    </v-btn>
                </template>
                <v-carousel-item
                    cover
                    @click="
                        openModalEvent('recommended-workout-plan', 'crossFit'),
                            openModal()
                    "
                >
                    <img class="carousel-image" src="../assets/crossfit.jpg" />
                    <div class="carousel-caption d-none d-md-block">
                        <h1>CROSSFIT</h1>
                        <p>
                            Whether you’ve trained your whole life or are just
                            starting your fitness journey,<br />
                            CrossFit offers a results-based,
                            <br />community-driven approach that helps you build
                            fitness <br />
                            and improve your health—over your lifetime.
                        </p>
                    </div>
                </v-carousel-item>

                <v-carousel-item
                    cover
                    @click="
                        openModalEvent('recommended-workout-plan', 'lowerBody'),
                            openModal()
                    "
                >
                    <img
                        class="carousel-image"
                        src="../assets/lower-body.jpg"
                    />
                    <div class="carousel-caption d-none d-md-block">
                        <h1>LOWER BODY ATTACK</h1>
                        <p>
                            Use these timeless leg exercises to gain mass and
                            strength on your lower body. A varied combination of
                            reps and sets will help to keep your routine fresh.
                        </p>
                    </div>
                </v-carousel-item>

                <v-carousel-item
                    cover
                    @click="
                        openModalEvent('recommended-workout-plan', 'upperBody'),
                            openModal()
                    "
                >
                    <img
                        class="carousel-image"
                        src="../assets/upper-body.jpg"
                    />
                    <div class="carousel-caption d-none d-md-block">
                        <h1>UPPER BODY ATTACK</h1>
                        <p>
                            Time to get the arms, shoulders and chest into it!
                            <br />
                            You will need some dumbbells to get this one done.
                        </p>
                    </div>
                </v-carousel-item>
            </v-carousel>
        </v-container>
        <div class="my-workout" v-if="searchText === ''">
            <span class="my-workouts-span">MY WORKOUTS</span>
            &nbsp;&nbsp;&nbsp;
            <span
                class="material-symbols-outlined add-new-button"
                type="button"
                @click="openModal(), openModalEvent('add-new-workout-plan')"
            >
                add_box
            </span>
        </div>
        <v-container v-if="searchText === '' && userWorkouts.length !== 0">
            <v-carousel hide-delimiters>
                <template v-slot:prev="{ props }">
                    <v-btn @click="props.onClick" icon>
                        <v-icon>mdi-chevron-left</v-icon>
                    </v-btn>
                </template>
                <template v-slot:next="{ props }">
                    <v-btn class="custom-next-btn" @click="props.onClick" icon>
                        <v-icon>mdi-chevron-right</v-icon>
                    </v-btn>
                </template>
                <v-carousel-item
                    cover
                    v-for="plan in userWorkouts"
                    :key="plan"
                    @click="
                        openModalEvent('user-workout-plan', plan._id),
                            openModal()
                    "
                >
                    <img class="carousel-image" :src="plan.titleImagePath" />
                    <div class="carousel-caption d-none d-md-block">
                        <h1>{{ plan.planName }}</h1>
                    </div>
                </v-carousel-item>
            </v-carousel>
        </v-container>
        <div class="exercise-list">
            <h1>EXERCISE LIST</h1>
            <div
                class="exercise-card"
                v-for="exercise in filterExercises()"
                :key="exercise._id"
            >
                <img
                    :src="exercise.img_url"
                    alt="Exercise Image"
                    class="exercise-image"
                />
                <div class="exercise-content">
                    <h2>{{ exercise.title }}</h2>
                </div>
            </div>
        </div>
        <mainModal :active-modal="activeModal" />
    </div>
</template>
<script>
import eventBus from "@/eventBus";
import mainModal from "@/views/modalBody.vue";
import { useWorkoutPlansCollectionStore } from "@/stores/workoutPlansCollectionStore";
import { useExerciseLiseCollectionStore } from "@/stores/exerciseListCollectionStore";

export default {
    name: "homePageComponent",
    data() {
        return {
            activeModal: false,
            exerciseList: [],
            searchText: "",
            userWorkouts: [],
        };
    },
    components: {
        mainModal,
    },
    setup() {
        const workoutPlansCollectionStore = useWorkoutPlansCollectionStore();
        const exerciseListCollectionStore = useExerciseLiseCollectionStore();
        return { workoutPlansCollectionStore, exerciseListCollectionStore };
    },
    async created() {
        await this.workoutPlansCollectionStore.fetchUserWorkouts();
        this.fetchExerciseList();
        this.fetchUserWorkouts();
        this.fetchNewUserWorkouts();
        eventBus.on("closeModal", (closeModalData) => {
            if (closeModalData.closeModal) {
                this.activeModal = false;
            }
        });
    },
    methods: {
        openModalEvent(modalType, workoutPlan = null) {
            const data = {
                modalType: modalType,
                workoutPlan: workoutPlan,
            };
            eventBus.emit("openModal", data);
        },
        openModal() {
            this.activeModal = !this.activeModal;
        },
        fetchUserWorkouts() {
            this.userWorkouts =
                this.workoutPlansCollectionStore.getAllUserWorkouts;
        },
        fetchNewUserWorkouts() {
            eventBus.on("success", async () => {
                await this.workoutPlansCollectionStore.fetchUserWorkouts();
                this.fetchUserWorkouts();
            });
        },
        async fetchExerciseList() {
            const res = await this.exerciseListCollectionStore.getExercises();
            this.exerciseList = res.data;
        },
        filterExercises() {
            return this.exerciseList.filter((exercise) => {
                return exercise.title
                    .toLowerCase()
                    .includes(this.searchText.toLocaleLowerCase());
            });
        },
    },
};
</script>
<style scoped>
.mdi-chevron-right,
.mdi-chevron-left {
    color: black;
}
.search-bar {
    background-color: #9a9494;
    color: black;
    text-align: center;
}
.carousel-image {
    width: 100%;
    max-height: 100%;
    object-fit: contain;
    opacity: 0.7;
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

.header {
    padding-top: 5px;
    padding-left: 20px;
    color: #d29433;
}
.container {
    display: flex;
    justify-content: center;
    align-items: center;
}

.form-control {
    border-radius: 50px;
}
.my-workouts-span {
    color: white;
    font-size: 2.5rem;
    font-weight: 500;
}
.add-new-button {
    scale: 1.7;
    color: #d29433;
}
.recommended-workout,
.my-workout,
.exercise-list {
    margin: 50px;
    margin-top: 70px;
    color: white;
}
.carousel-caption {
    color: #d29433;
}

.exercise-card {
    width: 80%;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    margin-top: 30px;
}

.exercise-content {
    flex: 1;
}

.exercise-content h2 {
    margin: 0;
    text-align: center;
}

.exercise-image {
    max-width: 200px;
    height: auto;
    margin-right: 50px;
}
</style>
