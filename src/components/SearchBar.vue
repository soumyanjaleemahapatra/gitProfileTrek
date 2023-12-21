<template>
  <input
    v-model="repoSearchTerm"
    id="repoSearchInput"
    class="repo-searchbar"
    placeholder="Enter repository name to search"
    @input="searchRepos"
  />
</template>

<script>
export default {
  props: {
    repos: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      repoSearchTerm: "",
    };
  },
  watch: {
    repoSearchTerm: {
      handler: 'searchRepos',
      immediate: true, 
    },
  },
  methods: {
    searchRepos() {
      const searchTerm = this.repoSearchTerm.toLowerCase().trim();
      if (!searchTerm) {
        this.$emit("update-repos", this.repos);
        return;
      }
      const filteredRepos = this.repos.filter(
        (repo) =>
          repo.name.toLowerCase().includes(searchTerm) ||
          (repo.description &&
            repo.description.toLowerCase().includes(searchTerm))
      );
      this.$emit("update-repos", filteredRepos);
    },
  },
};
</script>
