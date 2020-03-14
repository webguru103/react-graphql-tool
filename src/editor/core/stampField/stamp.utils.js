// Function is used to get the height and width from the passed SVG in base64-ed dataURI format
// i.e.: 'data:image/svg+xml;base64,<base64 hash here>'
export const getWidthHeightFromSVGString = (dataURIBase64: string) => {
  const dataURIPrefix = 'data:image/svg+xml;base64,';
  const widthRe = /\swidth="(\d|\.)+"/;
  const heightRe = /\sheight="(\d|\.)+"/;

  const svgString = atob(dataURIBase64.slice(dataURIPrefix.length));

  const width = svgString.match(widthRe);
  const height = svgString.match(heightRe);

  if (width && width.length && height && height.length) {
    return {
      width: Number(width[0]
        // remove leading whitespace
        .trim()
        // remove prefix
        .slice('width='.length)
        // remove extra quotes if any
        .replace(/['"]+/g, '')),
      height: Number(height[0].trim().slice('height='.length).replace(/['"]+/g, '')),
    };
  }

  return null;
};
