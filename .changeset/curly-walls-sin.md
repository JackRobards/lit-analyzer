---
"@jackolope/lit-analyzer": patch
---

Avoid crashing on component members that were parsed from plain block comments and therefore have no backing AST node. Such members are now skipped when dispatching rule visits instead of dereferencing an undefined node, and are ignored when deriving attributes from external library declarations in the html data collection.
