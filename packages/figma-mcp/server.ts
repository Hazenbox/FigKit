#!/usr/bin/env node
// packages/figma-mcp/server.ts
import 'dotenv/config';
import { pullTokens } from './scripts/pull-tokens.js';
import { diffTokens } from './scripts/diff-tokens.js';

interface JSONRPCRequest {
  jsonrpc: '2.0';
  id: string | number | null;
  method: string;
  params?: any;
}

interface JSONRPCResponse {
  jsonrpc: '2.0';
  id: string | number | null;
  result?: any;
  error?: {
    code: number;
    message: string;
    data?: any;
  };
}

async function handleRequest(request: JSONRPCRequest): Promise<JSONRPCResponse> {
  const { id, method, params = {} } = request;

  try {
    let result: any;

    switch (method) {
      case 'pullTokens': {
        result = await pullTokens(params);
        break;
      }
      case 'diffTokens': {
        result = await diffTokens();
        break;
      }
      default:
        throw new Error(`Unknown method: ${method}`);
    }

    return {
      jsonrpc: '2.0',
      id,
      result,
    };
  } catch (error: any) {
    return {
      jsonrpc: '2.0',
      id,
      error: {
        code: -32000,
        message: error.message || 'Internal error',
        data: error.stack,
      },
    };
  }
}

// MCP Server implementation
async function main() {
  const stdin = process.stdin;
  const stdout = process.stdout;

  stdin.setEncoding('utf8');
  
  let buffer = '';

  stdin.on('data', async (chunk: string) => {
    buffer += chunk;
    const lines = buffer.split('\n');
    buffer = lines.pop() || '';

    for (const line of lines) {
      if (!line.trim()) continue;

      try {
        const request: JSONRPCRequest = JSON.parse(line);
        const response = await handleRequest(request);
        stdout.write(JSON.stringify(response) + '\n');
      } catch (error: any) {
        const errorResponse: JSONRPCResponse = {
          jsonrpc: '2.0',
          id: null,
          error: {
            code: -32700,
            message: 'Parse error',
            data: error.message,
          },
        };
        stdout.write(JSON.stringify(errorResponse) + '\n');
      }
    }
  });

  stdin.on('end', () => {
    process.exit(0);
  });

  // Handle initialization (MCP protocol)
  process.on('SIGINT', () => {
    process.exit(0);
  });
}

main().catch((error) => {
  console.error('MCP server error:', error);
  process.exit(1);
});

