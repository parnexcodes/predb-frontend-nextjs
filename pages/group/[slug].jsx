import React from "react";
import Head from "next/head";

import PreTable from "../../components/PreTable";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

const { DateTime } = require("luxon");

export async function getServerSideProps({ query }) {
  const groupName = query.slug;
  const [preRes, groupRes, githubRes] = await Promise.all([
    fetch('https://predb-production.up.railway.app/api/pre'),
    fetch(`https://predb-production.up.railway.app/api/group?q=${groupName}`),
    fetch(
      "https://api.github.com/repos/parnexcodes/predb-frontend-nextjs/commits/master"
    ),
  ]);

  const [preData, groupData, githubData] = await Promise.all([
    preRes.json(),
    groupRes.json(),
    githubRes.json(),
  ]);

  const preTime = groupData.result.map((element) => {
    let dt = new Date(element.createdAt);
    let preTimeString = dt.toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS);
    return preTimeString;
  });
  return {
    props: { preData, preTime, githubData, groupName, groupData }, // will be passed to the page component as props
  };
}

function Group({ preData, preTime, githubData, groupName, groupData }) {
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
        <p><b>{groupData.totalRls}</b> scene releases from <b>{groupName}</b>.</p>
      </div>
      <PreTable preData={groupData} preTime={preTime} />
      <Footer githubData={githubData} />
    </div>
  );
}

export default Group;