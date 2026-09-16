import { mkdir, readdir, rm, writeFile } from "node:fs/promises";
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
const optimizedRoot = path.join(projectRoot, "public", "optimized");
const optimizedManifestPath = path.join(
  projectRoot,
  "src",
  "utils",
  "optimizedImages.js",
);
const rasterExtensions = new Set([".gif", ".jpeg", ".jpg", ".png", ".webp"]);
const optimizedWidths = [320, 640, 960, 1280, 1600, 1920];

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

await rm(optimizedRoot, { recursive: true, force: true });
await mkdir(optimizedRoot, { recursive: true });

function getSafeBaseName(fileName) {
  const extension = path.extname(fileName).slice(1);

  return `${path
    .basename(fileName, path.extname(fileName))
    .replace(/[^a-zA-Z0-9_-]+/g, "-")
    .replace(/-{2,}/g, "-")
    .replace(/^-|-$/g, "")}-${extension}`;
}

async function generateOptimizedAsset(filePath) {
  const fileName = path.basename(filePath);
  const metadata = await sharp(filePath).metadata();
  const sourceWidth = metadata.width;

  if (!sourceWidth) return null;

  const widths = optimizedWidths.filter((width) => width < sourceWidth);
  widths.push(sourceWidth);

  const uniqueWidths = [...new Set(widths)].sort((left, right) => left - right);
  const safeBaseName = getSafeBaseName(fileName);
  const variants = { avif: [], webp: [] };

  for (const width of uniqueWidths) {
    const avifName = `${safeBaseName}-${width}.avif`;
    const webpName = `${safeBaseName}-${width}.webp`;

    await Promise.all([
      sharp(filePath)
        .resize({ width, withoutEnlargement: true })
        .avif({ quality: 70, effort: 4 })
        .toFile(path.join(optimizedRoot, avifName)),
      sharp(filePath)
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: 85, effort: 4 })
        .toFile(path.join(optimizedRoot, webpName)),
    ]);

    variants.avif.push({
      src: `/optimized/${avifName}`,
      width,
    });
    variants.webp.push({
      src: `/optimized/${webpName}`,
      width,
    });
  }

  return { fileName, variants };
}

const optimizedAssets = [];
const generationBatchSize = 4;
for (let index = 0; index < files.length; index += generationBatchSize) {
  const batch = files.slice(index, index + generationBatchSize);
  optimizedAssets.push(
    ...(await Promise.all(batch.map(generateOptimizedAsset))),
  );
}

const duplicateNames = hashes
  .map(({ fileName }) => fileName)
  .filter(
    (fileName, index, fileNames) => fileNames.indexOf(fileName) !== index,
  );

if (duplicateNames.length > 0) {
  throw new Error(`Duplicate asset filenames: ${duplicateNames.join(", ")}`);
}

const hashEntries = hashes
  .map(
    ({ fileName, hash }) =>
      `  ${JSON.stringify(fileName)}: ${JSON.stringify(hash)},`,
  )
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
const optimizedEntries = optimizedAssets
  .filter(Boolean)
  .sort((left, right) => left.fileName.localeCompare(right.fileName))
  .map(
    ({ fileName, variants }) =>
      `  ${JSON.stringify(fileName)}: ${JSON.stringify(variants)},`,
  )
  .join("\n");

const optimizedOutput = `const optimizedImages = {
${optimizedEntries}
};

const sortedAssetNames = Object.keys(optimizedImages).sort(
  (left, right) => right.length - left.length,
);

export function getOptimizedImageSources(src) {
  if (!src) return null;

  const fileName = decodeURIComponent(
    String(src).split(/[?#]/, 1)[0].split("/").pop() || "",
  );
  const exactSources = optimizedImages[fileName];

  if (exactSources) return exactSources;

  const matchingAssetName = sortedAssetNames.find((assetName) => {
    const extension = pathExtension(assetName);
    const stem = assetName.slice(0, -extension.length);
    return fileName.startsWith(stem + "-") && fileName.endsWith(extension);
  });

  return matchingAssetName ? optimizedImages[matchingAssetName] : null;
}

function pathExtension(fileName) {
  return fileName.slice(fileName.lastIndexOf("."));
}

export default optimizedImages;
`;

await writeFile(optimizedManifestPath, optimizedOutput, "utf8");
console.log(
  `Generated ${hashes.length} BlurHash values in ${path.relative(projectRoot, outputPath)}`,
);
console.log(
  `Generated optimized variants for ${optimizedAssets.filter(Boolean).length} raster assets in ${path.relative(projectRoot, optimizedRoot)}`,
);
