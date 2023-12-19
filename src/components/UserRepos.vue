<template>
	<div class="user">
		<h1>List of Github repositories for a user</h1>
		<input
			v-model="userName"
			placeholder="Enter Github username"
			:class="{ 'user__input': !errors.length, 'user__input--error': errors.length }"
		/>
		<div v-if="errors">
			<div v-for="(err, index) in errors" :key="index" class="user__error">
				{{ err }}
			</div>
		</div>

		<button @click="getUserRepos" class="user__btn">List user repos in Git</button>
		<div v-if="isLoading">Loading...</div>
		<div v-if="repos">
			<img :src="owner.avatar_url" class="user__avatar" />
			<span class="user__name">{{ owner.login }}</span>
			<RepoList v-if="repos.length > 0" 
				:repos="repos" 
				:showSortingOptions="showSortingOptions" 
			/>
			<!-- <div v-if="repos.length > 0 && showSortingOptions">
				<RepoListSorting :repos="repos" />
			</div> -->
		</div>
	</div>
</template>

<script>
import RepoList from './RepoList.vue';
export default {
	components: {
		RepoList
	},
	data() {
		return {
			repos: [],
			owner: {
				avatar_url: '',
				login: '',
			},
			errors: [],
			userName: '',
			isLoading: false,
			showSortingOptions: false,
		};
	},
	watch: {
		userName(newValue) {
			if (!newValue) {
				this.repos = [];
				this.owner.avatar_url = '';
				this.owner.login = '';
			}
		},
	},
	methods: {
		async getUserRepos() {
			this.repos = [];
			this.errors = [];
			this.isLoading = true;

			if (!this.userName) {
				this.errors.push('Please enter a username to access the repositories');
				this.isLoading = false;
				return;
			}

			try {
				const res = await fetch(`https://api.github.com/users/${this.userName}/repos?per_page=250`);
				const data = await res.json();

				if (res.status !== 200) {
					this.errors.push(res.statusText || 'Please try with a different username');
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
	},
};
</script>