const fs = require('node:fs')
const path = require('node:path')
const assert = require('node:assert/strict')
const ts = require(path.resolve(__dirname, '../../DUKA-BACKEND/node_modules/typescript'))

const workspace = path.resolve(__dirname, '../..')
const fixture = JSON.parse(fs.readFileSync(path.join(__dirname, '../builder/fixtures/published-app-contract.json'), 'utf8'))

function readStringArray(file, exportName) {
  const filePath = path.join(workspace, file)
  const source = ts.createSourceFile(filePath, fs.readFileSync(filePath, 'utf8'), ts.ScriptTarget.Latest, true)
  let result
  const visit = node => {
    if (ts.isVariableDeclaration(node) && node.name.getText(source) === exportName) {
      let value = node.initializer
      while (value && (ts.isAsExpression(value) || ts.isTypeAssertionExpression(value) || ts.isSatisfiesExpression(value))) value = value.expression
      if (!value || !ts.isArrayLiteralExpression(value)) throw new Error(`${file}:${exportName} is not a literal array`)
      result = value.elements.map(element => {
        if (!ts.isStringLiteral(element)) throw new Error(`${file}:${exportName} contains a non-string value`)
        return element.text
      })
    }
    ts.forEachChild(node, visit)
  }
  visit(source)
  if (!result) throw new Error(`Missing ${exportName} in ${file}`)
  return result
}

const contracts = [
  {
    repo: 'DUKA-BACKEND',
    file: 'DUKA-BACKEND/src/shared/compatibility/runtime-contract.ts',
    names: { screenArchetypes: 'SUPPORTED_SCREEN_ARCHETYPES', componentRoles: 'SUPPORTED_COMPONENT_ROLES', dataBindings: 'SUPPORTED_DATA_BINDINGS' },
  },
  {
    repo: 'DUKA-MERCHANT',
    file: 'DUKA-MERCHANT/dukaDesk/src/services/screenArchetypes.js',
    names: { screenArchetypes: 'SCREEN_ARCHETYPES', componentRoles: 'COMPONENT_ROLES', dataBindings: 'DATA_BINDINGS' },
  },
  {
    repo: 'DukaDesk',
    file: 'DukaDesk/src/runtime/archetypes.ts',
    names: { screenArchetypes: 'SCREEN_ARCHETYPES', componentRoles: 'COMPONENT_ROLES', dataBindings: 'DATA_BINDINGS' },
  },
]

for (const contract of contracts) {
  for (const [key, exportName] of Object.entries(contract.names)) {
    assert.deepEqual(readStringArray(contract.file, exportName), fixture[key], `${contract.repo} ${key} drifted from the shared contract fixture`)
  }
}

console.log('Published-app archetypes, roles, and bindings match across backend, merchant builder, and mobile.')
