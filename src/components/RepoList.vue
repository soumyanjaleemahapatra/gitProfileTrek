<template>
	<div class="user__sorting">
		<label>Sort By:</label>
		<select v-model="sortBy" @change="sortRepos">
		<option value="name">Name</option>
		<option value="stars">Stars</option>
		<option value="forks">Forks</option>
		<option value="type">Type</option>
		</select>
  </div>
    <ul>
		<li v-for="(repo, index) in sortedRepos" :key="repo.id" class="user__repo">
			<div class="user__repo__item">
				<span v-if='index===0' class="user__repo__item__label">Repository</span>
				<span class="user__repo__item__text">{{ repo.full_name }}</span>
			</div>
			<div class="user__repo__item">
				<span v-if='index===0' class="user__repo__item__label">Description</span>
				<span class="user__repo__item__text">{{ repo.description }}</span>
			</div>
		</li>
	</ul>
</template>

<script>
export default {
	props: {
		repos: {
			type: Array,
			default: () => [],
		},
		showSortingOptions: {
			type: Boolean,
			default: () => false
		},
	},
	data() {
		return {
			sortBy: 'name', 
		}
	},
	computed: {
    sortedRepos() {
		return this.sortRepos([...this.repos]);
    },
  },
	methods: {
		sortRepos(repos) {
			switch (this.sortBy) {
				case 'name':
					return repos.sort((a, b) => a.full_name.localeCompare(b.full_name));
				case 'stars':
					return repos.sort((a, b) => b.stargazers_count - a.stargazers_count);
				case 'forks':
					return repos.sort((a, b) => b.forks_count - a.forks_count);
				case 'type':
					return repos.sort((a, b) => a.private - b.private);
				default:
					return repos;
			}
		},
	}
}	
</script>