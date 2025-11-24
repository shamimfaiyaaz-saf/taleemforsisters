import { GoogleGenAI } from "@google/genai";

// Helper to get the API key securely
const getApiKey = (): string => {
    return process.env.API_KEY || '';
};

export const generateIslamicResponse = async (prompt: string): Promise<string> => {
    try {
        const apiKey = getApiKey();
        if (!apiKey) {
            throw new Error("API Key not found");
        }

        const ai = new GoogleGenAI({ apiKey });
        
        const systemInstruction = `
        You are a helpful, knowledgeable, and gentle AI assistant for the "Taleem for Sisters" website. 
        Your primary language for communication is Bengali (Bangla).
        Your role is to provide supportive, accurate, and kind Islamic guidance based on the Quran and Sunnah.
        
        Tone and Style:
        - Addressing the user as "Sister" or "প্রিয় বোন" (Dear Sister).
        - Kind, empathetic, and non-judgmental.
        - Clear and easy to understand Bengali.
        
        Content Guidelines:
        - If asked about Fiqh (jurisprudence) rulings that have multiple opinions, mention that there are differences and advise consulting a local scholar for specific personal rulings.
        - Focus on general advice, spiritual encouragement, and educational information.
        - Keep answers concise (under 200 words) unless a detailed explanation is necessary.
        - If a question is inappropriate or outside the scope of Islamic education/support, politely decline to answer.
        
        ALWAYS RESPOND IN BENGALI unless the user explicitly asks for English.
        `;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                systemInstruction: systemInstruction,
                maxOutputTokens: 500, // Limit response length
                temperature: 0.7, // Moderate creativity for warm tone but sticking to facts
            }
        });

        return response.text || "দুঃখিত, আমি এই মুহূর্তে উত্তর তৈরি করতে পারছি না।";

    } catch (error) {
        console.error("Error generating content:", error);
        return "আমি বর্তমানে প্রযুক্তিগত সমস্যার সম্মুখীন হচ্ছি। অনুগ্রহ করে পরে আবার চেষ্টা করুন, ইনশাআল্লাহ।";
    }
};