'use client';
import axios from 'axios';
import { FormEvent, useState } from 'react';

const Page = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const Submit = async (e: FormEvent) => {
        e.preventDefault();
        axios
            .post('/api/auth/login', {
                Username: username,
                Password: password,
            })
            .then(function (response) {
                if (response.data.redirect) {
                    window.location.href = response.data.url;
                } else {
                    console.log(response.data.msg);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    return (
        <div className="w-screen h-screen bg-black text-white">
            <div className=" h-1/2 flex justify-center items-center content-center">
                <form onSubmit={Submit} className="flex flex-col gap-4 justify-center items-center content-center">
                    <input
                        type="text"
                        className="w-[300px] h-[40px] rounded-md border-4 border-orange-600 bg-transparent outline-none p-2"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        className="w-[300px] h-[40px] rounded-md border-4 border-orange-600 bg-transparent outline-none p-2"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                        type="submit"
                        value="Přihlásit"
                        className="border-2 border-orange-600 p-2 rounded-lg hover:cursor-pointer"
                    />
                </form>
            </div>
            <div className="h-1/2 bg-orange-600">
                <div className="h-[100px] rounded-b-full bg-black"></div>
            </div>
        </div>
    );
};

export default Page;
