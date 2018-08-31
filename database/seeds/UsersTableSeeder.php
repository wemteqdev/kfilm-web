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
        $role = Role::create(['guard_name'=>'api', 'name' => 'free']);
        $role = Role::create(['guard_name'=>'api', 'name' => 'plus']);
        $role = Role::create(['guard_name'=>'api', 'name' => 'pro']);
        $role = Role::create(['guard_name'=>'api', 'name' => 'business']);
        $role = Role::create(['guard_name'=>'api', 'name' => 'premium']);
        $admin->assignRole($role);
    }
}
