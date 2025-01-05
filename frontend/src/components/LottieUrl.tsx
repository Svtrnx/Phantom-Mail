import { useEffect, useState } from "react";

export const useLottieFile = (url: string) => {
    const [fileData, setFileData] = useState<string>('');

    useEffect(() => {
        const fetchLottie = async () => {
            try {
                const response = await fetch(url);
                if (!response.ok) throw new Error("Failed to load Lottie file");
                const blob = await response.blob();
                const fileURL = URL.createObjectURL(blob);
                setFileData(fileURL);
            } catch (error) {
                console.error("Error loading Lottie file:", error);
            }
        };

        fetchLottie();
    }, [url]);

    return fileData;
};
