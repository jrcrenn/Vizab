// services/BuildingService.js
import axios from 'axios';

export const BuildingService = {
    async fetchBuildings() {
        try {
            const response = await axios.get('http://localhost:3000');
            return response.data.data;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    }
};
