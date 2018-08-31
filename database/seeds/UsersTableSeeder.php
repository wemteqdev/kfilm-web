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

        $free = factory(App\User::class)->create([ 
            'email'=> 'free1@email.com'
        ]);

        $pro = factory(App\User::class)->create([ 
            'email'=> 'pro1@email.com'
        ]);

        $premium = factory(App\User::class)->create([ 
            'email'=> 'premium1@email.com'
        ]);

        $role_admin = Role::create(['guard_name'=>'api', 'name' => 'admin']);
        $role_free = Role::create(['guard_name'=>'api', 'name' => 'free']);
        $role_pro = Role::create(['guard_name'=>'api', 'name' => 'pro']);
        $role_premium = Role::create(['guard_name'=>'api', 'name' => 'business']);

        $admin->assignRole($role_admin);
        $free->assignRole($role_free);
        $pro->assignRole($role_pro);
        $premium->assignRole($role_premium);
    }
}
