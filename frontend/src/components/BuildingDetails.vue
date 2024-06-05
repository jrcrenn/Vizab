<template>
  <main>
    <!-- Section to display building overview card if the building data is available -->
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

      <!-- Button to navigate back to the previous page -->
      <button @click="goBack" class="go-back">
        <img src="@/assets/icons/left-arrow.svg" alt="Buildings Details" class="filter" />
        <span>BACK</span>
      </button>
    </section>

    <!-- Section to display loading message if the building data is not yet available -->
    <section v-else>
      <h2>Chargement en cours...</h2>
    </section>
  </main>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import { BuildingService } from '@/services/BuildingService';

const route = useRoute(); // Access route information
const router = useRouter(); // Access router instance for navigation
const buildingId = parseInt(route.params.id, 10); // Get building ID from route parameters
const building = ref(null); // Reactive reference to store building data
const carbonEmissionPerSquareMeter = ref(null); // Reactive reference to store carbon emission per square meter

// Function to navigate back to the previous page
const goBack = () => {
  router.push("/");
};

// Function to fetch selected building data
const fetchSelectedBuilding = async () => {
  try {
    const buildings = await BuildingService.fetchBuildings(); // Fetch all buildings
    const selectedBuilding = buildings.find(b => b.id === buildingId); // Find the building with the matching ID
    building.value = selectedBuilding; // Set the building data
    carbonEmissionPerSquareMeter.value = (selectedBuilding.carbon_emission / selectedBuilding.surface).toFixed(1); // Calculate and set carbon emission per square meter
  } catch (error) {
    console.error('Error fetching data:', error); // Log any errors
  }
};

// Fetch building data when the component is mounted
onMounted(() => {
  fetchSelectedBuilding();
});
</script>

<style scoped>
@import '../assets/styles/BuildingDetails.scss';
</style>
