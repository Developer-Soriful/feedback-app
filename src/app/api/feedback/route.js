import { feedbackData, getNextId } from "@/data/feedback";
import { NextResponse } from "next/server";



// this is for get request
export async function GET(request) {
    return NextResponse.json({ success: true, data: feedbackData.slice().reverse() })
}

// this is for post request 
export async function POST(request) {
    try {
        const body = await request.json()
        const { name, email, feedback } = body;
        // this is check email name feedback have or not
        if (!name || !email || !feedback) {
            return NextResponse.json({ success: false, message: 'missing required fields' }, { status: 400 })
        }
        // this is for user enter feedback data 
        const newFeedback = {
            id: getNextId,
            name,
            email,
            feedback,
            timestamp: new Date()
        }
        // then i will push this new feedback data in the prev data
        feedbackData.push(newFeedback)
        return NextResponse.json({ success: true, data: newFeedback }, { status: 201 })
    } catch (error) {
        console.error('error post request', error)
        return NextResponse.json({ success: false, message: "Internal Server Error" })
    }
}
