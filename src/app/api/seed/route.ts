import { seedDatabase } from "@/lib/actions";
import { NextResponse } from "next/server";

export async function POST() {
    try {
        const result = await seedDatabase();
        if (result?.error) {
            return NextResponse.json({ error: result.error }, { status: 500 });
        }
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to seed database" },
            { status: 500 }
        );
    }
}
