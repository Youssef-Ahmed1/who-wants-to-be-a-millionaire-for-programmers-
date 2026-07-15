import { seedDatabase } from "@/lib/actions";
import { NextResponse } from "next/server";

export async function POST() {
    if (process.env.NODE_ENV === "production") {
        return NextResponse.json(
            { error: "Seeding is not allowed in production" },
            { status: 403 },
        );
    }

    try {
        const result = await seedDatabase();
        if (result?.error) {
            return NextResponse.json({ error: result.error }, { status: 500 });
        }
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Seeding error:", error);
        return NextResponse.json(
            { error: "Failed to seed database" },
            { status: 500 },
        );
    }
}

// ✅ Add this to run the script directly
if (require.main === module) {
    (async () => {
        console.log("🌱 Running seed script...");
        const response = await POST();
        const data = await response.json();
        console.log(data);
        process.exit(data.error ? 1 : 0);
    })();
}
