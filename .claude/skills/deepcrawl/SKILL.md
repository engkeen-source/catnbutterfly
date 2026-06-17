---
name: deepcrawl
description: |
  Crawl a webpage or website using the private deepcrawl.autolabkit.com Cloudflare Worker. Use this skill when the user wants to scrape or crawl a URL using the autolabkit deepcrawl service, says "deepcrawl", "crawl this page", "scrape with deepcrawl", or needs content extracted via the JWT-authenticated crawler. Handles JWT generation, API calls, and result formatting.
allowed-tools:
  - Bash(curl:*)
  - Bash(openssl:*)
  - Bash(python3:*)
  - Bash(node:*)
  - Bash(jq:*)
  - Bash(echo:*)
  - Bash(printf:*)
  - Bash(base64:*)
  - Bash(date:*)
---

# deepcrawl

Crawl webpages via the private `deepcrawl.autolabkit.com` Cloudflare Worker with HS256 JWT authentication.

## Setup

The JWT secret lives in the project `.env` as `DEEPCRAWL_JWT_SECRET`. Load it before making API calls:

```bash
export DEEPCRAWL_JWT_SECRET=$(grep DEEPCRAWL_JWT_SECRET /Users/engkeentan/Development/catnbutterfly/.env | cut -d= -f2-)
```

## Generating a JWT token

The service uses HS256 with the raw secret string (not base64-decoded).

```bash
TOKEN=$(python3 - <<'EOF'
import base64, hmac, hashlib, json, time, os

secret = os.environ["DEEPCRAWL_JWT_SECRET"]

def b64url(d):
    if isinstance(d, str): d = d.encode()
    return base64.urlsafe_b64encode(d).rstrip(b"=").decode()

now = int(time.time())
h = b64url(json.dumps({"alg":"HS256","typ":"JWT"}, separators=(',',':')))
p = b64url(json.dumps({"iat": now, "exp": now + 3600}, separators=(',',':')))
s = b64url(hmac.new(secret.encode(), f"{h}.{p}".encode(), hashlib.sha256).digest())
print(f"{h}.{p}.{s}")
EOF
)
```

## Crawling a single page

```bash
curl -s -X POST "https://deepcrawl.autolabkit.com/crawl" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com", "depth": 0}' | jq .
```

## Crawling a site (multi-page, following links)

```bash
curl -s -X POST "https://deepcrawl.autolabkit.com/crawl" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://example.com",
    "depth": 2,
    "limit": 50,
    "includePaths": ["/blog"],
    "excludePaths": ["/admin", "/api"]
  }' | jq .
```

## Checking crawl status (async jobs)

If the API returns a job ID instead of immediate results:

```bash
JOB_ID="<id-from-crawl-response>"
curl -s "https://deepcrawl.autolabkit.com/crawl/$JOB_ID" \
  -H "Authorization: Bearer $TOKEN" | jq .
```

## Full working example

```bash
# 1. Load secret
export DEEPCRAWL_JWT_SECRET=$(grep DEEPCRAWL_JWT_SECRET /Users/engkeentan/Development/catnbutterfly/.env | cut -d= -f2-)

# 2. Generate token
TOKEN=$(python3 - <<'EOF'
import base64, hmac, hashlib, json, time, os
secret = os.environ["DEEPCRAWL_JWT_SECRET"]
def b64url(d):
    if isinstance(d, str): d = d.encode()
    return base64.urlsafe_b64encode(d).rstrip(b"=").decode()
now = int(time.time())
h = b64url(json.dumps({"alg":"HS256","typ":"JWT"}, separators=(',',':')))
p = b64url(json.dumps({"iat": now, "exp": now + 3600}, separators=(',',':')))
s = b64url(hmac.new(secret.encode(), f"{h}.{p}".encode(), hashlib.sha256).digest())
print(f"{h}.{p}.{s}")
EOF
)

# 3. Crawl
curl -s -X POST "https://deepcrawl.autolabkit.com/crawl" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"url": "https://thecatnbutterfly.com", "depth": 1, "limit": 20}' | jq .
```

## Request options

| Field          | Type     | Description                                     |
| -------------- | -------- | ----------------------------------------------- |
| `url`          | string   | Target URL to crawl (required)                  |
| `depth`        | number   | Link-follow depth (0 = single page only)        |
| `limit`        | number   | Max pages to return                             |
| `includePaths` | string[] | Only follow URLs matching these path prefixes   |
| `excludePaths` | string[] | Skip URLs matching these path prefixes          |
| `javascript`   | boolean  | Enable JS rendering for SPAs (if supported)     |

## Troubleshooting

- **401 Unauthorized** — JWT expired or wrong secret. Regenerate the token.
- **403 Forbidden** — Secret mismatch. Check `DEEPCRAWL_JWT_SECRET` in `.env`.
- **DNS/connection error** — Worker may be down; check Cloudflare dashboard.
- **Empty body / no content** — Try adding `"javascript": true` for JS-rendered pages.
