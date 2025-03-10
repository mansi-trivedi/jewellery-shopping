const fetchProductImages = (images: string): string[] => {
  return images.split(",").map((item: string) => item.trim());
};

export { fetchProductImages };
