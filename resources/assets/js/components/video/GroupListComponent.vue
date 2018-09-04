<template>
    <div class="clearfix">
		<div>Add Groups</div>
    	<div>
    		<span v-for="(group, index) in available_groups">
    			<md-chip v-on:click="add_group(group)" class="md-primary" md-clickable>{{ group }}</md-chip>&nbsp;
    		</span>
    		<br />
    	</div>

		<div class="clearfix">
			<md-chips v-model="groups" md-placeholder="Add group..." v-on:md-insert="add_group" v-on:md-delete="remove_group">
			</md-chips>
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
		    add_group(group){
		    	axios.post(`/api/videos/${this.video_id}/add_group?group=${group}`).then(function(response){
    				return response.data;
    			}).then((payload)=>{
    				this.groups = payload.data.groups;
    			});
		    },
		    remove_group(group){
		    	axios.delete(`/api/videos/${this.video_id}/remove_group?group=${group}`).then(function(response){
    				return response.data;
    			}).then((payload)=>{
    				this.groups = payload.data.groups;
    			});
		    }
		  }
    }
</script>