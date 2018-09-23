<?php

namespace App\Http\Controllers\Admin;

use Request;
use Response;
use Storage;
use Flash;

use Prettus\Repository\Criteria\RequestCriteria;

use App\Http\Requests\Admin\CreateImageRequest;
use App\Http\Requests\Admin\UpdateImageRequest;
use App\Http\Controllers\AdminBaseController;
use App\Repositories\Admin\ImageRepository;

class ImageController extends AdminBaseController
{
    private $imageRepository;

    public function __construct(ImageRepository $imageRepo)
    {
        $this->imageRepository = $imageRepo;
    }

    public function index(Request $request)
    {
        $this->imageRepository->pushCriteria(new RequestCriteria($request));
        $images = $this->imageRepository->orderBy('created_at', 'desc')->paginate(9);

        return view('admin.images.index')
            ->with('images', $images);
    }

    public function create()
    {
        return view('admin.images.create');
    }

    public function store(CreateImageRequest $request)
    {
        $input = $request->all();
        
        list($width, $height) = getimagesize($request->file('file'));
        $path = $request->file('file')->store('images', 'public');
        
        $input['uri'] = Storage::disk('public')->url($path);
        $input['width'] = $width;
        $input['height'] = $height;

        $image = $this->imageRepository->create($input);

        Flash::success('Image saved successfully.');

        return redirect(route('admin.images.index'));
    }

    public function show($id)
    {
        $image = $this->imageRepository->findWithoutFail($id);

        if (empty($image)) {
            Flash::error('Image not found');

            return redirect(route('admin.images.index'));
        }

        return view('admin.images.show')->with('image', $image);
    }

    public function edit($id)
    {
        $image = $this->imageRepository->findWithoutFail($id);

        if (empty($image)) {
            Flash::error('Image not found');

            return redirect(route('admin.images.index'));
        }

        return view('admin.images.edit')->with('image', $image);
    }

    public function update($id, UpdateImageRequest $request)
    {
        $image = $this->imageRepository->findWithoutFail($id);

        if (empty($image)) {
            Flash::error('Image not found');

            return redirect(route('admin.images.index'));
        }

        $image = $this->imageRepository->update($request->all(), $id);

        Flash::success('Image updated successfully.');

        return redirect(route('admin.images.index'));
    }

    public function destroy($id)
    {
        $image = $this->imageRepository->findWithoutFail($id);

        if (empty($image)) {
            Flash::error('Image not found');

            return redirect(route('admin.images.index'));
        }

        $this->imageRepository->delete($id);

        Flash::success('Image deleted successfully.');

        return redirect(route('admin.images.index'));
    }
}
