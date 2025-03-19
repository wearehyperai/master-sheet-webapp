import ApiEndpoints from "@/config/api_endpoints";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const id = req.nextUrl.searchParams.get("id") ?? '';

        const response = await axios.get(ApiEndpoints.GET_USER_BY_ID(id), {
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
    } catch (error: unknown) {
        console.log("GET request error " + (error as Error).message);
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}

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
    } catch (error: unknown) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    try {
        // Extract ID from the URL query parameters instead of route params
        const id = req.nextUrl.searchParams.get("id") ?? '';
        const body = await req.json();
        
        const response = await axios.put(ApiEndpoints.UPDATE_USER(id), body, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        
        if (response.status === 200) {
            return NextResponse.json(response.data, { status: 200 });
        }
        else {
            return NextResponse.json({ error: "User not updated" }, { status: 400 });
        }
    } catch (error: unknown) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        // Extract ID from the URL query parameters instead of route params
        const id = req.nextUrl.searchParams.get("id") ?? '';
        
        const response = await axios.delete(ApiEndpoints.DELETE_USER(id), {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        
        if (response.status === 200) {
            return NextResponse.json(response.data, { status: 200 });
        }
        else {
            return NextResponse.json({ error: "User not deleted" }, { status: 400 });
        }
    } catch (error: unknown) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}