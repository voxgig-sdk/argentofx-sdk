<?php
declare(strict_types=1);

// Argentofx SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class ArgentofxMakeContext
{
    public static function call(array $ctxmap, ?ArgentofxContext $basectx): ArgentofxContext
    {
        return new ArgentofxContext($ctxmap, $basectx);
    }
}
