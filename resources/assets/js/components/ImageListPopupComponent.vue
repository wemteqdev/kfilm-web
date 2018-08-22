<template>
    <div class="image-list">
    	
				<vue-select-image :dataImages="images" @onselectimage="onSelectImage">
				</vue-select-image>
				
    	<nav>
        <paginate
        	:page-class="'page-item'"
				  :page-count="last_page"
				  :click-handler="clickCallback"
				  :prev-text="'Prev'"
				  :next-text="'Next'"
				  :container-class="'pagination'">
				</paginate>
			</nav>

  </div>

</template>

<script>
    export default {
    	  data: function(){
			  	return {
			  			last_page: 1,
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
			    	axios.get('/api/images?page=' + pageNum).then(function(response){
	    				return response.data;
	    			}).then((payload)=>{
	    				this.images = _.map(payload.data, function(image){
	    					return { id: image.id, src: image.uri, alt: '', uri: image.uri };
	    				});
	    				this.last_page = payload.last_page;
	    			});
			    }
			  }
    }
</script>
