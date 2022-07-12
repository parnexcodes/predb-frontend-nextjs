import React from "react";
import Link from "next/link";

function Pagination(props) {
  let { pageNum, requestEndpoint, query } = props;
  let pages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  if (isNaN(pageNum) == true) {
    pageNum = 1;
  }
  return (
    <div className="flex justify-center flex-wrap">
      <li className="flex-row list-none my-8 pr-2">
        <Link
          href={{
            pathname: "/",
            query: {
              type: requestEndpoint,
              q: query,
              page: Number(pageNum) - 1,
            },
          }}
        >
          <a className="rounded-md px-4 py-2 bg-zinc-800 text-gray-300 hover:opacity-70">{`<`}</a>
        </Link>
      </li>
      {pages.map((element, index) => {
        return (
          <li key={index} className="flex-row list-none my-8 pr-2">
            <Link
              key={index}
              href={{
                pathname: "/",
                query: { type: requestEndpoint, q: query, page: element },
              }}
            >
              <a className="rounded-md px-4 py-2 bg-zinc-800 text-gray-300 hover:opacity-70">
                {element}
              </a>
            </Link>
          </li>
        );
      })}
      <li className="flex-row list-none my-8 pr-2">
        <Link
          href={{
            pathname: "/",
            query: {
              type: requestEndpoint,
              q: query,
              page: Number(pageNum) + 1,
            },
          }}
        >
          <a className="rounded-md px-4 py-2 bg-zinc-800 text-gray-300 hover:opacity-70">{`>`}</a>
        </Link>
      </li>
    </div>
  );
}

export default Pagination;
