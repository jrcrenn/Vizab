import { shallowMount } from '@vue/test-utils';
import BuildingOverview from '@/components/BuildingOverview.vue';
import { RouterLink } from 'vue-router';

describe('BuildingOverview.vue', () => {
  it('renders building name correctly', () => {
    // Mock building data
    const building = { name: 'Test Building', address: '123 Test St', city: 'Test City', id: 1 };
    
    // Mount the component with the mock building data as props
    const wrapper = shallowMount(BuildingOverview, {
      props: { building }
    });

    // Check if the building name is rendered correctly
    expect(wrapper.text()).toMatch(building.name);
  });

  it('renders details link with correct route', () => {
    // Mock building data
    const building = { name: 'Test Building', address: '123 Test St', city: 'Test City', id: 1 };
    
    // Mount the component with the mock building data as props and register RouterLink globally
    const wrapper = shallowMount(BuildingOverview, {
      props: { building },
      global: {
        components: {
          RouterLink
        }
      }
    });

    // Find the RouterLink component within the wrapper
    const link = wrapper.findComponent(RouterLink);
    
    // Check if the RouterLink component exists
    expect(link.exists()).toBe(true);
    
    // Check if the RouterLink component has the correct route props
    expect(link.props().to).toEqual({ name: 'OneBuilding', params: { id: building.id }, replace: true });
  });
});
