import type { Node } from "typescript";
import { arrayDefined } from "../../../util/array-util";
import type { AnalyzerVisitContext } from "../../analyzer-visit-context";
import type { VisitFeatureEmitMap } from "./visit-features";
import { visitFeaturesWithVisitMaps } from "./visit-features";

/**
 * Uses flavors to find global features
 * @param node
 * @param context
 * @param emitMap
 */
export function visitGlobalFeatures<ReturnType>(node: Node, context: AnalyzerVisitContext, emitMap: Partial<VisitFeatureEmitMap>): void {
	const visitMaps = arrayDefined(context.flavors.map(flavor => flavor.discoverGlobalFeatures));

	visitFeaturesWithVisitMaps(node, context, visitMaps, emitMap);
}
