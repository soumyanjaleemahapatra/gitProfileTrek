import { mount } from '@vue/test-utils';
import RepoList from './RepoList.vue';

describe('RepoList Component', () => {
  const repos = [
    {
        "id": 12345,
        "name": "file-search",
        "private": false,
        "owner": {
            "login": "soumyanjaleemahapatra",
            "avatar_url": "https://avatars.githubusercontent.com/u/9299648?v=4",
        },

        "stargazers_count": 0,
        "forks_count": 1,
        "html_url": "https://github.com/soumyanjaleemahapatra/FileSearch",
        "description": "Component for files",
    },
    {
        "id": 56789,
        "name": "music-search",
        "private": false,
        "owner": {
            "login": "soumyanjaleemahapatra",
            "avatar_url": "https://avatars.githubusercontent.com/u/9299648?v=4",
        },
        "stargazers_count": 4,
        "forks_count": 0,
        "html_url": "https://github.com/soumyanjaleemahapatra/MusicSearch",
        "description":null,
    }
  ];

  it('renders sorted repositories by name by default', () => {
    const wrapper = mount(RepoList, {
      props: { repos },
    });

    // Assertions
    const repoLinks = wrapper.findAll('.repo__list__item__link');
    expect(repoLinks.length).toBe(repos.length);
    expect(repoLinks.at(0).text()).toBe('file-search');
    expect(repoLinks.at(1).text()).toBe('music-search');
  });

  it('renders sorted repositories by stars when selected', async () => {
    const wrapper = mount(RepoList, {
      props: { repos },
    });

    // Select 'Stars' option
    await wrapper.setData({ sortBy: 'stars' });

    // Wait for sorting
    await new Promise(resolve => setTimeout(resolve, 300));

    // Assertions
    const repoLinks = wrapper.findAll('.repo__list__item__link');
    expect(repoLinks.length).toBe(repos.length);
    expect(repoLinks.at(0).text()).toBe('music-search');
    expect(repoLinks.at(1).text()).toBe('file-search');
  });

  it('renders sorted repositories by forks when selected', async () => {
    const wrapper = mount(RepoList, {
      props: { repos },
    });

    // Select 'Forks' option
    await wrapper.setData({ sortBy: 'forks' });

    // Wait for sorting
    await new Promise(resolve => setTimeout(resolve, 300));

    // Assertions
    const repoLinks = wrapper.findAll('.repo__list__item__link');
    expect(repoLinks.length).toBe(repos.length);
    expect(repoLinks.at(0).text()).toBe('file-search');
    expect(repoLinks.at(1).text()).toBe('music-search');
  });

  it('renders sorted repositories by type when selected', async () => {
    const wrapper = mount(RepoList, {
      props: { repos },
    });

    // Select 'Type' option
    await wrapper.setData({ sortBy: 'type' });

    // Wait for sorting
    await new Promise(resolve => setTimeout(resolve, 300));

    // Assertions
    const repoLinks = wrapper.findAll('.repo__list__item__link');
    expect(repoLinks.length).toBe(repos.length);
    expect(repoLinks.at(0).text()).toBe('file-search');
    expect(repoLinks.at(1).text()).toBe('music-search');
  });

  it('displays pagination buttons and paginates repositories', async () => {
    const wrapper = mount(RepoList, {
      props: { repos },
    });

    // Wait for pagination buttons to render
    await new Promise(resolve => setTimeout(resolve, 300));

    // Assertions
    expect(wrapper.find('.pagination').exists()).toBe(true);

    // Click next page button
    await wrapper.find('.pagination__button-next').trigger('click');

    // Wait for pagination
    await new Promise(resolve => setTimeout(resolve, 300));

    // Assertions
    const repoLinks = wrapper.findAll('.repo__list__item__link');
    expect(repoLinks.length).toBe(0); // Assuming there are only two repositories in the provided data
  });
});
