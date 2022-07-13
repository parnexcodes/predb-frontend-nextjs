import React from "react";
import { useRouter } from "next/router";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

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

export async function getServerSideProps(context) {
  let { slug } = context.query
  const [nfoRes, srrRes] = await Promise.all([
    fetch(`https://corsproxy.io/?https://api.srrdb.com/v1/nfo/${slug}`),
    fetch(`https://corsproxy.io/?https://api.srrdb.com/v1/details/${slug}`)
  ])

  const [nfoData, srrData] = await Promise.all([
    nfoRes.json(),
    srrRes.json()
  ])

  return {
    props: {
      nfoData, srrData
    }
  }
}

function Release({ nfoData, srrData }) {
  const router = useRouter();
  const { slug } = router.query;

  let nfoLink = nfoData['nfolink'][0]?.replace('api.', '')
  let nfoImage = `https://cable.ayra.ch/nfo/?url=${nfoLink}`
  console.log(nfoImage)

  let srrFiles = srrData['files']?.map((element, index) => {
    return (
      <Tr className="hover:bg-zinc-800" key={element.id}>
        <Td>{element.name}</Td>
        <Td>{element.size}</Td>
        <Td>{element.crc}</Td>
      </Tr>
    );
  });

  return (
    <div className="min-h-screen bg-zinc-900">
      <Header />
      <h1 className="text-gray-300 text-7xl text-center font-bold mt-10">
        predb
      </h1>
      <p className="text-gray-300 text-center pt-4">just another predb site.</p>
      <div className="flex flex-col items-center p-10">
        <p className="text-gray-300 text-3xl">{slug}</p>
        <a className="bg-zinc-800 text-gray-300 rounded-md p-3 mt-8 text-3xl hover:opacity-70" href={nfoImage} target="_blank" rel="noopener noreferrer">NFO</a>
      </div>
      <div>
      <TableContainer className="p-10">
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
    </div>
    </div>
  );
}

export default Release;
