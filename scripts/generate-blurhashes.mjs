import { readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { encode } from "blurhash";

const projectRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const assetsRoot = path.join(projectRoot, "src", "assets");
const outputPath = path.join(projectRoot, "src", "utils", "blurhashes.js");
const rasterExtensions = new Set([".gif", ".jpeg", ".jpg", ".png", ".webp"]);

async function getRasterFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await getRasterFiles(entryPath)));
      continue;
    }

    if (rasterExtensions.has(path.extname(entry.name).toLowerCase())) {
      files.push(entryPath);
    }
  }

  return files.sort();
}

const files = await getRasterFiles(assetsRoot);
const hashes = await Promise.all(
  files.map(async (filePath) => {
    const { data, info } = await sharp(filePath)
      .resize(32, 32, { fit: "fill" })
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    return {
      fileName: path.basename(filePath),
      hash: encode(data, info.width, info.height, 4, 3),
    };
  }),
);

const duplicateNames = hashes
  .map(({ fileName }) => fileName)
  .filter((fileName, index, fileNames) => fileNames.indexOf(fileName) !== index);

if (duplicateNames.length > 0) {
  throw new Error(`Duplicate asset filenames: ${duplicateNames.join(", ")}`);
}

const hashEntries = hashes
  .map(({ fileName, hash }) => `  ${JSON.stringify(fileName)}: ${JSON.stringify(hash)},`)
  .join("\n");

const output = `const blurHashes = {
${hashEntries}
};

const sortedAssetNames = Object.keys(blurHashes).sort(
  (left, right) => right.length - left.length,
);

export function getBlurHash(src) {
  if (!src) return null;

  const fileName = decodeURIComponent(
    String(src).split(/[?#]/, 1)[0].split("/").pop() || "",
  );
  const exactHash = blurHashes[fileName];

  if (exactHash) return exactHash;

  const matchingAssetName = sortedAssetNames.find((assetName) => {
    const extension = pathExtension(assetName);
    const stem = assetName.slice(0, -extension.length);
    return fileName.startsWith(stem + "-") && fileName.endsWith(extension);
  });

  return matchingAssetName ? blurHashes[matchingAssetName] : null;
}

function pathExtension(fileName) {
  return fileName.slice(fileName.lastIndexOf("."));
}

export default blurHashes;
`;

await writeFile(outputPath, output, "utf8");
console.log(`Generated ${hashes.length} BlurHash values in ${path.relative(projectRoot, outputPath)}`);