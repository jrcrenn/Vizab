<template>
  <section class="building-overview-card">
    <h2>{{ building.name }}</h2>
    <div class="info-card">
      <span>{{ building.address }}</span>
      <span>{{ building.city }}</span>
    </div>
    <div class="details-button">
      <RouterLink :to="{ name: 'OneBuilding', params: { id: building.id }, replace: true }">
        <i class="fas fa-eye"></i> <!-- Ajout de l'icône d'œil -->
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
    required: true
  }
})
</script>

<style scoped>
@import '../assets/styles/BuildingOverview.scss';
</style>
