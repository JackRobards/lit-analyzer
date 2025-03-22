---
"lit-analyzer-plugin": patch
"@jackolope/ts-lit-plugin": patch
"@jackolope/lit-analyzer": patch
---

fix: Turn no-nullable-attribute-binding off by default as it is no longer relevant in newer Lit versions. It can still be turned on via configuration if so desired.
