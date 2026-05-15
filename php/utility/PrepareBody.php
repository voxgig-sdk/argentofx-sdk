<?php
declare(strict_types=1);

// Argentofx SDK utility: prepare_body

class ArgentofxPrepareBody
{
    public static function call(ArgentofxContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
