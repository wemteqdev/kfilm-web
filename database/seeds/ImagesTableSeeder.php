<?php

use Illuminate\Database\Seeder;
use App\Models\Image;
use League\Flysystem\Filesystem;
use Illuminate\Http\File;

class ImagesTableSeeder extends Seeder
{
    public function run()
    {   
      foreach (Storage::disk('local')->files('files/video') as $filename) {

      		$image = Storage::disk('local')->path($filename);
      		$size = getimagesize($image);

					$path = Storage::disk('public')->putFile(
					    'images', new File($image)
					);

					$url = Storage::disk('public')->url($path);
					$path_parts = pathinfo($filename);

					Image::create([
						'name' => $path_parts['filename'],
						'uri' => $url, 
						'width' => $size[0], 
						'height' => $size[1],
						'alt' => $path_parts['filename'],
					]);
      }
    }
}