<template>
  <div class="user">
    <h1>Get Github repositories of a user</h1>
    <input
      v-model="userName"
      placeholder="Enter Github username"
      :class="{
        user__input: !errors.length,
        'user__input--error': errors.length,
      }"
      @input="fetchUserSuggestionsDebounced"
    />
    <div v-if="errors">
      <div v-for="(err, index) in errors" :key="index" class="user__error">
        {{ err }}
      </div>
    </div>
    <div v-if="isLoading">Loading...</div>
    <div v-if="suggestions.length && !repos.length">
      <ul class="user__suggestions">
        <li
          v-for="suggestion in suggestions"
          :key="suggestion.id"
          @click="selectSuggestion(suggestion)"
        >
          <img :src="suggestion.avatar_url" class="user__avatar" />
          {{ suggestion.login }}
        </li>
      </ul>
    </div>
    <div v-if="repos">
      <div class="user__profile">
        <a class="user__profile__link" :href="owner.html_url" target="_blank">
          <img :src="owner.avatar_url" class="user__avatar" />
          <span class="user__profile__text">{{ owner.login }}</span>
        </a>
      </div>

      <RepoList
        v-if="repos.length > 0"
        :repos="repos"
        :showSortingOptions="showSortingOptions"
        @update-repos="updateRepos"
      />
      <div v-if="noMatchingRepoFound">No such repository found</div>
    </div>
  </div>
</template>

<script>
import RepoList from "./RepoList.vue";
import _debounce from "lodash/debounce";
export default {
  components: {
    RepoList,
  },
  data() {
    return {
      repos: [],
      allRepos: [],
      owner: {
        avatar_url: "",
        login: "",
      },
      errors: [],
      userName: "",
      isLoading: false,
      showSortingOptions: false,
      suggestions: [],
      noMatchingRepoFound: false,
    };
  },
  watch: {
    userName(newValue) {
      this.repos = [];
      if (!newValue) {
        this.owner.avatar_url = "";
        this.owner.login = "";
        this.showSortingOptions = false;
        this.suggestions = [];
        this.noMatchingRepoFound = false;
      } else {
        this.fetchUserSuggestionsDebounced();
      }
    },
  },
  methods: {
    fetchUserSuggestionsDebounced: _debounce(async function () {
      console.log("fetchUserSuggestionsDebounced called");
      try {
        const suggestions = await this.fetchUserSuggestions(this.userName);
        this.suggestions = suggestions;
      } catch (error) {
        console.error("Error:", error.message);
      }
    }, 300),
    async fetchUserSuggestions(username) {
      console.log("fetchUserSuggestions called");
      const apiUrl = `https://api.github.com/search/users?q=${username}`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      if (response.ok) {
        return data.items;
      } else {
        throw new Error(`Error fetching user suggestions: ${data.message}`);
      }
    },
    selectSuggestion(suggestion) {
      this.userName = suggestion.login;
      this.suggestions = [];
      this.getUserRepos();
    },
    async getUserRepos() {
      this.repos = [];
      this.errors = [];
      this.isLoading = true;

      if (!this.userName) {
        this.errors.push("Please enter a username to access the repositories");
        this.isLoading = false;
        return;
      }

      try {
        const res = await fetch(
          `https://api.github.com/users/${this.userName}/repos?per_page=250`
        );
        const data = await res.json();

        if (res.status !== 200) {
          this.errors.push(
            res.statusText || "Please try with a different username"
          );
          return;
        }

        this.owner = data[0].owner;
        this.repos = data;
        this.showSortingOptions = true;
      } catch (err) {
        this.errors.push(err);
      } finally {
        this.isLoading = false;
      }
    },
    updateRepos(updatedRepos) {
      this.noMatchingRepoFound = updatedRepos.length === 0 ? true : false;
      this.repos = updatedRepos;
    },
  },
};
</script>
