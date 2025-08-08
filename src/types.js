;
// Helper functions for type checking
export const isNewImage = (image) => {
    return image.type === 'new';
};
export const isExistingImage = (image) => {
    return image.type === 'existing';
};
