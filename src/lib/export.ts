import { toPng } from "html-to-image";

/**
 * Export a DOM node to PNG with a solid background color (default white).
 * This avoids grey/transparent backgrounds on some devices.
 */
export async function exportNodePNG(
  node: HTMLElement,
  filename: string,
  backgroundColor: string = "#ffffff",
) {
  const dataUrl = await toPng(node, {
    cacheBust: true,
    pixelRatio: 2,
    backgroundColor, // force solid background
  });
  const link = document.createElement("a");
  link.download = filename;
  link.href = dataUrl;
  link.click();
}