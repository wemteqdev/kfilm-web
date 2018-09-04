<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\Admin\CreateVideoRequest;
use App\Http\Requests\Admin\UpdateVideoRequest;
use App\Repositories\Admin\VideoRepository;
use App\Http\Controllers\AdminBaseController;
use Illuminate\Http\Request;
use Flash;
use Prettus\Repository\Criteria\RequestCriteria;
use Response;
use App\Models\Video;
use Vimeo\Laravel\Facades\Vimeo;

class VideoController extends AdminBaseController
{
    private $videoRepository;

    public function __construct(VideoRepository $videoRepo)
    {
        $this->videoRepository = $videoRepo;
    }

    public function index(Request $request)
    {
        $this->videoRepository->pushCriteria(new RequestCriteria($request));
        $videos = $this->videoRepository->paginate(5);

        return view('admin.videos.index')
            ->with('videos', $videos);
    }

    public function create()
    {
        return view('admin.videos.create');
    }

    public function store(CreateVideoRequest $request)
    {
        $input = $request->all();

        Vimeo::setToken(session('vimeo_access_token'));

        if( $request->input('vimeo_video_id') != null)
        {
            Video::create_from_vimeo($request->input('vimeo_video_id'));
        }

        Flash::success('Video saved successfully.');

        return redirect(route('admin.videos.index'));
    }

    public function show($id)
    {
        $video = $this->videoRepository->findWithoutFail($id);

        if (empty($video)) {
            Flash::error('Video not found');

            return redirect(route('admin.videos.index'));
        }

        return view('admin.videos.show')->with('video', $video);
    }

    public function edit($id)
    {
        $video = $this->videoRepository->findWithoutFail($id);

        if (empty($video)) {
            Flash::error('Video not found');

            return redirect(route('admin.videos.index'));
        }

        return view('admin.videos.edit')->with('video', $video);
    }

    public function update($id, UpdateVideoRequest $request)
    {

        $video = $this->videoRepository->findWithoutFail($id);

        if (empty($video)) {
            Flash::error('Video not found');

            return redirect(route('admin.videos.index'));
        }

        $video = $this->videoRepository->update($request->all(), $id);

        Flash::success('Video updated successfully.');

        return redirect(route('admin.videos.index'));
    }

    public function publish($id, Request $request)
    {
        $video = Video::findOrFail($id);
        
        if( $video->publish())
        {
            Flash::success('Video published successfully.'); 
        }else{
            Flash::error('Something went wrong.'); 
        }
        
        return redirect(route('admin.videos.index'));
    }

    public function sync_vimeo_videos()
    {
        Vimeo::setToken(session('vimeo_access_token'));

        Video::create_videos_from_vimeo();

        return redirect(route('admin.videos.index'));
    }

    public function destroy($id)
    {
        $video = $this->videoRepository->findWithoutFail($id);

        if (empty($video)) {
            Flash::error('Video not found');

            return redirect(route('admin.videos.index'));
        }

        $this->videoRepository->delete($id);

        Flash::success('Video deleted successfully.');

        return redirect(route('admin.videos.index'));
    }
}
