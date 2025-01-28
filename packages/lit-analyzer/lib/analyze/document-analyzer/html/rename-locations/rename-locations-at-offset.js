"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renameLocationsAtOffset = renameLocationsAtOffset;
const html_node_types_js_1 = require("../../../types/html-node/html-node-types.js");
const rename_locations_for_tag_name_js_1 = require("./rename-locations-for-tag-name.js");
function renameLocationsAtOffset(document, offset, context) {
    const hit = document.htmlNodeOrAttrAtOffset(offset);
    if (hit == null)
        return [];
    if ((0, html_node_types_js_1.isHTMLNode)(hit)) {
        return (0, rename_locations_for_tag_name_js_1.renameLocationsForTagName)(hit.tagName, context);
    }
    return [];
}
//# sourceMappingURL=rename-locations-at-offset.js.map