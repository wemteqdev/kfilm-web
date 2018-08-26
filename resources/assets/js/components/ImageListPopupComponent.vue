<template>
    <div class="image-list">
    	
				<vue-select-image :dataImages="images" @onselectimage="onSelectImage">
				</vue-select-image>
				
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
        	if (typeof this.$redrawVueMasonry === 'function') {
		        this.$redrawVueMasonry()
		      }
        },
        methods: {
			    clickCallback(pageNum) {
			      this.load_page(pageNum);
			    },
			    onSelectImage(image){
			    	if(this.$parent.$options.methods.onSelectImage)
			    	{
			    		this.$parent.$options.methods.onSelectImage(image)
			    	}
			    },
			    load_page(pageNum){
			    	console.log(111111);
			    	axios.get('/api/images?page=' + this.currentPage).then(function(response){
	    				return response.data;
	    			}).then((payload)=>{
	    				this.images = _.map(payload.data, function(image){
	    					return { id: image.id, src: image.uri, alt: '', uri: image.uri };
	    				});
	    				this.last_page = payload.last_page;
	    				this.perPage = payload.per_page;
	    				this.totalRows = payload.total;
	    			});
			    }
			  }
    }
</script>
