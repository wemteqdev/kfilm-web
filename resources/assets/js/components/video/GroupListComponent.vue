<template>
    <div class="clearfix">
    	<div>
    		Add Groups
    		<span v-for="(group, index) in available_groups">
    			<a href="javascript:void(0)" v-on:click="add_group(group)">{{ group }}</a>,
    		</span>
    	</div>

    	<hr/>

			<div v-for="(group, index) in groups" variant="success">
				{{ group }}
				<a href="javascript:void(0)" v-on:click="remove_group(group)"><i class="fa fa-close"></i></a>
			</div>
  </div>

</template>

<script>
    export default {
  	  data: function(){
		  	return {
		  		video_id: null,
		  		groups: [],
		  		available_groups: []
				}
		  },
		  mounted: function(){
		  	this.video_id = this.$parent.video.id;
		  	this.groups = this.$parent.video.groups;
		  	this.available_groups = this.$parent.available_groups;
		  },
      methods: {
		    add_group(group_slug){
		    	axios.post(`/api/videos/${this.video_id}/add_group?group_slug=${group_slug}`).then(function(response){
    				return response.data;
    			}).then((payload)=>{
    				console.log(payload);
    				this.groups = payload.data.groups;
    			});
		    },
		    remove_group(group_slug){
		    	axios.delete(`/api/videos/${this.video_id}/remove_group?group_slug=${group_slug}`).then(function(response){
    				return response.data;
    			}).then((payload)=>{
    				this.groups = payload.data.groups;
    			});
		    }
		  }
    }
</script>