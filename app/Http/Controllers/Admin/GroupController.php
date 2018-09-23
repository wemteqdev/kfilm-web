<?php

namespace App\Http\Controllers\Admin;

use Request;
use Response;
use Flash;

use Prettus\Repository\Criteria\RequestCriteria;

use App\Http\Requests\Admin\CreateGroupRequest;
use App\Http\Requests\Admin\UpdateGroupRequest;
use App\Repositories\Admin\GroupRepository;
use App\Http\Controllers\AdminBaseController;

class GroupController extends AdminBaseController
{
    private $groupRepository;

    public function __construct(GroupRepository $groupRepo)
    {
        $this->groupRepository = $groupRepo;
    }

    public function index(Request $request)
    {
        $this->groupRepository->pushCriteria(new RequestCriteria($request));
        $groups = $this->groupRepository->all();

        return view('admin.groups.index')
            ->with('groups', $groups);
    }

    public function create()
    {
        return view('admin.groups.create');
    }

    public function store(CreateGroupRequest $request)
    {
        $input = $request->all();

        $group = $this->groupRepository->create($input);

        Flash::success('Group saved successfully.');

        return redirect(route('admin.groups.index'));
    }

    public function show($id)
    {
        $group = $this->groupRepository->findWithoutFail($id);

        if (empty($group)) {
            Flash::error('Group not found');

            return redirect(route('admin.groups.index'));
        }

        return view('admin.groups.show')->with('group', $group);
    }

    public function edit($id)
    {
        $group = $this->groupRepository->findWithoutFail($id);

        if (empty($group)) {
            Flash::error('Group not found');

            return redirect(route('admin.groups.index'));
        }

        return view('admin.groups.edit')->with('group', $group);
    }

    public function update($id, UpdateGroupRequest $request)
    {
        $group = $this->groupRepository->findWithoutFail($id);

        if (empty($group)) {
            Flash::error('Group not found');

            return redirect(route('admin.groups.index'));
        }

        $group = $this->groupRepository->update($request->all(), $id);

        Flash::success('Group updated successfully.');

        return redirect(route('admin.groups.index'));
    }

    public function destroy($id)
    {
        $group = $this->groupRepository->findWithoutFail($id);

        if (empty($group)) {
            Flash::error('Group not found');

            return redirect(route('admin.groups.index'));
        }

        $this->groupRepository->delete($id);

        Flash::success('Group deleted successfully.');

        return redirect(route('admin.groups.index'));
    }
}
