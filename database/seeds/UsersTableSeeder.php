<?php

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class UsersTableSeeder extends Seeder
{
    public function run()
    {
        $admin = factory(App\User::class)->create([ 
            'email'=> 'admin1@email.com'
        ]);



			$role = Role::create(['guard_name'=>'api', 'name' => 'admin']);
			$admin->assignRole($role);
    }
}
