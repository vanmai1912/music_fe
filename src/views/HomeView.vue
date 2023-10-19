<script setup>
import MainLayout from "../layout/MainLayout.vue";
import HomeCard from "../components/HomeCard.vue";
import HomeCardSinger from "../components/HomeCardSinger.vue";
import axios from "axios";
import { ref } from "vue";

const cards = ref([]);

const fetchTypesData = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/types");
    cards.value = response.data;
  } catch (error) {
    console.error(error);
  }
};
fetchTypesData();

const singers = ref([]);

const fetchSingersData = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/singers");
    singers.value = response.data;
  } catch (error) {
    console.error(error);
  }
};
fetchSingersData();
</script>

<template>
  <MainLayout>
    <div class="p-8">
      <button
        type="button"
        class="text-white text-2xl font-semibold hover:underline cursor-pointer"
      >
        Type
      </button>

      <div class="py-1.5"></div>

      <div class="flex flex-wrap -mx-2">
        <HomeCard
          :key="card"
          v-for="card in cards"
          :image="card.image"
          :title="card.name"
          :subTitle="card.description"
          :id="card.id"
          class="w-20pc px-2 mb-4 home-card"
        />
      </div>
    </div>

    <div class="p-8">
      <button
        type="button"
        class="text-white text-2xl font-semibold hover:underline cursor-pointer"
      >
        Singer
      </button>

      <div class="py-1.5"></div>

      <div class="flex flex-wrap -mx-2">
        <HomeCardSinger
          :key="card - singer"
          v-for="singer in singers"
          :image="singer.image"
          :title="singer.name"
          :subTitle="singer.description"
          :id="singer.id"
          class="w-20pc px-2 mb-4 home-card"
        />
      </div>
    </div>
  </MainLayout>
</template>

<style>
.w-20pc {
  flex-basis: 20%;
  max-width: 20%;
}

.mb-4 {
  margin-bottom: 1rem;
}

.mx-2 {
  margin-left: -0.5rem;
  margin-right: -0.5rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}

@media (max-width: 768px) {
  .flex-wrap {
    flex-wrap: wrap;
  }
}

.home-card {
  max-height: 420px;
  overflow: hidden;
}

.home-card .text-gray-400 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  max-height: 3em;
}
.description-container {
  max-height: 100px; /* Điều chỉnh chiều cao tối đa theo ý muốn */
  overflow-y: auto; /* Thêm thanh cuộn dọc khi mô tả quá dài */
}
</style>