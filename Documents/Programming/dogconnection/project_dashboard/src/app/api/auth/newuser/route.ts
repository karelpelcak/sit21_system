import db from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const POST = async (req: NextRequest) => {
    try {
        const { Username, Password } = await req.json();
        if (!Username || !Password) {
            return NextResponse.json({ msg: 'Missing params' }, { status: 404 });
        }

        const UsernameUse = await db.user.findFirst({
            where: {
                username: Username,
            },
        });

        if (UsernameUse) {
            return NextResponse.json({ msg: 'User exist' }, { status: 403 });
        }

        const HashPasword = await bcrypt.hash(Password, 10);

        if (!HashPasword) {
            return NextResponse.json({ msg: 'Wrong password' }, { status: 403 });
        }

        const user = await db.user.create({
            data: {
                username: Username,
                password: Password,
            },
        });

        if(!user){
            return NextResponse.json({ msg: 'User not create' }, { status: 403 });
        }
        return NextResponse.json({u: user}, { status: 200 });
    } catch (error) {
        return NextResponse.json({ Error: error }, { status: 500 });
    }
};
