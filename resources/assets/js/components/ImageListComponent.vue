<template>
    <div class="image-list">
    		<b-container fluid class="p-4 bg-light clearfix">

				    <b-col v-for="(image) in images" class="col-sm-4 float-left" v-bind:key="image.id">
				      <b-img thumbnail fluid :src="image.src" alt="" v-on:click="onSelectImage(image)"/>
				      <div> {{ image.name }}</div>
				    </b-col>

				</b-container>

	    	<b-pagination size="md" :total-rows="totalRows" v-model="currentPage" :per-page="perPage" v-on:input="load_page">
    		</b-pagination>
  </div>

</template>

<script>
    export default {
    	  data: function(){
			  	return {
			  			last_page: 1,
			  			totalRows: 0,
			  			currentPage: 1,
			  			perPage: 9,
			  			images:[]
					}
			  },
    		created(){
    			this.load_page(1);
    		},
        mounted() {
        	
        },
        methods: {
			    onSelectImage(image){
			    	if(this.$parent.$parent.$options.methods.onSelectImage)
			    	{
			    		this.$parent.$parent.$options.methods.onSelectImage(image)
			    	}
			    },
			    load_page(pageNum){
			    	axios.get('/api/images?page=' + this.currentPage).then(function(response){
	    				return response.data;
	    			}).then((payload)=>{
	    				this.images = payload.data;
	    				this.last_page = payload.meta.last_page;
	    				this.perPage = payload.meta.per_page;
	    				this.totalRows = payload.meta.total;
	    			});
			    }
			  }
    }
</script>