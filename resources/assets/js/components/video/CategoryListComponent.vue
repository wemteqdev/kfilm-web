<template>
    <div class="clearfix">
    	<div>
    		Add Categories
    		<span v-for="(category, index) in available_categories">
    			<a href="javascript:void(0)" v-on:click="add_category(category)">{{ category}}</a>,
    		</span>
    	</div>

    	<hr/>

			<div v-for="(category, index) in categories" variant="success">
				{{ category }}
				<a href="javascript:void(0)" v-on:click="remove_category(category)"><i class="fa fa-close"></i></a>
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
		    add_category(category_slug){
		    	axios.post(`/api/videos/${this.video_id}/add_category?category_slug=${category_slug}`).then(function(response){
    				return response.data;
    			}).then((payload)=>{
    				console.log(payload);
    				this.categories = payload.data.categories;
    			});
		    },
		    remove_category(category_slug){
		    	axios.delete(`/api/videos/${this.video_id}/remove_category?category_slug=${category_slug}`).then(function(response){
    				return response.data;
    			}).then((payload)=>{
    				this.categories = payload.data.categories;
    			});
		    }
		  }
    }
</script>