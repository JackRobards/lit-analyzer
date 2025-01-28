"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tsModule = void 0;
exports.setTypescriptModule = setTypescriptModule;
const ts_simple_type_1 = require("ts-simple-type");
const typescript_1 = __importDefault(require("typescript"));
exports.tsModule = { ts: typescript_1.default };
function setTypescriptModule(newModule) {
    exports.tsModule.ts = newModule;
    (0, ts_simple_type_1.setTypescriptModule)(newModule);
}
//# sourceMappingURL=ts-module.js.map