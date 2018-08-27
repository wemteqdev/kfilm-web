export default class Api {
}

Api.images = {
    index(page){
        return axios.get("/api/images?page=" + page);
    }
};

Api.group = {
    add_video(group_id, video_id){
        return axios.post("/api/groups/" + group_id + "/add_video?video_id=" + video_id);
    },
    remove_image(group_id, image_id){
        return axios.delete("/api/groups/" + group_id + "/remove_image?image_id=" + image_id);
    },
    add_image(group_id, image_id){
        return axios.post("/api/groups/" + group_id + "/add_image?image_id=" + image_id);
    },
    update_featured_image(group_id, image_id){
        return axios.post("/api/groups/" + group_id + "/update_featured_image?image_id=" + image_id);
    },
    remove_video(group_id, video_id){
        return axios.delete("/api/groups/" + group_id + "/remove_video?video_id=" + video_id);
    },
};


Api.videos = {
    index(page){
        return axios.get("/api/videos?page=" + page);
    },
    add_image(video_id, image_id){
        return axios.post("/api/videos/" + video_id + "/add_image?image_id=" + image_id);
    },
    remove_image(video_id, image_id){
        return axios.delete("/api/videos/" + video_id + "/remove_image?image_id=" + image_id);
    },
    update_featured_image(video_id, image_id){
        return axios.post("/api/videos/" + video_id + "/update_featured_image?image_id=" + image_id);
    },
    tag(video_id, tag){
        return axios.post("/api/videos/" + video_id + "/tag?tag=" + tag);
    },
    untag(video_id, tag){
        return axios.delete("/api/videos/" + video_id + "/untag?tag=" + tag);
    },
    add_category(video_id, category_slug){
        return axios.post("/api/videos/" + video_id + "/add_category?category_slug=" + category_slug);
    },
    remove_category(video_id, category_slug){
        return axios.delete("/api/videos/" + video_id + "/remove_category?category_slug=" + category_slug);
    },
    add_plan(video_id, plan_id){
        return axios.post("/api/videos/" + video_id + "/add_plan?plan_id=" + plan_id);
    },
    add_tagged_plans(video_id, tag){
        return axios.post("/api/videos/" + video_id + "/add_tagged_plans?tag=" + tag);
    },
    remove_plan(video_id, plan_id){
        return axios.delete("/api/videos/" + video_id + "/remove_plan?plan_id=" + plan_id);
    },
};

Api.categories = {
    add_video(category_id, video_id){
        return axios.post("/api/categories/" + category_id + "/add_video?video_id=" + video_id);
    },
    remove_video(category_id, video_id){
        return axios.delete("/api/categories/" + category_id + "/remove_video?video_id=" + video_id);
    },
    update_position(category_id, target_category_id){
        return axios.patch("/api/categories/" + category_id + "/update_position?target_category_id=" + target_category_id);
    },
    update_featured_image(category_id, image_id){
        return axios.patch("/api/categories/" + category_id + "/update_featured_image?image_id=" + image_id);
    }
};
