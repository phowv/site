export async function rotateFile90(file: File, isRight: boolean = true): Promise<File> {
  const img = await new Promise<HTMLImageElement>((res, rej) => {
    const url = URL.createObjectURL(file);
    const i = new Image();
    i.onload = () => { URL.revokeObjectURL(url); res(i); };
    i.onerror = (e) => { URL.revokeObjectURL(url); rej(e); };
    i.src = url;
  });

  const w = img.width, h = img.height;
  const canvas = document.createElement('canvas');
  canvas.width = h;
  canvas.height = w;
  const ctx = canvas.getContext('2d')!;
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate(((isRight ? 1 : -1) * 90 * Math.PI) / 180);
  ctx.drawImage(img, -w / 2, -h / 2);

  const blob = await new Promise<Blob | null>(res => canvas.toBlob(res as any, file.type || 'image/png'));
  return new File([blob as Blob], file.name, { type: (blob as Blob).type });
}
