<?php
declare(strict_types=1);

// Argentofx SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class ArgentofxFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new ArgentofxBaseFeature();
            case "test":
                return new ArgentofxTestFeature();
            default:
                return new ArgentofxBaseFeature();
        }
    }
}
