<template>
  <main>
    <section class="building-overview-card" v-if="building">
      <h2>{{ building.name }}</h2>
      <ul>
        <li class="head-list">Address</li>
        <li>{{ building.address }}</li>
        <li>{{ building.city }}</li>
        <li>{{ building.postcode }}</li>
      </ul>
      <ul>
        <li class="head-list">Surface (m²)</li>
        <li>{{ building.surface }}</li>
      </ul>
      <ul>
        <li class="head-list">Carbon emission (kg eq CO2)</li>
        <li>{{ building.carbon_emission }}</li>
      </ul>
      <ul>
        <li class="head-list">Carbon emission per square meter (kg eq CO2/m²)</li>
        <li>{{ carbonEmissionPerSquareMeter }}</li>
      </ul>

      <button @click="goBack" class="go-back">
        <img src="@/assets/icons/left-arrow.svg" alt="Buidlings Details" class="filter" />
        <span >BACK</span>
      </button>
    </section>

    <section v-else>
      <h2>Chargement en cours...</h2>
    </section>
  </main>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import { BuildingService } from '@/services/BuildingService';

const route = useRoute();
const router = useRouter();
const buildingId = parseInt(route.params.id, 10);
const building = ref(null);
const carbonEmissionPerSquareMeter = ref(null);

const goBack = () => {
  router.push("/");
};

const fetchSelectedBuilding = async () => {
  try {
    const buildings = await BuildingService.fetchBuildings();
    const selectedBuilding = buildings.find(b => b.id === buildingId);
    building.value = selectedBuilding;
    carbonEmissionPerSquareMeter.value = (selectedBuilding.carbon_emission / selectedBuilding.surface).toFixed(1);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

onMounted(() => {
  fetchSelectedBuilding();
});
</script>

<style scoped>
@import '../assets/styles/BuildingDetails.scss';
</style>
