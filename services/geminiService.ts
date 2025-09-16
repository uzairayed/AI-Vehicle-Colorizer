import { GoogleGenAI, Modality } from "@google/genai";

// Note: The API key is sourced from the `process.env.API_KEY` environment variable,
// which is a standard and secure practice. It is assumed to be configured in the
// execution environment.

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
    // The GoogleGenAI constructor will read the process.env.API_KEY variable.
    // If it's not set, the constructor will throw a helpful error.
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
             if (error.message.includes('API key not valid')) {
                throw new Error("The configured API key is invalid. Please check your environment configuration.");
             }
             if (error.message.includes('RESOURCE_EXHAUSTED')) {
                throw new Error("You've exceeded the free API usage limit for today. Please try again tomorrow or check your billing plan.");
             }
            throw new Error(`Failed to edit image: ${error.message}`);
        }
        throw new Error("An unknown error occurred while editing the image.");
    }
};