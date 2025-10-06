#!/usr/bin/env node

import { execSync } from "child_process";
import { readdirSync, statSync, copyFileSync, mkdirSync } from "fs";
import { join, extname, basename, dirname } from "path";

// Configuration
const QUALITY_SETTINGS = {
  videoCodec: "libx264",
  audioCodec: "aac",
  videoBitrate: "2M",
  audioBitrate: "128k",
  preset: "medium",
  crf: "23",
  pixelFormat: "yuv420p",
  movflags: "faststart",
};

// Check if FFmpeg is installed
function checkFFmpeg() {
  try {
    execSync("ffmpeg -version", { stdio: "ignore" });
    console.log("✅ FFmpeg is installed");
    return true;
  } catch (error) {
    console.error("❌ FFmpeg is not installed. Please install it first:");
    console.error("   macOS: brew install ffmpeg");
    console.error("   Ubuntu/Debian: sudo apt install ffmpeg");
    console.error("   Windows: Download from https://ffmpeg.org/download.html");
    return false;
  }
}

// Get file creation time
function getFileCreationTime(filePath) {
  const stats = statSync(filePath);
  return stats.birthtime || stats.mtime; // Use birthtime if available, fallback to mtime
}

// Convert MOV to MP4
function convertMovToMp4(inputPath, outputPath) {
  console.log(
    `🔄 Converting: ${basename(inputPath)} → ${basename(outputPath)}`
  );

  const ffmpegCommand = [
    "ffmpeg",
    "-i",
    `"${inputPath}"`,
    "-c:v",
    QUALITY_SETTINGS.videoCodec,
    "-c:a",
    QUALITY_SETTINGS.audioCodec,
    "-b:v",
    QUALITY_SETTINGS.videoBitrate,
    "-b:a",
    QUALITY_SETTINGS.audioBitrate,
    "-preset",
    QUALITY_SETTINGS.preset,
    "-crf",
    QUALITY_SETTINGS.crf,
    "-pix_fmt",
    QUALITY_SETTINGS.pixelFormat,
    "-movflags",
    QUALITY_SETTINGS.movflags,
    "-y",
    `"${outputPath}"`,
  ].join(" ");

  try {
    execSync(ffmpegCommand, { stdio: "pipe" });
    console.log(`✅ Converted: ${basename(outputPath)}`);
    return { success: true };
  } catch (error) {
    console.error(
      `❌ Failed to convert ${basename(inputPath)}:`,
      error.message
    );
    return { success: false, error: error.message };
  }
}

// Copy file to destination
function copyFile(inputPath, outputPath) {
  try {
    copyFileSync(inputPath, outputPath);
    console.log(`📁 Copied: ${basename(inputPath)} → ${basename(outputPath)}`);
    return { success: true };
  } catch (error) {
    console.error(`❌ Failed to copy ${basename(inputPath)}:`, error.message);
    return { success: false, error: error.message };
  }
}

