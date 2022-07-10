import React from "react";
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

function PreTable({ preData, preTime }) {
  const preTableContent = preData.result.map((element, index) => {
    return (
      <Tr className="hover:bg-zinc-800" key={element.id}>
        <Td>
          <a href="">
            <Tag
              variant="outline"
              color={"whiteAlpha.800"}
              colorScheme="whiteAlpha"
              size={"sm"}
            >
              {element.preCategory}
            </Tag>
          </a>
        </Td>
        <Td>
          <a href="">
            <Tag
              variant="outline"
              color={"whiteAlpha.800"}
              colorScheme="whiteAlpha"
              size={"sm"}
            >
              {element.preGroup}
            </Tag>
          </a>
        </Td>
        <Td>{element.preTitle}</Td>
        <Td>{preTime[index]}</Td>
      </Tr>
    );
  });
  return (
    <div>
      <TableContainer className="p-10">
        <Table variant="unstyled" color={"whiteAlpha.800"}>
          <Thead>
            <Tr className="bg-zinc-800 text-gray-400 rounded-md p-2">
              <Th>Pre Category</Th>
              <Th>Pre Group</Th>
              <Th>Pre Title</Th>
              <Th>Posted On</Th>
            </Tr>
          </Thead>
          <Tbody>{preTableContent}</Tbody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default PreTable;
