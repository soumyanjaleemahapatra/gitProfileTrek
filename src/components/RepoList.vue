<template>
    <ul>
		<li v-for="(repo, index) in repos" :key="repo.id" class="user__repo">
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
		}
	}
}	

</script>