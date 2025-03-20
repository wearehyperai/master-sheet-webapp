import ApiEndpoints from "@/config/apiEndpoints";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const id = req.nextUrl.searchParams.get("id") ?? '';

        const response = await axios.get(ApiEndpoints.GET_USER_UPLOADS(id), {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (response.status === 200) {
            return NextResponse.json(response.data, { status: 200 });
        }
        else {
            return NextResponse.json({ error: "User not fetched" }, { status: 400 });
        }
    } catch (error) {
        console.log("GET request error " + (error instanceof Error ? error.message : String(error)));
        return NextResponse.json({ 
            error: error instanceof Error ? error.message : "An unknown error occurred" 
        }, { status: 500 });
    }
}