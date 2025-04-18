import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import JSZip from "jszip";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function createZipFile(
  files: { name: string; content: string }[],
): Promise<Blob> {
  const zip = new JSZip();

  // Add each file to the zip
  files.forEach((file) => {
    zip.file(file.name, file.content);
  });

  // Generate the zip file as a blob
  return await zip.generateAsync({ type: "blob" });
}
