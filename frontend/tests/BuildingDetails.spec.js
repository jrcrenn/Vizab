import { shallowMount } from '@vue/test-utils';
import BuildingDetails from '@/components/BuildingDetails.vue';
import { useRoute, useRouter } from 'vue-router';

jest.mock('vue-router', () => ({
  useRoute: jest.fn(),
  useRouter: jest.fn()
}));

describe('BuildingDetails.vue', () => {
  it('fetches building data on mount and displays it', async () => {
    const mockBuilding = {
      id: 1,
      name: 'Test Building',
      address: '123 Test St',
      city: 'Test City',
      postcode: '12345',
      surface: 1000,
      carbon_emission: 500
    };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ data: [mockBuilding] })
      })
    );

    useRoute.mockReturnValue({
      params: { id: 1 }
    });

    const wrapper = shallowMount(BuildingDetails);
    await wrapper.vm.fetchSelectedBuilding(); // Wait for fetch to complete
    await wrapper.vm.$nextTick();

    expect(wrapper.text()).toMatch(mockBuilding.name);
    expect(wrapper.text()).toMatch(mockBuilding.address);
  });

  it('goes back to main page when back button is clicked', async () => {
    const mockPush = jest.fn();
    useRouter.mockReturnValue({ push: mockPush });

    const mockBuilding = {
      id: 1,
      name: 'Test Building',
      address: '123 Test St',
      city: 'Test City',
      postcode: '12345',
      surface: 1000,
      carbon_emission: 500
    };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ data: [mockBuilding] })
      })
    );

    useRoute.mockReturnValue({
      params: { id: 1 }
    });

    const wrapper = shallowMount(BuildingDetails);
    await wrapper.vm.fetchSelectedBuilding(); // Wait for fetch to complete
    await wrapper.vm.$nextTick();

    const button = wrapper.find('button');
    expect(button.exists()).toBe(true);
    await button.trigger('click');
    expect(mockPush).toHaveBeenCalledWith('/');
  });
});
