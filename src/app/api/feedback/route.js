import { NextResponse } from "next/server";

const feedbackData = [
    { id: 1, name: "John", email: "john@example.com", feedback: "Nice project!", timestamp: new Date() },
];

export async function GET() {
    return NextResponse.json({ success: true, data: feedbackData });
}

export async function POST(request) {
    try {
        const body = await request.json();
        const { name, email, feedback } = body;

        if (!name || !email || !feedback) {
            return NextResponse.json(
                { success: false, message: "Missing required fields" },
                { status: 400 }
            );
        }

        const newFeedback = {
            id: Date.now(),
            name,
            email,
            feedback,
            timestamp: new Date(),
        };

        return NextResponse.json({ success: true, data: newFeedback }, { status: 201 });
    } catch (error) {
        console.error("Error in POST:", error);
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
}
