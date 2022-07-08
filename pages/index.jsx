import React from "react";
import PreTable from "../components/PreTable";
const { DateTime } = require("luxon");

export async function getServerSideProps(context) {
  const res = await fetch("https://predb-production.up.railway.app/api/pre");
  const data = await res.json();
  const preTime = data.result.map((element) => {
    let dt = new Date(element.createdAt);
    let preTimeString = dt.toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS);
    return preTimeString;
  });
  return {
    props: { data, preTime }, // will be passed to the page component as props
  };
}

function Home({ data, preTime }) {
  return (
    <div className="min-h-screen bg-zinc-900">
      <h1 className="text-gray-300 text-7xl text-center font-bold pt-24">
        predb
      </h1>
      <div className="text-gray-300 text-center pt-4">
        <h1>just another predb site.</h1>
        <p>Proudly indexing : {data.result[0].id} releases.</p>
      </div>
      <PreTable data={data} preTime={preTime} />
    </div>
  );
}

export default Home;
