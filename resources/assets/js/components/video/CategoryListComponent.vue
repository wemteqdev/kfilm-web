<template>
    <div class="clearfix">
			<b-badge v-for="(category, index) in categories" variant="success">
				{{ category.name }}
				<a href="javascript:void(0)"><i class="fa fa-close"></i></a>
			</b-badge>
  </div>

</template>

<script>
    export default {
  	  data: function(){
		  	return {
		  		video_id: null,
		  		categories: []
				}
		  },
      methods: {
		    add_category(category_slug){
		    	axios.get(`/api/videos/${video_id}/add_category?category_slug=${category_id}`).then(function(response){
    				return response.data;
    			}).then((payload)=>{
    				this.categories = payload.data.categories;
    			});
		    },
		    remove_category(){
		    	axios.get(`/api/videos/${video_id}/remove_category?category_slug=${category_id}`).then(function(response){
    				return response.data;
    			}).then((payload)=>{
    				this.categories = payload.data.categories;
    			});
		    }
		  }
    }
</script>