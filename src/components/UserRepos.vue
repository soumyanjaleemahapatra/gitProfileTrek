<template>
<div class="user">
    <h1> List of Github repositories for a user: </h1>
    <input 
        v-model="userName" 
        placeholder="Enter username" 
        :class="this.errors.length === 0 ? 'user__input' : 'user__input user__input--error'"
        autofocus="autofocus"
    />
    <div v-if="this.errors.length!==0">
        <span v-for="(err,index) in this.errors" :key="err[index]" class="user__error">
            {{err}}
        </span>
    </div>
    
    <button v-on:click="getUserRepos" class="user__btn">List user repos in Git</button>
    <div v-if="repos.length!==0" class="user__info">
        <img :src = owner.avatar_url class="user__info__avatar">  
        <span class="user__info__text">{{owner.login}}</span>
        <ul v-for="repo in repos"  :key="repo" class="user__info__list">
            <li class="user__info__list__item">
                {{ repo.full_name }}
            </li>
            <li class="user__info__list__item">
                {{ repo.description }}
            </li>
        </ul>
    </div>
    
</div>
</template>

<script>
export default {
    name: 'UserRepos',
    data() {
        return{
            repos:[],
            owner: {
                avatar_url:'' ,
                login:'' 
            },
            errors:[]      
        }
    },
    methods: {
        async getUserRepos(){
            if (this.repos.length !==0){
                this.repos=[]
            }
            if (this.errors.length !==0){
                this.errors=[]
            }
            if(this.userName){
                try {
                    const res = await fetch('https://api.github.com/users/'+this.userName +'/repos?per_page=250')
                    const data = await res.json()
                    if(res.status !== 200) {
                        this.errors.push(res.statusText || 'Please try with a different user name')
                        return;
                    } 
                    this.owner = data[0].owner
                    data.forEach(element => {
                        this.repos.push(element)
                    });
                }
                catch(err){
                    this.errors.push(err)
                }
                
            } else {
               this.errors.push('Please enter a username to access the repositiories') 
            }
        }
    }
}
</script>
