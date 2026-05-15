<?php
declare(strict_types=1);

// Argentofx SDK utility: result_body

class ArgentofxResultBody
{
    public static function call(ArgentofxContext $ctx): ?ArgentofxResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
