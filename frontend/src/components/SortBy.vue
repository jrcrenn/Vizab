<template>
  <!-- Container for the sort by dropdown -->
  <div class="sortby-container">
    <label>
      <span>Sort by</span>
      <!-- Dropdown to select sorting criteria -->
      <select @change="handleSortBy">
        <option value="" selected disabled hidden>Choose here</option>
        <option value="name">Name</option>
        <option value="surface">Surface (m²)</option>
        <option value="carbon_emission_per_square_meter">kg eq. CO2 / m²</option>
      </select>
    </label>
  </div>
</template>

<script setup>
import { defineEmits } from 'vue';

// Define the emits function to emit custom events
const emits = defineEmits(['sort-by-changed']);

// Handle the sort by dropdown change event
const handleSortBy = (event) => {
  emits('sort-by-changed', event.target.value); // Emit the selected sort criteria
}
</script>

<style scoped>
@import '../assets/styles/SortBy.scss';
</style>
