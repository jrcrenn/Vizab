// tests/unit/SortBy.spec.js
import { shallowMount } from '@vue/test-utils';
import SortBy from '@/components/SortBy.vue';

describe('SortBy.vue', () => {
  it('emits "sort-by-changed" event with correct value on change', async () => {
    const wrapper = shallowMount(SortBy);
    const select = wrapper.find('select');
    await select.setValue('name');
    expect(wrapper.emitted('sort-by-changed')).toBeTruthy();
    expect(wrapper.emitted('sort-by-changed')[0]).toEqual(['name']);
  });
});
