import { NextRequest, NextResponse } from "next/server";
import { PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

type CreateUserResponse = {
    name:       string;
    email:      string;
    comment:    string;
    createdAt:  string;
  };

export async function GET(req: NextRequest){
   try{
    const startIndex = parseInt(req.nextUrl.searchParams.get('StartIndex') || '0');

    const posts = await prisma.post.findMany({
        skip: startIndex,
        take: 50
    });
    
    return new NextResponse(JSON.stringify({ test: "success", posts }), {
        status: 200,
        headers: {
            'Content-type': 'application/json',
        }
    });
   } catch(error){
        console.error(error);
        return new NextResponse(JSON.stringify({error: "Failder to fetch posts."}), {
            status: 500,
            headers:{
                'Content-Type': 'application/json',
            }
        });
    }
   }

export async function POST(req: NextRequest){
    try{
        const body = await req.json();
        const { name, email, comment } = body;

        //check whether have all required info
        if(!name || !email ||!comment){
            return new NextResponse(
                JSON.stringify({
                    status: 'error',
                    message: 'Missing required field. Checked your name, email, and comment again.'
                }), {
                    status: 400,
                    headers: {
                        'Content-Type': 'application/json',
                    }
                 });
        }

        //store successful data
        return new NextResponse(
            JSON.stringify({
                status: 'success',
                message:'Comment successfully submitted.'
            }), {status: 200}
        )
    }catch(error){
        return new NextResponse(
            JSON.stringify({
                status:'error',
                message:'random errors'
            }), {status: 500}
        );
    }
}