import { shallowMount } from '@vue/test-utils';
import BuildingOverview from '@/components/BuildingOverview.vue';
import { RouterLink } from 'vue-router';

describe('BuildingOverview.vue', () => {
  it('renders building name correctly', () => {
    const building = { name: 'Test Building', address: '123 Test St', city: 'Test City', id: 1 };
    const wrapper = shallowMount(BuildingOverview, {
      props: { building }
    });
    expect(wrapper.text()).toMatch(building.name);
  });

  it('renders details link with correct route', () => {
    const building = { name: 'Test Building', address: '123 Test St', city: 'Test City', id: 1 };
    const wrapper = shallowMount(BuildingOverview, {
      props: { building },
      global: {
        components: {
          RouterLink
        }
      }
    });
    const link = wrapper.findComponent(RouterLink);
    expect(link.exists()).toBe(true);
    expect(link.props().to).toEqual({ name: 'OneBuilding', params: { id: building.id }, replace: true });
  });
});
