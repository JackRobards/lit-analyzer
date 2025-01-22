#!/usr/bin/env node

import { cli } from "./lib/cli/cli.mjs";

// eslint-disable-next-line no-console
cli().catch(console.log);
