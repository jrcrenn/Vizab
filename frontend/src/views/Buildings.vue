<template>
  <main>
    <div>
      <div class="header-container">
        <SortBy @sort-by-changed="handleSortChange" />
        <div class="pagination-top">
          <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1">Previous</button>
          <span>Page {{ currentPage }} of {{ totalPages }}</span>
          <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages">Next</button>
        </div>
      </div>
      <div class="buildinglist-container">
        <BuildingOverview v-for="building in paginatedBuildings" :key="building.id" :building="building" />
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import BuildingOverview from '../components/BuildingOverview.vue';
import SortBy from '../components/SortBy.vue';
import { BuildingService } from '@/services/BuildingService';

// State variables
const buildings = ref([]);
const currentPage = ref(1);
const itemsPerPage = ref(10);
const currentSortOption = ref(localStorage.getItem('currentSortOption') || 'name');

// Fetch buildings on component mount
onMounted(() => {
  fetchBuildings();
});

// Fetch buildings from the service
const fetchBuildings = async () => {
  try {
    buildings.value = await BuildingService.fetchBuildings();
    sortBuildings(currentSortOption.value); // Sort buildings based on saved option
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

// Handle sort option change
const handleSortChange = (sortByOption) => {
  currentSortOption.value = sortByOption;
  localStorage.setItem('currentSortOption', sortByOption); // Save sort option
  sortBuildings(sortByOption);
};

// Sort buildings based on the selected option
const sortBuildings = (sortByOption) => {
  const sortMethods = {
    carbon_emission_per_square_meter: (a, b) => (a.carbon_emission / a.surface) - (b.carbon_emission / b.surface),
    surface: (a, b) => a.surface - b.surface,
    name: (a, b) => a.name.localeCompare(b.name)
  };
  buildings.value.sort(sortMethods[sortByOption]);
};

// Compute paginated buildings
const paginatedBuildings = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  return buildings.value.slice(start, start + itemsPerPage.value);
});

// Compute total number of pages
const totalPages = computed(() => Math.ceil(buildings.value.length / itemsPerPage.value));

// Change the current page
const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};
</script>

<style scoped>
@import '../assets/styles/Building.scss';
</style>
