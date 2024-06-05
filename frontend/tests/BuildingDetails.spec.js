import { shallowMount } from '@vue/test-utils';
import BuildingDetails from '@/components/BuildingDetails.vue';
import { useRoute, useRouter } from 'vue-router';

// Mock the vue-router functions
jest.mock('vue-router', () => ({
  useRoute: jest.fn(),
  useRouter: jest.fn()
}));

describe('BuildingDetails.vue', () => {
  it('fetches building data on mount and displays it', async () => {
    // Mock building data
    const mockBuilding = {
      id: 1,
      name: 'Test Building',
      address: '123 Test St',
      city: 'Test City',
      postcode: '12345',
      surface: 1000,
      carbon_emission: 500
    };

    // Mock global fetch function to return mock building data
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ data: [mockBuilding] })
      })
    );

    // Mock useRoute to return mock route parameters
    useRoute.mockReturnValue({
      params: { id: 1 }
    });

    // Mount the component
    const wrapper = shallowMount(BuildingDetails);
    await wrapper.vm.fetchSelectedBuilding(); // Wait for fetch to complete
    await wrapper.vm.$nextTick();

    // Check if the building data is displayed
    expect(wrapper.text()).toMatch(mockBuilding.name);
    expect(wrapper.text()).toMatch(mockBuilding.address);
  });

  it('goes back to main page when back button is clicked', async () => {
    // Mock the router push function
    const mockPush = jest.fn();
    useRouter.mockReturnValue({ push: mockPush });

    // Mock building data
    const mockBuilding = {
      id: 1,
      name: 'Test Building',
      address: '123 Test St',
      city: 'Test City',
      postcode: '12345',
      surface: 1000,
      carbon_emission: 500
    };

    // Mock global fetch function to return mock building data
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ data: [mockBuilding] })
      })
    );

    // Mock useRoute to return mock route parameters
    useRoute.mockReturnValue({
      params: { id: 1 }
    });

    // Mount the component
    const wrapper = shallowMount(BuildingDetails);
    await wrapper.vm.fetchSelectedBuilding(); // Wait for fetch to complete
    await wrapper.vm.$nextTick();

    // Find and click the back button
    const button = wrapper.find('button');
    expect(button.exists()).toBe(true);
    await button.trigger('click');
    expect(mockPush).toHaveBeenCalledWith('/'); // Check if navigation to main page occurs
  });
});
