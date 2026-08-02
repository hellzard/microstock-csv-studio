// @ts-expect-error no types for piexifjs
import * as piexif from "piexifjs";
import { MasterAsset } from "@/types/master-asset";

// Helper to convert string to UCS2 (UTF-16LE) byte array for Windows XP tags (XPTitle, XPKeywords)
function stringToUCS2(str: string): number[] {
  const bytes = [];
  for (let i = 0; i < str.length; i++) {
    const charCode = str.charCodeAt(i);
    bytes.push(charCode & 0xff);
    bytes.push((charCode >> 8) & 0xff);
  }
  // Null terminator
  bytes.push(0);
  bytes.push(0);
  return bytes;
}

export async function injectExifToImage(file: File, asset: MasterAsset): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = function(e) {
      try {
        const dataUrl = e.target?.result as string;
        if (!dataUrl.startsWith("data:image/jpeg")) {
          // piexifjs only supports JPEG
          console.warn("Only JPEG files are supported for EXIF injection");
          return resolve(file);
        }

        const zeroth = {
          [piexif.ImageIFD.ImageDescription]: asset.description || asset.title || "",
          [piexif.ImageIFD.XPTitle]: stringToUCS2(asset.title || ""),
          [piexif.ImageIFD.XPKeywords]: stringToUCS2(asset.keywords.join(";")),
          [piexif.ImageIFD.Software]: "BuatinCSV Studio",
        };
        
        const exifObj = { "0th": zeroth, "Exif": {}, "GPS": {} };
        const exifStr = piexif.dump(exifObj);
        
        const newJpegDataUrl = piexif.insert(exifStr, dataUrl);
        
        // Convert data URL back to Blob
        const byteString = atob(newJpegDataUrl.split(',')[1]);
        const mimeString = newJpegDataUrl.split(',')[0].split(':')[1].split(';')[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }
        
        const blob = new Blob([ab], { type: mimeString });
        resolve(blob);
      } catch (err) {
        console.error("Failed to inject EXIF:", err);
        resolve(file); // fallback to original
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
