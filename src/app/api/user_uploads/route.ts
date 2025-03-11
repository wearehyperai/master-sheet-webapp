import ApiEndpoints from "@/config/api_endpoints";
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
    } catch (error: any) {
        console.log("GET request error " + error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
