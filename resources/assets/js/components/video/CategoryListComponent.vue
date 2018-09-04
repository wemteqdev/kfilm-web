<template>
    <div class="clearfix">
		<div>Add Categories</div>
    	<div>
    		<span v-for="(category, index) in available_categories">
    			<md-chip v-on:click="add_category(category)" class="md-primary" md-clickable>{{ category }}</md-chip>&nbsp;
    		</span>
    		<br />
    	</div>

		<div class="clearfix">
			<md-chips v-model="categories" md-placeholder="Add category..." v-on:md-insert="add_category" v-on:md-delete="remove_category">
			</md-chips>
		</div>
   </div>
</template>

<script>
    export default {
  	  data: function(){
		  	return {
		  		video_id: null,
		  		categories: [],
		  		available_categories: []
				}
		  },
		  mounted: function(){
		  	this.video_id = this.$parent.video.id;
		  	this.categories = this.$parent.video.categories;
		  	this.available_categories = this.$parent.available_categories;
		  },
      methods: {
		    add_category(category){
		    	axios.post(`/api/videos/${this.video_id}/add_category?category=${category}`).then(function(response){
    				return response.data;
    			}).then((payload)=>{
    				console.log(payload);
    				this.categories = payload.data.categories;
    			});
		    },
		    remove_category(category, index){
		    	axios.delete(`/api/videos/${this.video_id}/remove_category?category=${category}`).then(function(response){
    				return response.data;
    			}).then((payload)=>{
    				this.categories = payload.data.categories;
    			});
		    }
		  }
    }
</script>