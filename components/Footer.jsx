import React from "react";
import { githubAtom } from '../pages/index'
import { useAtom } from 'jotai'

function Footer() {
  const [atom] = useAtom(githubAtom)
  return (
    <div className="flex justify-center items-end pb-8">
      <div className="flex flex-col">
        <p className="text-gray-300 bg-zinc-800 rounded-md p-2">
          developed with ❤ by parnex
        </p>
      </div>
    </div>
  );
}

export default Footer;
