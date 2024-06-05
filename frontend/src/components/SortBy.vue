<template>
    <div class="sortby-container">
      <label>
        <span>Sort by</span>
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
  
  const emits = defineEmits(['sort-by-changed']);
  
  const handleSortBy = (event) => {
    emits('sort-by-changed', event.target.value);
  }
  </script>
  
  <style scoped >
  @import '../assets/styles/SortBy.scss';
  </style>
  