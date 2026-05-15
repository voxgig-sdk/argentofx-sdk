<?php
declare(strict_types=1);

// Argentofx SDK utility: feature_hook

class ArgentofxFeatureHook
{
    public static function call(ArgentofxContext $ctx, string $name): void
    {
        if (!$ctx->client) {
            return;
        }
        $features = $ctx->client->features ?? null;
        if (!$features) {
            return;
        }
        foreach ($features as $f) {
            if (method_exists($f, $name)) {
                $f->$name($ctx);
            }
        }
    }
}
