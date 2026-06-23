export function readFileAsDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;

    reader.readAsDataURL(file);
  });
}

export function cropImageToSquare(
  imageSrc: string,
  positionX: number,
  positionY: number,
  zoom: number,
) {
  return new Promise<string>((resolve, reject) => {
    const imageElement = new Image();

    imageElement.onload = () => {
      const canvasSize = 256;
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      if (!context) {
        reject(new Error("Could not prepare image"));
        return;
      }

      canvas.width = canvasSize;
      canvas.height = canvasSize;

      const baseSourceSize = Math.min(imageElement.width, imageElement.height);
      const sourceSize = baseSourceSize / zoom;

      const maxX = Math.max(0, imageElement.width - sourceSize);
      const maxY = Math.max(0, imageElement.height - sourceSize);

      const sourceX = (maxX * positionX) / 100;
      const sourceY = (maxY * positionY) / 100;

      context.drawImage(
        imageElement,
        sourceX,
        sourceY,
        sourceSize,
        sourceSize,
        0,
        0,
        canvasSize,
        canvasSize,
      );

      resolve(canvas.toDataURL("image/jpeg", 0.72));
    };

    imageElement.onerror = reject;
    imageElement.src = imageSrc;
  });
}
