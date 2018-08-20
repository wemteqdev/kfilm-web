<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\Admin\CreateImageRequest;
use App\Http\Requests\Admin\UpdateImageRequest;
use App\Repositories\Admin\ImageRepository;
use App\Http\Controllers\AppBaseController;
use Illuminate\Http\Request;
use Flash;
use Prettus\Repository\Criteria\RequestCriteria;
use Response;

class ImageController extends AppBaseController
{
    /** @var  ImageRepository */
    private $imageRepository;

    public function __construct(ImageRepository $imageRepo)
    {
        $this->imageRepository = $imageRepo;
    }

    /**
     * Display a listing of the Image.
     *
     * @param Request $request
     * @return Response
     */
    public function index(Request $request)
    {
        $this->imageRepository->pushCriteria(new RequestCriteria($request));
        $images = $this->imageRepository->all();

        return view('admin.images.index')
            ->with('images', $images);
    }

    /**
     * Show the form for creating a new Image.
     *
     * @return Response
     */
    public function create()
    {
        return view('admin.images.create');
    }

    /**
     * Store a newly created Image in storage.
     *
     * @param CreateImageRequest $request
     *
     * @return Response
     */
    public function store(CreateImageRequest $request)
    {
        $input = $request->all();
        
        list($width, $height) = getimagesize($request->file('file'));
        $path = $request->file('file')->store('images', 'public');
        
        $input['uri'] = $path;
        $input['width'] = $width;
        $input['height'] = $height;

        $image = $this->imageRepository->create($input);

        Flash::success('Image saved successfully.');

        return redirect(route('admin.images.index'));
    }

    /**
     * Display the specified Image.
     *
     * @param  int $id
     *
     * @return Response
     */
    public function show($id)
    {
        $image = $this->imageRepository->findWithoutFail($id);

        if (empty($image)) {
            Flash::error('Image not found');

            return redirect(route('admin.images.index'));
        }

        return view('admin.images.show')->with('image', $image);
    }

    /**
     * Show the form for editing the specified Image.
     *
     * @param  int $id
     *
     * @return Response
     */
    public function edit($id)
    {
        $image = $this->imageRepository->findWithoutFail($id);

        if (empty($image)) {
            Flash::error('Image not found');

            return redirect(route('admin.images.index'));
        }

        return view('admin.images.edit')->with('image', $image);
    }

    /**
     * Update the specified Image in storage.
     *
     * @param  int              $id
     * @param UpdateImageRequest $request
     *
     * @return Response
     */
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

    /**
     * Remove the specified Image from storage.
     *
     * @param  int $id
     *
     * @return Response
     */
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
