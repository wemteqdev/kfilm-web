<?php
namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use Redirect;
use Validator;
use Flash;

use Prettus\Repository\Criteria\RequestCriteria;

use App\Http\Requests\Admin\CreateuserRequest;
use App\Http\Requests\Admin\UpdateUserRequest;
use App\Http\Controllers\AdminBaseController;
use App\Http\Resources\User as Resource;
use App\Repositories\Admin\UserRepository;
use App\Enums\UserRole;
use App\User;

class UserController extends AdminBaseController
{
    private $userRepository;

    public function __construct(UserRepository $userRepo)
    {
        $this->userRepository = $userRepo;
    }

    public function index(Request $request)
    {
        $this->userRepository->pushCriteria(new RequestCriteria($request));
        $users = $this->userRepository->paginate(24);

        return view('admin.users.index')->with('users', $users);
    }

    public function create()
    {
        return view('admin.users.create');
    }

    public function store(CreateUserRequest $request)
    {
        $input = $request->all();

        $user = $this->userRepository->create($input);

        Flash::success('user saved successfully.');

        return redirect(route('admin.users.edit', $user));
    }

    public function edit($id)
    {
        $user = $this->userRepository->findWithoutFail($id);

        if (empty($user)) {
            Flash::error('user not found');

            return redirect(route('admin.users.index'));
        }

        return view('admin.users.edit')->with('user', $user);
    }

    public function update($id, UpdateUserRequest $request)
    {
        $user = $this->userRepository->findWithoutFail($id);

        if (empty($user)) {
            Flash::error('user not found');

            return redirect(route('admin.users.index'));
        }

        $user = $this->userRepository->update($request->all(), $id);

        if($user->id != $request->user()->id)
        {
            $role = UserRole::getKey(intval($request->role));
            $user->syncRoles([$role]);
        }

        Flash::success('user updated successfully.');

        return redirect(route('admin.users.index'));
    }

    public function destroy($id)
    {
        $user = $this->userRepository->findWithoutFail($id);

        if (empty($user)) {
            Flash::error('user not found');

            return redirect(route('admin.users.index'));
        }

        $this->userRepository->delete($id);

        Flash::success('user deleted successfully.');

        return redirect(route('admin.users.index'));
    }

    function update_password($id, Request $request) {
        $user = User::find($id);
        $data = $request->all();
        
        $validator = Validator::make($data, [ 
            'new_password' => 'required|max:50',
            'confirm_password' => 'required|same:new_password',
        ]);

		if ($validator->fails()) { 
            return view('admin.users.edit', ['user'=>$user])->withErrors($validator);
        }
        
		$user->password = bcrypt($data['new_password']);

        if($user->save())
        {
            Flash::success('password updated successfully.');
        }
        
        return redirect(route('admin.users.index'));
	}
}
