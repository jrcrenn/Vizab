import { mount } from '@vue/test-utils';
import Building from '@/views/Buildings.vue';
import BuildingOverview from '@/components/BuildingOverview.vue';
import { createRouter, createWebHistory } from 'vue-router';
import { routes } from '@/router'; // Assurez-vous que ce chemin est correct pour vos routes

const router = createRouter({
  history: createWebHistory(),
  routes
});

describe('Building.vue', () => {
  it('fetches buildings on mount', async () => {
    const mockBuildings = [
      { id: 1, name: 'Building 1', address: 'Address 1', city: 'City 1', surface: 100, carbon_emission: 50 },
      { id: 2, name: 'Building 2', address: 'Address 2', city: 'City 2', surface: 200, carbon_emission: 100 }
    ];

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ data: mockBuildings })
      })
    );

    const wrapper = mount(Building, {
      global: {
        plugins: [router]
      }
    });

    await router.isReady();
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.buildings).toEqual(mockBuildings);
  });

  it('renders BuildingOverview components for each building', async () => {
    const mockBuildings = [
      { id: 1, name: 'Building 1', address: 'Address 1', city: 'City 1', surface: 100, carbon_emission: 50 },
      { id: 2, name: 'Building 2', address: 'Address 2', city: 'City 2', surface: 200, carbon_emission: 100 }
    ];

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ data: mockBuildings })
      })
    );

    const wrapper = mount(Building, {
      global: {
        plugins: [router]
      }
    });

    await router.isReady();
    await wrapper.vm.$nextTick();
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
