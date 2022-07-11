import React from "react";
import Head from "next/head";

import PreTable from "../../components/PreTable";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

const { DateTime } = require("luxon");

export async function getServerSideProps({ query }) {
  const sectionName = query.slug;
  const [preRes, sectionRes, githubRes] = await Promise.all([
    fetch('https://predb-production.up.railway.app/api/pre'),
    fetch(`https://predb-production.up.railway.app/api/cat?q=${sectionName}`),
    fetch(
      "https://api.github.com/repos/parnexcodes/predb-frontend-nextjs/commits/master"
    ),
  ]);

  const [preData, sectionData, githubData] = await Promise.all([
    preRes.json(),
    sectionRes.json(),
    githubRes.json(),
  ]);

  const preTime = sectionData.result.map((element) => {
    let dt = new Date(element.createdAt);
    let preTimeString = dt.toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS);
    return preTimeString;
  });
  return {
    props: { preData, preTime, githubData, sectionName, sectionData }, // will be passed to the page component as props
  };
}

function Section({ preData, preTime, githubData, sectionName, sectionData }) {
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
        <p><b>{sectionData.totalRls}</b> scene releases in the <b>{sectionName}</b> section.</p>
      </div>
      <PreTable preData={sectionData} preTime={preTime} />
      <Footer githubData={githubData} />
    </div>
  );
}

export default Section;
