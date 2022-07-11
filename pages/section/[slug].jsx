import React from "react";
import Head from "next/head";

import PreTable from "../../components/PreTable";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

const { DateTime } = require("luxon");

export async function getServerSideProps({ query }) {
  const catName = query.slug;
  const [preRes, githubRes] = await Promise.all([
    fetch(`https://predb-production.up.railway.app/api/cat?q=${catName}`),
    fetch(
      "https://api.github.com/repos/parnexcodes/predb-frontend-nextjs/commits/master"
    ),
  ]);

  const [preData, githubData] = await Promise.all([
    preRes.json(),
    githubRes.json(),
  ]);

  const preTime = preData.result.map((element) => {
    let dt = new Date(element.createdAt);
    let preTimeString = dt.toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS);
    return preTimeString;
  });
  return {
    props: { preData, preTime, githubData, catName }, // will be passed to the page component as props
  };
}

function Section({ preData, preTime, githubData, catName }) {
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
        <p>Proudly indexing : <b>{preData.result[0]?.id}</b> releases.</p>
        <p><b>{preData.totalRls}</b> scene releases in the <b>{catName}</b> section.</p>
      </div>
      <PreTable preData={preData} preTime={preTime} />
      <Footer githubData={githubData} />
    </div>
  );
}

export default Section;
