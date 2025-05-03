
import { db } from "@/db";
import { stores } from "@/db/schema/stores";
import { ilike } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req){

    const {user_input} = await req.json()
    console.log(`username : ${user_input}`)

    let data = {}

    if (user_input)
        data = await db.select().from(stores).where(ilike(stores.username, `%${user_input}%`))


    return NextResponse.json(data , { status: 200 });    

} 