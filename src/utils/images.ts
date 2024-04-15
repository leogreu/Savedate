export const resize = (file: File, maxWidth: number, callback: (dataURL: string) => void) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        // Calculate the new height based on the aspect ratio
        const scaleFactor = maxWidth / img.width;
        const newHeight = img.height * scaleFactor;

        // Set canvas size to the new dimensions
        canvas.width = maxWidth;
        canvas.height = newHeight;

        // Draw the resized image
        context?.drawImage(img, 0, 0, maxWidth, newHeight);

        // Handle differences in jpeg qualities between browsers
        const quality = navigator.userAgent.match(/Version\/\d+.+Safari/) ? 0.6 : 0.8;

        const dataURL = canvas.toDataURL("image/jpeg", quality);
        callback(dataURL);
    };

    img.src = url;
};
