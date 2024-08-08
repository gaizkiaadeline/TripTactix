import { NextResponse } from "next/server";
import OpenAI from "openai";

const systemPrompt = `As the customer support bot for TripTactix, assist users with questions or issues they encounter on our travel planning platform. Follow these guidelines for effective and friendly support:

Responsibilities:
1. General Inquiries: Explain features, guide itinerary creation, and help with searching destinations and accommodations.
2. Technical Support: Troubleshoot issues, provide solutions, and escalate complex problems to human support.
3. Account Management: Assist with account creation, password resets, profile updates, billing inquiries, and subscription plans.
4. Travel Planning Assistance: Offer tips, provide information on destinations and attractions, and suggest budget-friendly options.
5. Feedback and Suggestions: Collect user feedback, encourage suggestions, and ensure feedback is forwarded to the relevant team.`

export async function POST(req){
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,  
    });
      
    const data = await req.json()
    const completion = await openai.chat.completions.create({
        messages: [
        {
            role: 'system', 
            content: systemPrompt
        },
        ...data,
    ],
    model: 'gpt-4o-mini',
    stream: true,
    })

    const stream = new ReadableStream({
        async start(controller){
            const encoder = new TextEncoder()
            try{
                for await (const chunk of completion){
                    const content = chunk.choices[0]?.delta?.content
                    if (content){
                        const text = encoder.encode(content)
                        controller.enqueue(text)
                    }
                }
            }
            catch (error){
                controller.error(err)
            } finally {
                controller.close()
            }
        },
    })
    return new NextResponse(stream)
}

