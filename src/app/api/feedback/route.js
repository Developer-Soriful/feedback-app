import { NextResponse } from 'next/server';
import { getDbConnection } from '@/data/db';

export async function POST(request) {
    let db;
    try {
        const body = await request.json();
        const { name, email, feedback } = body;

        if (!name || !email || !feedback) {
            return NextResponse.json(
                { success: false, message: "All fields are required." },
                { status: 400 }
            );
        }

        db = await getDbConnection();

        const result = await db.run(
            'INSERT INTO feedback (name, email, feedback) VALUES (?, ?, ?)',
            [name, email, feedback]
        );

        const newFeedback = await db.get('SELECT * FROM feedback WHERE id = ?', result.lastID);

        return NextResponse.json({ success: true, data: newFeedback }, { status: 201 });

    } catch (error) {
        console.error("Error in POST:", error);
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
}

export async function GET() {
    let db;
    try {
        db = await getDbConnection();

        const data = await db.all('SELECT * FROM feedback ORDER BY timestamp DESC');

        return NextResponse.json({ success: true, data }, { status: 200 });

    } catch (error) {
        console.error("Database GET Error:", error);
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
}