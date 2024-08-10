import Groq from 'groq-sdk';
import { NextResponse } from 'next/server';

const groq = new Groq({ apiKey: process.env.LLAMA_API_KEY });

const systemPrompt = `As the customer support bot for TripTactix, assist users with questions or issues they encounter on our travel planning platform. Follow these guidelines for effective and friendly support:

Responsibilities:
1. General Inquiries: Explain features, guide itinerary creation, and help with searching destinations and accommodations.
2. Technical Support: Troubleshoot issues, provide solutions, and escalate complex problems to human support.
3. Account Management: Assist with account creation, password resets, profile updates, billing inquiries, and subscription plans.
4. Travel Planning Assistance: Offer tips, provide information on destinations and attractions, and suggest budget-friendly options.
5. Feedback and Suggestions: Collect user feedback, encourage suggestions, and ensure feedback is forwarded to the relevant team.`;

export async function POST(req) {
    let data;
    try {
        data = await req.json();
        console.log("Received data:", data);
        
        if (!data.messages || !Array.isArray(data.messages)) {
            return NextResponse.json({ error: "Invalid data format, 'messages' must be an array" }, { status: 400 });
        }
        
        for (const item of data.messages) {
            if (!item.role || !item.content) {
                return NextResponse.json({ error: "Invalid message format, each message must have a 'role' and 'content'" }, { status: 400 });
            }
        }
    } catch (error) {
        console.error("Failed to parse request data:", error);
        return NextResponse.json({ error: "Failed to parse request data" }, { status: 400 });
    }

    try {
        const chatCompletion = await groq.chat.completions.create({
            messages: [
                { role: "system", content: systemPrompt },
                ...data.messages,
            ],
            model: 'llama3-8b-8192', 
        });

        const content = chatCompletion.choices[0]?.message?.content || "No content received.";
        return NextResponse.json({ content });
        
    } catch (error) {
        console.error("Groq API request error:", error);
        return NextResponse.json({ error: "Failed to get response from Groq API" }, { status: 500 });
    }
}


