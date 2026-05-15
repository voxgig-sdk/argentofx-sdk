<?php
declare(strict_types=1);

// Argentofx SDK base feature

class ArgentofxBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(ArgentofxContext $ctx, array $options): void {}
    public function PostConstruct(ArgentofxContext $ctx): void {}
    public function PostConstructEntity(ArgentofxContext $ctx): void {}
    public function SetData(ArgentofxContext $ctx): void {}
    public function GetData(ArgentofxContext $ctx): void {}
    public function GetMatch(ArgentofxContext $ctx): void {}
    public function SetMatch(ArgentofxContext $ctx): void {}
    public function PrePoint(ArgentofxContext $ctx): void {}
    public function PreSpec(ArgentofxContext $ctx): void {}
    public function PreRequest(ArgentofxContext $ctx): void {}
    public function PreResponse(ArgentofxContext $ctx): void {}
    public function PreResult(ArgentofxContext $ctx): void {}
    public function PreDone(ArgentofxContext $ctx): void {}
    public function PreUnexpected(ArgentofxContext $ctx): void {}
}
