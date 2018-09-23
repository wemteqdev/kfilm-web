<?php

namespace App\Http\Controllers\Admin;

use Request;
use Response;
use Flash;

use Prettus\Repository\Criteria\RequestCriteria;

use App\Http\Requests\Admin\CreateSeriesRequest;
use App\Http\Requests\Admin\UpdateSeriesRequest;
use App\Repositories\Admin\SeriesRepository;
use App\Http\Controllers\AdminBaseController;

class SeriesController extends AdminBaseController
{
    private $seriesRepository;

    public function __construct(SeriesRepository $seriesRepo)
    {
        $this->seriesRepository = $seriesRepo;
    }

    public function index(Request $request)
    {
        $this->seriesRepository->pushCriteria(new RequestCriteria($request));
        $series = $this->seriesRepository->all();

        return view('admin.series.index')->with('series', $series);
    }

    public function create()
    {
        return view('admin.series.create');
    }

    public function store(CreateSeriesRequest $request)
    {
        $input = $request->all();

        $series = $this->seriesRepository->create($input);

        Flash::success('series saved successfully.');

        return redirect(route('admin.series.index'));
    }

    public function show($id)
    {
        $series = $this->seriesRepository->findWithoutFail($id);

        if (empty($series)) {
            Flash::error('series not found');

            return redirect(route('admin.series.index'));
        }

        return view('admin.series.show')->with('series', $series);
    }

    public function edit($id)
    {
        $series = $this->seriesRepository->findWithoutFail($id);

        if (empty($series)) {
            Flash::error('series not found');

            return redirect(route('admin.series.index'));
        }

        return view('admin.series.edit')->with('series', $series);
    }

    public function update($id, UpdateSeriesRequest $request)
    {
        $series = $this->seriesRepository->findWithoutFail($id);

        if (empty($series)) {
            Flash::error('series not found');

            return redirect(route('admin.series.index'));
        }

        $series = $this->seriesRepository->update($request->all(), $id);

        Flash::success('series updated successfully.');

        return redirect(route('admin.series.index'));
    }

    public function destroy($id)
    {
        $series = $this->seriesRepository->findWithoutFail($id);

        if (empty($series)) {
            Flash::error('series not found');

            return redirect(route('admin.series.index'));
        }

        $this->seriesRepository->delete($id);

        Flash::success('series deleted successfully.');

        return redirect(route('admin.series.index'));
    }
}
