/* eslint-disable no-console */

// Modified from this script originally: https://github.com/backstage/backstage/blob/master/.github/workflows/sync_renovate-changesets.yml
// You can find discussion on automating this process here: https://github.com/changesets/changesets/issues/647
import fs from "node:fs";
import { promisify } from "node:util";
import { exec } from "node:child_process";
import process from "node:process";

const getExecOutput = promisify(exec);

// Replace this with the number of commits to look back for changes. Either since the last release, or dependency changeset was generated.
const commitCount = "10";

// Parses package.json files and returns the package names
async function getPackagesNames(files) {
	const names = [];
	for (const file of files) {
		const data = JSON.parse(await fs.readFileSync(file, { encoding: "utf8" }));
		names.push(data.name);
	}
	return names;
}

async function createChangeset(fileName, packageBumps, packages) {
	let message = "Updated dependencies:\n";
	for (const [pkg, bump] of packageBumps) {
		message = message + `Updated dependency \`${pkg}\` to \`${bump}\`.\n`;
	}

	const pkgs = packages.map(pkg => `'${pkg}': patch`).join("\n");
	const body = `---\n${pkgs}\n---\n\n${message.trim()}\n`;
	await fs.writeFileSync(fileName, body);
}

async function getBumps(files) {
	const bumps = new Map();
	for (const file of files) {
		const { stdout: changes } = await getExecOutput(`git diff HEAD~${commitCount} ${file}`);

		for (const change of changes.split("\n")) {
			if (!change.startsWith("+") || change.startsWith("++") || change.includes('"version"')) {
				continue;
			}
			const match = change.match(/"(.*?)"/g);

			// Not a version change
			if (!match || match.length !== 2) continue;

			bumps.set(match[0]?.replace(/"/g, ""), match[1]?.replace(/"/g, ""));
		}
	}
	return bumps;
}

const diffOutput = await getExecOutput(`git diff --name-only HEAD~${commitCount}`);
const diffFiles = diffOutput.stdout.split("\n");

const files = diffFiles
	.filter(file => file !== "package.json") // skip root package.json
	.filter(file => file.includes("package.json"));
const packageNames = await getPackagesNames(files);

if (!packageNames.length) {
	console.log("No package.json changes to published packages, skipping");
	process.exit(0);
}
const { stdout: shortHash } = await getExecOutput("git rev-parse --short HEAD");

for (const [i, file] of files.entries()) {
	// zzz so that the dependency changes will always come last
	const fileName = `.changeset/zzz_dependabot-${shortHash.trim()}-${packageNames[i].replace("/", "-")}.md`;

	const packageBumps = await getBumps([file]);
	console.log(`Package updates for ${file}:\n`, packageBumps);
	await createChangeset(fileName, packageBumps, [packageNames[i]]);
}
