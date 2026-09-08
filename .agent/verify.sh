#!/usr/bin/env bash
set -euo pipefail

npm run build
npm run check:article-sources
port=$(node -e 'const net = require("node:net"); const server = net.createServer(); server.listen(0, "127.0.0.1", () => { process.stdout.write(String(server.address().port)); server.close();});')
PLAYWRIGHT_PORT="$port" npm test
npm audit
