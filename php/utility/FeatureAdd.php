<?php
declare(strict_types=1);

// Argentofx SDK utility: feature_add

class ArgentofxFeatureAdd
{
    public static function call(ArgentofxContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
