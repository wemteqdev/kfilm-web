<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\Admin\CreateSlideRequest;
use App\Http\Requests\Admin\UpdateSlideRequest;
use App\Repositories\Admin\SlideRepository;
use App\Http\Controllers\AdminBaseController;
use Illuminate\Http\Request;
use Flash;
use Prettus\Repository\Criteria\RequestCriteria;
use Response;
use App\Http\Resources\Slide as Resource;
use App\Enums\SlideStatus;

class SlideController extends AdminBaseController
{
    /** @var  slideRepository */
    private $slideRepository;

    public function __construct(slideRepository $slideRepo)
    {
        $this->slideRepository = $slideRepo;
    }

    public function index(Request $request)
    {
        $this->slideRepository->pushCriteria(new RequestCriteria($request));
        $slides = $this->slideRepository->all();

        return view('admin.slides.index')
            ->with('slides', $slides);
    }

    public function create()
    {
        return view('admin.slides.create');
    }

    public function store(CreateSlideRequest $request)
    {
        $input = $request->all();

        $slide = $this->slideRepository->create($input);

        Flash::success('slide saved successfully.');

        return redirect(route('admin.slides.edit', $slide));
    }

    public function show($id)
    {
        $slide = $this->slideRepository->findWithoutFail($id);

        if (empty($slide)) {
            Flash::error('slide not found');

            return redirect(route('admin.slides.index'));
        }

        return view('admin.slides.show')->with('slide', $slide);
    }

    public function edit($id)
    {
        $slide = $this->slideRepository->findWithoutFail($id);

        if (empty($slide)) {
            Flash::error('slide not found');

            return redirect(route('admin.slides.index'));
        }

        return view('admin.slides.edit')->with('slide', $slide);
    }

    public function update($id, UpdateSlideRequest $request)
    {
        $slide = $this->slideRepository->findWithoutFail($id);

        if (empty($slide)) {
            Flash::error('slide not found');

            return redirect(route('admin.slides.index'));
        }

        $slide = $this->slideRepository->update($request->all(), $id);

        Flash::success('slide updated successfully.');

        return redirect(route('admin.slides.index'));
    }

    public function destroy($id)
    {
        $slide = $this->slideRepository->findWithoutFail($id);

        if (empty($slide)) {
            Flash::error('slide not found');

            return redirect(route('admin.slides.index'));
        }

        $this->slideRepository->delete($id);

        Flash::success('slide deleted successfully.');

        return redirect(route('admin.slides.index'));
    }
}
