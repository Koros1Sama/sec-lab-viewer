// Syncs new GPT-image outputs from QPics/ into qimg/ + data/qpics.js manifest.
// Usage: node add_qpics.js   (run from TOC_Slides_Viewer/)
// Logic: any file in QPics/ whose content-hash isn't yet in qimg/ is considered NEW.
//        New files are sorted by mtime (download order = chat order) and mapped
//        to the still-missing prompt IDs in img_prompts.js chat order.
//        Existing mappings are NEVER touched.
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const ROOT = __dirname;
const SRC = path.join(ROOT, "QPics");
const DST = path.join(ROOT, "qimg");
const MANIFEST = path.join(ROOT, "data", "qpics.js");
const PROMPTS = path.join(ROOT, "data", "img_prompts.js");

// current manifest
const manSrc = fs.readFileSync(MANIFEST, "utf8");
let manifest;
try {
	manifest = JSON.parse(
		manSrc.replace("window.TOC_QPICS = ", "").replace(/;\s*$/, ""),
	);
	if (!manifest || typeof manifest !== "object" || Array.isArray(manifest))
		throw new Error("manifest is not an object");
} catch (e) {
	console.error(
		"ERROR: data/qpics.js is corrupted and could not be parsed:",
		e.message,
	);
	process.exit(1);
}

// existing destination content hashes
const dstHashes = new Set(
	fs.readdirSync(DST).map((f) =>
		crypto
			.createHash("md5")
			.update(fs.readFileSync(path.join(DST, f)))
			.digest("hex"),
	),
);

// all prompt ids in chat order
globalThis.w = { window: {} };
(0, eval)(fs.readFileSync(PROMPTS, "utf8").replace(/window\./g, "w.window."));
const allIds = w.window.TOC_IMG_PROMPTS.map((p) => p.id);
const missing = allIds.filter((id) => !manifest[id]);

// new files (in QPics but not already imported by content)
const news = fs
	.readdirSync(SRC)
	.filter((f) => f.toLowerCase().endsWith(".png"))
	.map((f) => ({
		f,
		mtime: fs.statSync(path.join(SRC, f)).mtimeMs,
		hash: crypto
			.createHash("md5")
			.update(fs.readFileSync(path.join(SRC, f)))
			.digest("hex"),
	}))
	.filter((x) => !dstHashes.has(x.hash))
	.sort((a, b) => a.mtime - b.mtime);

if (!news.length) {
	console.log(
		"No new images found in QPics/. All imported:",
		Object.keys(manifest).length,
		"/",
		allIds.length,
	);
	process.exit(0);
}
if (news.length > missing.length) {
	console.error(
		`ERROR: ${news.length} new files but only ${missing.length} missing IDs. Aborting — check QPics for unrelated files.`,
	);
	news.forEach((n) =>
		console.error("  new:", n.f, new Date(n.mtime).toISOString()),
	);
	process.exit(1);
}

console.log(
	`New: ${news.length} | Missing IDs: ${missing.length} → mapping in order:`,
);
news.forEach((n, i) => {
	const id = missing[i];
	const [m, num] = id.split("#");
	const dst = `qimg/${m}-q${String(num).padStart(2, "0")}.png`;
	fs.copyFileSync(path.join(SRC, n.f), path.join(ROOT, dst));
	manifest[id] = dst;
	console.log(
		`  ${new Date(n.mtime).toISOString().slice(11, 19)} ${id}  <-  ${n.f.slice(5, 25)}  ->  ${dst}`,
	);
});

fs.writeFileSync(
	MANIFEST,
	"window.TOC_QPICS = " + JSON.stringify(manifest, null, 1) + ";\n",
	"utf8",
);
console.log(
	`\nManifest updated: ${Object.keys(manifest).length}/${allIds.length} images linked.`,
);
console.log(
	missing.length - news.length === 0
		? "COMPLETE — all prompts have images."
		: `Still missing ${missing.length - news.length}: ${missing.slice(news.length).join(", ")}`,
);
