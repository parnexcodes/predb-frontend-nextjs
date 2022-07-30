import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Link from "next/link";

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Tag,
} from "@chakra-ui/react";

const { DateTime } = require("luxon");

export async function getServerSideProps(context) {
  let { slug } = context.query;
  const [nfoRes, srrRes, preRes] = await Promise.all([
    fetch(`https://corsproxy.io/?https://api.srrdb.com/v1/nfo/${slug}`),
    fetch(`https://corsproxy.io/?https://api.srrdb.com/v1/details/${slug}`),
    fetch(`https://predb-api-vercel.vercel.app/api/search?q=${slug}`),
  ]);

  const [nfoData, srrData, preData] = await Promise.all([
    nfoRes.json(),
    srrRes.json(),
    preRes.json(),
  ]);

  return {
    props: {
      nfoData,
      srrData,
      preData,
    },
  };
}

function Release({ nfoData, srrData, preData }) {
  const router = useRouter();
  const { slug } = router.query;

  let nfoLink = nfoData["nfolink"][0]?.replace("api.", "");
  let nfoImage = `https://cable.ayra.ch/nfo/?url=${nfoLink}`;

  let srrFiles = srrData["files"]?.map((element, index) => {
    return (
      <Tr className="hover:bg-zinc-800" key={element.id}>
        <Td>{element.name}</Td>
        <Td>{element.size}</Td>
        <Td>{element.crc}</Td>
      </Tr>
    );
  });

  const [time, setTime] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let dt = new Date(preData["result"][0].createdAt);
    let preTimeString = dt.toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS);
    setTime(preTimeString);
    setLoading(false);
  }, [preData]);

  let dt = new Date(preData["result"][0].createdAt);
  let preTimeString = dt.toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS);

  return (
    <div className="min-h-screen bg-zinc-900">
      <Header />
      <h1 className="text-gray-300 text-7xl text-center font-bold mt-10">
        predb
      </h1>
      <p className="text-gray-300 text-center pt-4">just another predb site.</p>
      <div className="flex flex-col items-center p-10">
        <p className="text-gray-300 text-3xl break-all text-center font-semibold">
          {slug}
        </p>
        <div className="text-gray-300 p-2 mt-2 text-lg flex items-center flex-col">
          {loading ? (
            <></>
          ) : (
            <p>
              Pred: <b>{time}</b>
            </p>
          )}

          <p>
            Group:{" "}
            <Link
              href={{
                pathname: "/",
                query: { type: "group", q: preData["result"][0].preGroup },
              }}
            >
              <a>
                <Tag
                  variant="outline"
                  color={"whiteAlpha.800"}
                  colorScheme="whiteAlpha"
                  size={"md"}
                >
                  {preData["result"][0].preGroup}
                </Tag>
              </a>
            </Link>
          </p>
          <p>
            Section:{" "}
            <Link
              href={{
                pathname: "/",
                query: { type: "cat", q: preData["result"][0].preCategory },
              }}
            >
              <a>
                <Tag
                  variant="outline"
                  color={"whiteAlpha.800"}
                  colorScheme="whiteAlpha"
                  size={"md"}
                >
                  {preData["result"][0].preCategory}
                </Tag>
              </a>
            </Link>
          </p>
          <p>
            Files: <b>{srrData["files"]?.length || "null"}</b>
          </p>
        </div>
        <a
          className="bg-zinc-800 text-gray-300 rounded-md p-3 mt-8 text-3xl hover:opacity-70"
          href={nfoImage}
          target="_blank"
          rel="noopener noreferrer"
        >
          NFO
        </a>
      </div>
      <div>
        {srrData.length == 0 ? (
          <></>
        ) : (
          <TableContainer className="pl-10 pr-10 mb-4">
            <Table variant="unstyled" color={"whiteAlpha.800"}>
              <Thead>
                <Tr className="bg-zinc-800 text-gray-400 rounded-md p-2">
                  <Th>name</Th>
                  <Th>size</Th>
                  <Th>crc</Th>
                </Tr>
              </Thead>
              <Tbody>{srrFiles}</Tbody>
            </Table>
          </TableContainer>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Release;
