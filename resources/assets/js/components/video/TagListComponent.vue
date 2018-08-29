<template>
    <div class="clearfix">
    	<div>
    		Add Tags
    		<span v-for="(tag, index) in available_tags">
    			<a href="javascript:void(0)" v-on:click="add_tag(tag)">{{ tag }}</a>,
    		</span>
    		<br />

    		<input type="text" v-model="tag"> <a href="javascript:void(0)" v-on:click="add_tag()" class="btn btn-primary">Add</a> &nbsp;
    	</div>

    	<hr/>

			<div v-for="(tag, index) in tags" variant="success">
				{{ tag }}
				<a href="javascript:void(0)" v-on:click="remove_tag(tag)"><i class="fa fa-close"></i></a>
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