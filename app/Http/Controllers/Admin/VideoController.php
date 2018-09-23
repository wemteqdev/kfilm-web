<?php
namespace App\Http\Controllers\Admin;

use Request;
use Response;
use Flash;

use Prettus\Repository\Criteria\RequestCriteria;
use Vimeo\Laravel\Facades\Vimeo;

use App\Http\Requests\Admin\CreateVideoRequest;
use App\Http\Requests\Admin\UpdateVideoRequest;
use App\Http\Controllers\AdminBaseController;
use App\Repositories\Admin\VideoRepository;
use App\Models\Video;
use App\Enums\VideoType;

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
        $videos = $this->videoRepository;

        if(isset($request->type))
        {
            $videos = $videos->scopeQuery(function($query) use ($request){
                return $query->where('type', VideoType::getValue($request->type));
            });
        }

        $videos = $videos->orderBy('created_at', 'desc')->paginate(12);

        return view('admin.videos.index')->with('videos', $videos);
    }

    public function normal(Request $request)
    {
        $videos = Video::normal()->orderBy('created_at', 'desc')->paginate(9);

        return view('admin.videos.index')->with('videos', $videos);

    }
    
    public function featured(Request $request)
    {
        $videos = Video::featured()->orderBy('created_at', 'desc')->paginate(9);

        return view('admin.videos.index')->with('videos', $videos); 
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

        return view('admin.videos.edit')->with('video', $video);
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
        
        return back();
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
