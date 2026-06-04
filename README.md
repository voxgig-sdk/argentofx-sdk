# Argentofx SDK

Live quotations for the US dollar and other foreign currencies in Argentina

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About ArgentoFX API

ArgentoFX is a small REST API that exposes live foreign-currency quotations for Argentina, with a focus on the various parallel "dollar" rates (blue, oficial, etc.) that circulate alongside the official peso exchange rate. The service is hosted on Render at [fastapiproject-1-eziw.onrender.com](https://fastapiproject-1-eziw.onrender.com) and is catalogued on [Free Public APIs](https://freepublicapis.com/argentofx-api).

What you get from the API:

- Endpoints for individual dollar quotes (for example `GET /blue` for the blue-dollar rate).
- Quotations for other foreign currencies traded in Argentina.
- A root endpoint that serves as the entry point to the service.

Interactive OpenAPI documentation is available at `/docs`. The upstream catalogue notes that CORS is disabled and that the deployment has been intermittently unreachable, so callers should expect to handle errors and downtime.

## Try it

**TypeScript**
```bash
npm install argentofx
```

**Python**
```bash
pip install argentofx-sdk
```

**PHP**
```bash
composer require voxgig/argentofx-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/argentofx-sdk/go
```

**Ruby**
```bash
gem install argentofx-sdk
```

**Lua**
```bash
luarocks install argentofx-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { ArgentofxSDK } from 'argentofx'

const client = new ArgentofxSDK({})

// List all currencys
const currencys = await client.Currency().list()
```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o argentofx-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "argentofx": {
      "command": "/abs/path/to/argentofx-mcp"
    }
  }
}
```

## Entities

The API exposes 3 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **Currency** | Foreign-currency quotations available in Argentina beyond the US dollar. | `/currencies` |
| **DollarQuote** | US dollar quotations against the Argentine peso, including parallel rates such as the blue dollar (for example `GET /blue`). | `/dolares` |
| **GetRoot** | The service root endpoint (`GET /`), typically used as a health or welcome response. | `/` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from argentofx_sdk import ArgentofxSDK

client = ArgentofxSDK({})

# List all currencys
currencys, err = client.Currency(None).list(None, None)

# Load a specific currency
currency, err = client.Currency(None).load(
    {"id": "example_id"}, None
)
```

### PHP

```php
<?php
require_once 'argentofx_sdk.php';

$client = new ArgentofxSDK([]);

// List all currencys
[$currencys, $err] = $client->Currency(null)->list(null, null);

// Load a specific currency
[$currency, $err] = $client->Currency(null)->load(
    ["id" => "example_id"], null
);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/argentofx-sdk/go"

client := sdk.NewArgentofxSDK(map[string]any{})

// List all currencys
currencys, err := client.Currency(nil).List(nil, nil)
```

### Ruby

```ruby
require_relative "Argentofx_sdk"

client = ArgentofxSDK.new({})

# List all currencys
currencys, err = client.Currency(nil).list(nil, nil)

# Load a specific currency
currency, err = client.Currency(nil).load(
  { "id" => "example_id" }, nil
)
```

### Lua

```lua
local sdk = require("argentofx_sdk")

local client = sdk.new({})

-- List all currencys
local currencys, err = client:Currency(nil):list(nil, nil)

-- Load a specific currency
local currency, err = client:Currency(nil):load(
  { id = "example_id" }, nil
)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = ArgentofxSDK.test()
const result = await client.Currency().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = ArgentofxSDK.test(None, None)
result, err = client.Currency(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = ArgentofxSDK::test(null, null);
[$result, $err] = $client->Currency(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Currency(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = ArgentofxSDK.test(nil, nil)
result, err = client.Currency(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Currency(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the ArgentoFX API

- Upstream: [https://fastapiproject-1-eziw.onrender.com](https://fastapiproject-1-eziw.onrender.com)
- API docs: [https://fastapiproject-1-eziw.onrender.com/docs](https://fastapiproject-1-eziw.onrender.com/docs)

---

Generated from the ArgentoFX API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
