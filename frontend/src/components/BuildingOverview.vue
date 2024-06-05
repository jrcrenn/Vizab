<template>
  <!-- Section to display the building overview card -->
  <section class="building-overview-card">
    <h2>{{ building.name }}</h2>
    <!-- Container for building address and city -->
    <div class="info-card">
      <span>{{ building.address }}</span>
      <span>{{ building.city }}</span>
    </div>
    <!-- Button to navigate to the building details page -->
    <div class="details-button">
      <RouterLink :to="{ name: 'OneBuilding', params: { id: building.id }, replace: true }">
        <i class="fas fa-eye"></i> <!-- Eye icon added -->
        <span>DETAILS</span>
      </RouterLink>
    </div>
  </section>
</template>

<script setup>
import { defineProps } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps({
  building: {
    type: Object,
    required: true // Ensure the building prop is passed and is an object
  }
})
</script>

<style scoped>
@import '../assets/styles/BuildingOverview.scss';
</style>
