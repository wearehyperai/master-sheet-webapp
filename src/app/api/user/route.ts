import ApiEndpoints from "@/config/api_endpoints";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const response = await axios.post(ApiEndpoints.CREATE_USER, JSON.stringify(body), {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        console.log("POST request response " + response.data);
        if (response.status === 201) {
            return NextResponse.json(response.data, { status: 201 });
        }
        else {
            return NextResponse.json({ error: "User not created" }, { status: 400 });
        }
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
