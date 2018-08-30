<?php

namespace App\Enums;

use BenSampo\Enum\Enum;

final class VideoStatus extends Enum
{
    const draft = 0;
    const active = 1;
    const published = 2;
}
