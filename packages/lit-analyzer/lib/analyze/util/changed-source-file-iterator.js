"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changedSourceFileIterator = changedSourceFileIterator;
/**
 * Yields source files that have changed since last time this function was called.
 */
function changedSourceFileIterator() {
    const sourceFileCache = new WeakSet();
    const iterator = function* (sourceFiles) {
        for (const sourceFile of sourceFiles) {
            if (!sourceFileCache.has(sourceFile)) {
                yield sourceFile;
                sourceFileCache.add(sourceFile);
            }
        }
    };
    return Object.assign(iterator, {
        invalidate(sourceFile) {
            sourceFileCache.delete(sourceFile);
        }
    });
}
//# sourceMappingURL=changed-source-file-iterator.js.map