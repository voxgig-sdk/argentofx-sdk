<?php
declare(strict_types=1);

// Argentofx SDK utility: result_headers

class ArgentofxResultHeaders
{
    public static function call(ArgentofxContext $ctx): ?ArgentofxResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
