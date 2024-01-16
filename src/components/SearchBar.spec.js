import { mount } from '@vue/test-utils';
import SearchBar from './SearchBar.vue';

describe('SearchBar Component', () => {
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

  it('renders the search input', () => {
    const wrapper = mount(SearchBar, {
      props: { repos },
    });

    // Assertions
    expect(wrapper.find('.repo-searchbar').exists()).toBe(true);
  });

  it('emits update-repos event when search term is cleared', async () => {
    const wrapper = mount(SearchBar, {
      props: { repos },
    });

    // Simulate clearing the search term
    await wrapper.setData({ repoSearchTerm: '' });

    // Assertions
    expect(wrapper.emitted('update-repos')).toBeTruthy();
    expect(wrapper.emitted('update-repos')[0][0]).toEqual(repos);
  });

  it('emits update-repos event when searching for repositories', async () => {
    const wrapper = mount(SearchBar, {
      props: { repos },
    });

    // Simulate entering a repository name for search
    await wrapper.setData({ repoSearchTerm: 'file-search' });

    // Assertions
    expect(wrapper.emitted('update-repos')).toBeTruthy();
    expect(wrapper.emitted('update-repos')[0][0].length).toBe(1);
    expect(wrapper.emitted('update-repos')[0][0][0].name).toBe('file-search');
  });

});
