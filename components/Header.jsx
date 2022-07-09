import Link from "next/link";
import React from "react";

function Header() {
  return (
    <div>
      <div className="flex justify-center">
        <div className="space-x-2 mt-8">
          <Link href={"/"} as={"/"}>
            <a className="bg-zinc-800 text-gray-300 rounded-md p-2 hover:opacity-70">predb</a>
          </Link>
            <a className="bg-zinc-800 text-gray-300 rounded-md p-2 hover:opacity-70" href="https://predb-production.up.railway.app/" target={'_blank'} rel="noreferrer">
              API
            </a>
            <a className="bg-zinc-800 text-gray-300 rounded-md p-2 hover:opacity-70" href="https://github.com/parnexcodes/predb-frontend-nextjs" target={'_blank'} rel="noreferrer">
              Github
            </a>
        </div>
      </div>
    </div>
  );
}

export default Header;
