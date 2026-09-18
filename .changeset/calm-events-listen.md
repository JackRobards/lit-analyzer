---
"@jackolope/lit-analyzer": patch
---

Recognize optional callable event handlers, callable aliases and intersections, and listener objects with a required callable `handleEvent`. Preserve callable generic constraints and instantiated listener members, including projected values from callable alias and interface directives. Reject unions containing concrete non-listener alternatives and standalone nullish values. Nullable or optional `handleEvent` members are not callable listeners.
