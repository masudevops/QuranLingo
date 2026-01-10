import { NextResponse } from "next/server";

export function success(data: any) {
    return NextResponse.json(data);
}

export function error(message: string, status = 500) {
    return NextResponse.json({ error: message }, { status });
}
