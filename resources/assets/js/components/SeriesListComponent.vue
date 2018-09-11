<template>
    <div class="series-list">
				<b-container fluid class="p-4 bg-light clearfix">
				    <b-col v-for="aseries in series" class="col-sm-4 float-left">
				      <b-img thumbnail fluid :src="aseries.featured_image_url" alt="" v-on:click="onSelectSeries(aseries)"/>
				      <div> {{ aseries.name }}</div>
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
			  			series:[]
					}
			  },
    		created(){
    			this.load_page();
    		},
        methods: {
			    onSelectSeries(series){
			    	if(this.$parent.$parent.$options.methods.onSelectSeries)
			    	{
			    		this.$parent.$parent.$options.methods.onSelectSeries(series)
			    	}
			    },
			    load_page(){
			    	axios.get('/api/series?page=' + this.currentPage).then(function(response){
	    				return response.data;
	    			}).then((payload)=>{
	    				this.series = payload.data;
	    				this.last_page = payload.meta.last_page;
	    				this.perPage = payload.meta.per_page;
	    				this.totalRows = payload.meta.total;
	    			});
			    }
			  }
    }
</script>
