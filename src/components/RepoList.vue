<template>
  <div class="repo__filter">
    <div class="repo__filter__sorting">
      <label>Sort Repositories By:</label>
      <select v-model="sortBy" @change="sortRepos">
        <option value="name">Name</option>
        <option value="stars">Stars</option>
        <option value="forks">Forks</option>
        <option value="type">Type</option>
      </select>
    </div>
    <span> or </span>
    <SearchBar :repos="originalRepos" @update-repos="updateRepos" />
  </div>

  <ul class="repo__list--wrapper">
    <li
      v-for="(repo, index) in paginatedRepos"
      :key="repo.id"
      class="repo__list"
    >
      <div class="repo__list__item">
        <span v-if="index === 0" class="repo__list__item__label"
          >Repository</span
        >
        <a
          class="repo__list__item__link"
          :href="repo.html_url"
          target="_blank"
          >{{ repo.name }}</a
        >
        <span class="repo__list__item__stars">
          ({{repo.stargazers_count}}*)
        </span>
      </div>
      <div class="repo__list__item">
        <span v-if="index === 0" class="repo__list__item__label"
          >Description</span
        >
        <span>{{ repo.description || "No description available" }}</span>
      </div>
    </li>
  </ul>
  <div class="pagination">
    <button
      class="pagination__button"
      @click="prevPage"
      :disabled="currentPage === 1"
    >
      Previous page
    </button>
    <span>Page {{ currentPage }} of {{ totalPages }}</span>
    <button
      class="pagination__button"
      @click="nextPage"
      :disabled="currentPage === totalPages"
    >
      Next page
    </button>
  </div>
</template>

<script>
import SearchBar from "./SearchBar.vue";
export default {
  components: {
    SearchBar,
  },
  props: {
    repos: {
      type: Array,
      default: () => [],
    },
    showSortingOptions: {
      type: Boolean,
      default: () => false,
    },
  },
  data() {
    return {
      sortBy: "name",
      reposPerPage: 10,
      currentPage: 1,
      originalRepos: [],
    };
  },
  computed: {
    sortedRepos() {
      return this.sortRepos([...this.repos]);
    },
    paginatedRepos() {
      const startIndex = (this.currentPage - 1) * this.reposPerPage;
      const endIndex = startIndex + this.reposPerPage;
      return this.sortedRepos.slice(startIndex, endIndex);
    },
    totalPages() {
      return Math.ceil(this.sortedRepos.length / this.reposPerPage);
    },
  },
  watch: {
    repos: {
      handler: "updateOriginalRepos",
      immediate: true,
    },
  },
  created() {
    this.originalRepos = [...this.repos];
  },
  methods: {
    sortRepos(repos) {
      switch (this.sortBy) {
        case "name":
          return repos.sort((a, b) => a.full_name.localeCompare(b.full_name));
        case "stars":
          return repos.sort((a, b) => b.stargazers_count - a.stargazers_count);
        case "forks":
          return repos.sort((a, b) => b.forks_count - a.forks_count);
        case "type":
          return repos.sort((a, b) =>
            a.private.toString().localeCompare(b.private.toString())
          );
        default:
          return repos;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage += 1;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage -= 1;
      }
    },
    /* generateStars(count) {
      return "*".repeat(count).trim();
    }, */
    updateRepos(searchedRepos) {
      this.$emit("update-repos", searchedRepos);
    },
  },
};
</script>
