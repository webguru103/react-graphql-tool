export const checkBoundaries = (
  pageRef: HTMLDivElement,
  newX: number,
  newY: number,
  newWidth: number,
  newHeight: number,
  zoom: number,
) => {

  const pageRect = pageRef.getBoundingClientRect();

  const newXZoomed = newX * zoom;
  const newYZoomed = newY * zoom;
  const newWidthZoomed = newWidth * zoom;
  const newHeightZoomed = newHeight * zoom;

  const canMove = ((newXZoomed && newXZoomed > 0)
    && (newYZoomed && newYZoomed > 0)
    && (newWidthZoomed && newWidthZoomed > 0)
    && (newHeightZoomed && newHeightZoomed > 0)
    && ((newXZoomed + newWidthZoomed) < pageRect.width)
    && ((newYZoomed + newHeightZoomed) < pageRect.height));
  return canMove;
};

export const adjustNewHeightOrWidthForBoundaries = (
  pageRef: HTMLDivElement,
  x: number,
  y: number,
  width: number,
  height: number,
  zoom: number,
) => {

  const pageRect = pageRef.getBoundingClientRect();

  const xZoomed = x * zoom;
  const yZoomed = y * zoom;
  const widthZoomed = width * zoom;
  const heightZoomed = height * zoom;

  let newWidth = widthZoomed;
  let newHeight = heightZoomed;

  if (newWidth < 0) {
    newWidth = 0;
  }

  if (newHeight < 0) {
    newHeight = 0;
  }

  if ((xZoomed + newWidth) > pageRect.width) {
    newWidth = pageRect.width - xZoomed;
  }

  if ((yZoomed + newHeight) > pageRect.height) {
    newHeight = pageRect.height - yZoomed;
  }

  return {
    height: newHeight / zoom,
    width: newWidth / zoom,
  };
};

export const adjustNewXOrYForBoundaries = (
  pageRef: HTMLDivElement,
  x: number,
  y: number,
  width: number,
  height: number,
  zoom: number,
) => {

  const pageRect = pageRef.getBoundingClientRect();

  const xZoomed = x * zoom;
  const yZoomed = y * zoom;
  const widthZoomed = width * zoom;
  const heightZoomed = height * zoom;

  let newX = xZoomed;
  let newY = yZoomed;

  if (newX < 0) {
    newX = 0;
  }

  if (newY < 0) {
    newY = 0;
  }

  if ((newX + widthZoomed) > pageRect.width) {
    newX = pageRect.width - widthZoomed;
  }

  if ((newY + heightZoomed) > pageRect.height) {
    newY = pageRect.height - heightZoomed;
  }

  return {
    x: newX / zoom,
    y: newY / zoom,
  };
};
