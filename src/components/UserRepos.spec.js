import { mount } from '@vue/test-utils';
import UserRepos from './UserRepos.vue';

describe('UserRepos Component', () => {
  it('renders user input and fetches suggestions', async () => {
    const wrapper = mount(UserRepos);

    // Simulate user input
    await wrapper.setData({ userName: 'soumyanjaleemahapatra' });

    // Wait for debounce
    await new Promise(resolve => setTimeout(resolve, 300));

    // Assertions
    expect(wrapper.find('.user__input').element.value).toBe('soumyanjaleemahapatra');
    expect(wrapper.find('.user__suggestions').exists()).toBe(true);
  });

  it('selects a suggestion and fetches user repositories', async () => {
    const wrapper = mount(UserRepos);

    // Simulate selecting a suggestion
    await wrapper.setData({ suggestions: [
      {
        login: 'soumyanjaleemahapatra',
        avatar_url: 'https://avatars.githubusercontent.com/u/9299648?v=4'
      }
    ] });
    await wrapper.find('.user__suggestions li').trigger('click');

    // Wait for user repositories to load
    await new Promise(resolve => setTimeout(resolve, 500));

    // Assertions
    expect(wrapper.find('.user__profile').exists()).toBe(true);
    expect(wrapper.find('.user__profile__link').attributes('href')).toBe('https://github.com/soumyanjaleemahapatra');
    expect(wrapper.find('.user__avatar').attributes('src')).toBe('https://avatars.githubusercontent.com/u/9299648?v=4');
    expect(wrapper.find('.repo__list').exists()).toBe(true);
  });

  it('handles errors when fetching user repositories', async () => {
    const wrapper = mount(UserRepos);

    // Simulate entering an invalid username
    await wrapper.setData({ userName: 'invalidUsername' });

    // Wait for user repositories to load
    await new Promise(resolve => setTimeout(resolve, 500));

    // Assertions
    expect(wrapper.find('.user__error').text()).toBe('Please try with a different username');
  });

});
