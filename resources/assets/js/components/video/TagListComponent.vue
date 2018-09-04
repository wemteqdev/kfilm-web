<template>
    <div class="clearfix">
		<div>Add Tags</div>
    	<div>
    		<span v-for="(tag, index) in available_tags">
    			<md-chip v-on:click="add_tag(tag)" class="md-primary" md-clickable>{{ tag }}</md-chip>&nbsp;
    		</span>
    		<br />
    	</div>

		<div class="clearfix">
			<md-chips v-model="tags" md-placeholder="Add Tag..." v-on:md-insert="add_tag" v-on:md-delete="remove_tag">
			</md-chips>
		</div>
  </div>
</template>

<script>
    export default {
  	  data: function(){
		  	return {
		  		video_id: null,
		  		tags: [],
		  		tag: '',
		  		available_tags: []
				}
		  },
		  mounted: function(){
		  	this.video_id = this.$parent.video.id;
		  	this.tags = this.$parent.video.tags;
		  	this.available_tags = this.$parent.available_tags;
		  },
      methods: {
		    add_tag(tag){
		    	if (tag == undefined)
		    	{
		    		tag = this.tag;
		    	}
		    	axios.post(`/api/videos/${this.video_id}/add_tag?tag=${tag}`).then(function(response){
    				return response.data;
    			}).then((payload)=>{
    				this.tags = payload.data.tags;
    				this.tag = '';
    			});
		    },
		    remove_tag(tag){
		    	axios.delete(`/api/videos/${this.video_id}/remove_tag?tag=${tag}`).then(function(response){
    				return response.data;
    			}).then((payload)=>{
    				this.tags = payload.data.tags;
    			});
		    }
		  }
    }
</script>