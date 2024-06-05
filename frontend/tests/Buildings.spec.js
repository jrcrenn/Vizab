import { mount } from '@vue/test-utils';
import Building from '@/views/Buildings.vue';
import BuildingOverview from '@/components/BuildingOverview.vue';
import { createRouter, createWebHistory } from 'vue-router';
import { routes } from '@/router'; // Ensure this path is correct for your routes
import flushPromises from 'flush-promises';

// Create a router instance with history mode and the defined routes
const router = createRouter({
  history: createWebHistory(),
  routes
});

describe('Building.vue', () => {
  it('fetches buildings on mount', async () => {
    // Mock building data
    const mockBuildings = [
      { id: 1, name: 'Building 1', address: 'Address 1', city: 'City 1', surface: 100, carbon_emission: 50 },
      { id: 2, name: 'Building 2', address: 'Address 2', city: 'City 2', surface: 200, carbon_emission: 100 }
    ];

    // Mock global fetch function to return mock building data
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ data: mockBuildings })
      })
    );

    // Mount the component with the router plugin
    const wrapper = mount(Building, {
      global: {
        plugins: [router]
      }
    });

    // Wait for the router to be ready and the component to update
    await router.isReady();
    await flushPromises();
    
    // Check if the fetched buildings are correctly set in the component
    expect(wrapper.vm.buildings).toEqual(mockBuildings);
  });

  it('renders BuildingOverview components for each building', async () => {
    // Mock building data
    const mockBuildings = [
      { id: 1, name: 'Building 1', address: 'Address 1', city: 'City 1', surface: 100, carbon_emission: 50 },
      { id: 2, name: 'Building 2', address: 'Address 2', city: 'City 2', surface: 200, carbon_emission: 100 }
    ];

    // Mock global fetch function to return mock building data
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ data: mockBuildings })
      })
    );

    // Mount the component with the router plugin
    const wrapper = mount(Building, {
      global: {
        plugins: [router]
      }
    });

    // Wait for the router to be ready and the component to update
    await router.isReady();
    await flushPromises();
    
    // Wait for the next DOM update cycle
    await wrapper.vm.$nextTick();

    // Check that BuildingOverview components are rendered
    const buildingComponents = wrapper.findAllComponents(BuildingOverview);
    expect(buildingComponents.length).toBe(mockBuildings.length);

    // Verify each BuildingOverview component receives the correct props
    buildingComponents.forEach((component, index) => {
      expect(component.props().building).toEqual(mockBuildings[index]);
    });
  });
});
