import React from "react";
import Head from "next/head";
import PreTable from "../components/PreTable";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Pagination from "../components/Pagination";
import { atom, useAtom } from "jotai";

const { DateTime } = require("luxon");

export async function getServerSideProps(context) {
  let requestEndpoint = context.query.type || "pre";
  let pageNum = context.query.page || "";
  let query = context.query.q || "";
  const [preRes] = await Promise.all([
    fetch(
      `https://predb-production.up.railway.app/api/${requestEndpoint}?q=${query}&page=${pageNum}`
    )
  ]);

  const [preData] = await Promise.all([
    preRes.json()
  ]);

  const preTime = preData.result.map((element) => {
    let dt = new Date(element.createdAt);
    let preTimeString = dt.toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS);
    return preTimeString;
  });
  return {
    props: { preData, preTime, requestEndpoint, pageNum, query }, // will be passed to the page component as props
  };
}

export const githubAtom = atom();

function Home({
  preData,
  preTime,
  requestEndpoint,
  pageNum,
  query,
}) {

  return (
    <div className="min-h-screen bg-zinc-900">
      <Head>
        <title>predb | Warez Scene Database</title>
      </Head>
      <Header />
      <h1 className="text-gray-300 text-7xl text-center font-bold mt-10">
        predb
      </h1>
      <div className="text-gray-300 text-center pt-4">
        <h1>just another predb site.</h1>
        <p>
          Proudly indexing : <b>{preData.totalPre}</b> releases.
        </p>
      </div>
      <PreTable preData={preData} preTime={preTime} />
      <Pagination
        pageNum={pageNum}
        requestEndpoint={requestEndpoint}
        query={query}
      />
      <Footer />
    </div>
  );
}

export default Home;