// Process files from input folder
function processFiles(inputFolder, raceId, inputPrefix) {
  console.log(`\n🔍 Processing files from: ${inputFolder}`);
  console.log(`📁 Output directory: public/races/${raceId}/`);
  console.log(`🏷️  File prefix: ${inputPrefix}`);

  // Create output directory
  const outputDir = join("public", "races", raceId);
  try {
    mkdirSync(outputDir, { recursive: true });
    console.log(`📁 Created directory: ${outputDir}`);
  } catch (error) {
    console.error(`❌ Failed to create directory ${outputDir}:`, error.message);
    return;
  }

  // Get all files from input folder
  let files;
  try {
    files = readdirSync(inputFolder);
  } catch (error) {
    console.error(`❌ Failed to read directory ${inputFolder}:`, error.message);
    return;
  }

  // Filter for supported file types
  const supportedExtensions = [
    ".jpg",
    ".jpeg",
    ".png",
    ".gif",
    ".webp",
    ".mov",
    ".mp4",
    ".avi",
  ];
  const mediaFiles = files
    .filter((file) => {
      const ext = extname(file).toLowerCase();
      return supportedExtensions.includes(ext);
    })
    .map((file) => ({
      name: file,
      path: join(inputFolder, file),
      ext: extname(file).toLowerCase(),
      creationTime: getFileCreationTime(join(inputFolder, file)),
    }));

  if (mediaFiles.length === 0) {
    console.log("No supported media files found.");
    return;
  }

  // Sort by creation date
  mediaFiles.sort(
    (a, b) => a.creationTime.getTime() - b.creationTime.getTime()
  );

  console.log(
    `\n📋 Found ${mediaFiles.length} media file(s) (sorted by creation date):`
  );
  mediaFiles.forEach((file, index) => {
    console.log(
      `  ${index + 1}. ${file.name} (${file.creationTime.toISOString()})`
    );
  });

  // Process files
  console.log("\n🚀 Starting processing...");
  const results = {
    success: 0,
    failed: 0,
    errors: [],
  };

  mediaFiles.forEach((file, index) => {
    const fileNumber = String(index + 1).padStart(2, "0"); // 01, 02, 03, etc.
    const isVideo = [".mov", ".mp4", ".avi"].includes(file.ext);
    const outputExtension = isVideo ? ".mp4" : file.ext;
    const outputFileName = `${inputPrefix}_${fileNumber}${outputExtension}`;
    const outputPath = join(outputDir, outputFileName);

    console.log(`\n📄 Processing: ${file.name}`);
    console.log(`   → ${outputFileName}`);

    let result;
    if (file.ext === ".mov") {
      // Convert MOV to MP4
      result = convertMovToMp4(file.path, outputPath);
    } else {
      // Copy other files
      result = copyFile(file.path, outputPath);
    }

    if (result.success) {
      results.success++;
    } else {
      results.failed++;
      results.errors.push(`${file.name}: ${result.error}`);
    }
  });

  // Summary
  console.log("\n📊 Processing Summary:");
  console.log(`  ✅ Successfully processed: ${results.success}`);
  console.log(`  ❌ Failed: ${results.failed}`);

  if (results.errors.length > 0) {
    console.log("\n❌ Errors:");
    results.errors.forEach((error) => console.log(`  - ${error}`));
  }

  console.log("\n🎉 Processing complete!");
  console.log(`\n📁 Files are now available in: public/${raceId}/`);
  console.log("💡 You can now use these files in your Gallery component!");
}

// Main function
async function main() {
  console.log("🎬 Media File Processor");
  console.log("=======================");

  // Check FFmpeg
  if (!checkFFmpeg()) {
    process.exit(1);
  }

  // Get command line arguments
  const args = process.argv.slice(2);

  if (args.length < 3) {
    console.log("\n📖 Usage:");
    console.log(
      "  node process-media.js <input_folder> <race_id> <input_prefix>"
    );
    console.log("\n📝 Examples:");
    console.log(
      "  node process-media.js ~/Downloads/race-photos 2025-09-06-100-miles-mors-2025 pre"
    );
    console.log(
      "  node process-media.js ./raw-photos 2025-10-18-world-championship-24-hours chap1"
    );
    console.log("\n🔧 What it does:");
    console.log("  1. Reads all media files from input folder");
    console.log("  2. Sorts them by creation date");
    console.log("  3. Converts MOV files to MP4");
    console.log("  4. Renames files as <prefix>_<number>.<ext>");
    console.log("  5. Copies them to public/<race_id>/");
    process.exit(1);
  }

  const [inputFolder, raceId, inputPrefix] = args;

  // Validate input folder
  try {
    statSync(inputFolder);
  } catch (error) {
    console.error(`❌ Input folder does not exist: ${inputFolder}`);
    process.exit(1);
  }

  // Process files
  processFiles(inputFolder, raceId, inputPrefix);
}

// Run the script
main().catch(console.error);

