import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "~/utils/api";

const Home: NextPage = () => {
  const {data, isLoading, isError} = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title>iClean</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen bg-[#181A20] justify-center grid">
        <div className="m-auto">
          <Image
            src='/iclean.png'
            width={250}
            height={300}
            alt="iClean"
            className="mx-auto my-"
          />
          <div className="">
            <button className="text-white font-semibold bg-[#94DD26] w-80 h-10 rounded-xl my-5 shadow-md shadow-[#94DD26]">
              Sing in
            </button>
            <div className="text-white flex text-center justify-around w-60 m-auto font-light">
              <p>Não tem uma conta?</p>
              <Link
                href={'https://www.google.com/'}
                className="text-[#94DD26] font-semibold"
              >
                  Sing Up
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined },
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};
