<?php

namespace App\Enums;

use BenSampo\Enum\Enum;

final class VideoType extends Enum
{
    const normal = 0;
    const featured = 1;
    const promotion = 2;
    const recommended = 3;
    const pro = 4;
}