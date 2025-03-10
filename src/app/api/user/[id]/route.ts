import ApiEndpoints from "@/config/api_endpoints";
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        console.log("GET request received " + id);
        const response = await axios.get(ApiEndpoints.GET_USER_BY_ID(id), {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        console.log("GET request response " + response.data);
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
