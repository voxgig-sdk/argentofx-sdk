<?php
declare(strict_types=1);

// DollarQuote entity test

require_once __DIR__ . '/../argentofx_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class DollarQuoteEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = ArgentofxSDK::test(null, null);
        $ent = $testsdk->DollarQuote(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = dollar_quote_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["list", "load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "dollar_quote." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set ARGENTOFX_TEST_DOLLAR_QUOTE_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $dollar_quote_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.dollar_quote")));
        $dollar_quote_ref01_data = null;
        if (count($dollar_quote_ref01_data_raw) > 0) {
            $dollar_quote_ref01_data = Helpers::to_map($dollar_quote_ref01_data_raw[0][1]);
        }

        // LIST
        $dollar_quote_ref01_ent = $client->DollarQuote(null);
        $dollar_quote_ref01_match = [];

        [$dollar_quote_ref01_list_result, $err] = $dollar_quote_ref01_ent->list($dollar_quote_ref01_match, null);
        $this->assertNull($err);
        $this->assertIsArray($dollar_quote_ref01_list_result);

        // LOAD
        $dollar_quote_ref01_match_dt0 = [];
        [$dollar_quote_ref01_data_dt0_loaded, $err] = $dollar_quote_ref01_ent->load($dollar_quote_ref01_match_dt0, null);
        $this->assertNull($err);
        $this->assertNotNull($dollar_quote_ref01_data_dt0_loaded);

    }
}

function dollar_quote_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/dollar_quote/DollarQuoteTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = ArgentofxSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["dollar_quote01", "dollar_quote02", "dollar_quote03", "dolare01", "dolare02", "dolare03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("ARGENTOFX_TEST_DOLLAR_QUOTE_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "ARGENTOFX_TEST_DOLLAR_QUOTE_ENTID" => $idmap,
        "ARGENTOFX_TEST_LIVE" => "FALSE",
        "ARGENTOFX_TEST_EXPLAIN" => "FALSE",
        "ARGENTOFX_APIKEY" => "NONE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["ARGENTOFX_TEST_DOLLAR_QUOTE_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["ARGENTOFX_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
                "apikey" => $env["ARGENTOFX_APIKEY"],
            ],
            $extra ?? [],
        ]);
        $client = new ArgentofxSDK(Helpers::to_map($merged_opts));
    }

    $live = $env["ARGENTOFX_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["ARGENTOFX_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
