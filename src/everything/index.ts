#!/usr/bin/env node

import { HttpServerTransport } from "@modelcontextprotocol/sdk/server/http.js";
import { createServer } from "./everything.js";

async function main() {
  const port = process.env.PORT || 3000; // Railway usará su propio PORT

  const transport = new HttpServerTransport({
    port: Number(port),
  });

  const { server, cleanup } = createServer();

  await server.connect(transport);

  console.log(`✅ MCP Server running on port ${port}`);

  // Cleanup on exit
  process.on("SIGINT", async () => {
    await cleanup();
    await server.close();
    process.exit(0);
  });
}

main().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});
