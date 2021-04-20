#!/usr/bin/env node

import path from 'path'
import { RouterCodeGenerator } from '../router-code-generator'

const sourcePath = path.resolve(process.cwd(), '../../src')
const nodeModulesPath = path.resolve(process.cwd(), '..')

new RouterCodeGenerator(
  {
    paths: { sourcePath, nodeModulesPath },
  } as any,
  { watch: false }
).start()
