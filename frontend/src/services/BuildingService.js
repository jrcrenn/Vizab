// services/BuildingService.js
export const BuildingService = {
    async fetchBuildings() {
      try {
        const response = await fetch('http://localhost:3000');
        const data = await response.json();
        return data.data;
      } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
      }
    }
  };
  