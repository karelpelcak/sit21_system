import db from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export const POST = async (req: NextRequest, res: NextResponse) => {
    const cookieStore = cookies();

    try {
        const { Username, Password } = await req.json();

        if (!Username || !Password) {
            return NextResponse.json({ msg: 'Missing params' }, { status: 404 });
        }

        const user = await db.user.findFirst({
            where: {
                username: Username,
            },
        });

        if (!user) {
            return NextResponse.json({ msg: 'User not found' }, { status: 403 });
        }

        const VerifyPassword = await bcrypt.compare(Password, user.password);
        if (!VerifyPassword) {
            return NextResponse.json({ msg: 'Wrong password' }, { status: 403 });
        }

        const jwtSecret = process.env.JWT_SECRETE || '';
        if (!jwtSecret) {
            return NextResponse.json({ msg: 'JWT secret is not defined' }, { status: 500 });
        }

        const token = jwt.sign(
            {
                id: user.id,
                username: user.username,
                role: user.role,
            },
            jwtSecret,
            { expiresIn: '24h' }
        );

        cookieStore.set('Auth_token', token, {
            httpOnly: true,
            path: '/',
            sameSite: 'strict',
        });

        return NextResponse.json({ msg: 'Login successful', redirect: true, url: '/' });
    } catch (error) {
        return NextResponse.json({ Error: error }, { status: 500 });
    }
};
