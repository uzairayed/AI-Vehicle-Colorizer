import { GoogleGenAI, Modality } from "@google/genai";

const fileToGenerativePart = (base64: string, mimeType: string) => {
    return {
        inlineData: {
            data: base64,
            mimeType
        },
    };
};

export const editImageWithColor = async (
    base64Image: string,
    mimeType: string,
    colorName: string,
    finish: string
): Promise<string> => {
    if (!process.env.API_KEY) {
        throw new Error("API_KEY environment variable is not set.");
    }

    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

        const imagePart = fileToGenerativePart(base64Image, mimeType);
        const textPart = {
            text: `Please realistically change only the main body color of the vehicle (car or bike) in this image to a vibrant, ${finish} ${colorName}. Keep the original background, wheels, windows, lights, and all other non-body parts exactly the same. The final image should look like a professional photograph.`
        };

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image-preview',
            contents: {
                parts: [imagePart, textPart],
            },
            config: {
                responseModalities: [Modality.IMAGE, Modality.TEXT],
            },
        });

        // The response will contain multiple parts. We need to find the image part.
        for (const part of response.candidates?.[0]?.content?.parts ?? []) {
            if (part.inlineData) {
                const newBase64Image = part.inlineData.data;
                const newMimeType = part.inlineData.mimeType;
                return `data:${newMimeType};base64,${newBase64Image}`;
            }
        }
        
        throw new Error("AI did not return an image. It might have refused the request.");

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        if (error instanceof Error) {
            throw new Error(`Failed to edit image: ${error.message}`);
        }
        throw new Error("An unknown error occurred while editing the image.");
    }
};
