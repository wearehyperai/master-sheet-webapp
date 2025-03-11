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
    } catch (error: any) {
        console.log("GET request error " + error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
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
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
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
            return NextResponse.json({ error: "User not fetched" }, { status: 400 });
        }
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE({ params }: { params: { id: string } }) {
    try {
        const { id } = params;
        const response = await axios.delete(ApiEndpoints.DELETE_USER(id), {
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
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
