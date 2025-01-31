import React, { useEffect } from "react";
import {
  Box,
  Button,
  Heading,
  Image,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getOemFun } from "../Redux/oemReducer/action";

const Oem = () => {
  const dispatch = useDispatch();
  const { oemData, isLoading, isError } = useSelector(
    (store) => store.oemReducer
  );

  useEffect(() => {
    dispatch(getOemFun());
  }, []);

  return (
    <>
      {/* Header Section */}
      <Box paddingTop="120px" margin="20px" padding="40px" display="flex" justifyContent="space-between">
        <Heading textAlign="left">OEM Details</Heading>
        <ChakraLink as={Link} to="/getdeal">
          <Button colorScheme="orange" size="md">Go Back</Button>
        </ChakraLink>
      </Box>

      {/* Loading & Error Handling */}
      {isLoading ? (
        <Image
          src="https://i.stack.imgur.com/hzk6C.gif"
          alt="loading"
          margin="auto"
          paddingTop="90px"
          marginBottom="360px"
        />
      ) : isError ? (
        <Image
          src="https://cdn.dribbble.com/users/774806/screenshots/3823110/something-went-wrong.gif"
          alt="error"
          margin="auto"
          width="45%"
        />
      ) : (
        /* Table Section */
        <Table variant="simple" colorScheme="teal" width="90%" margin="auto" marginTop="30px">
          <Thead>
            <Tr bg="teal.500">
              <Th color="white">Title</Th>
              <Th color="white">Image</Th>
              <Th color="white">Model</Th>
              <Th color="white">Manufacturer</Th>
              <Th color="white">Year</Th>
              <Th color="white">Mileage (Km/L)</Th>
              <Th color="white">Price (₹)</Th>
              <Th color="white">Power (Kw)</Th>
              <Th color="white">Max Speed (KM/h)</Th>
              <Th color="white">Available Colors</Th>
              <Th color="white">Description</Th>
            </Tr>
          </Thead>
          <Tbody>
            {oemData?.map((el) => (
              <Tr key={el._id} _hover={{ bg: "gray.100" }}>
                <Td fontWeight="bold">{el.title}</Td>
                <Td>
                  <Image
                    src={el.imageURL}
                    alt={el.title}
                    width="100px"
                    height="80px"
                    borderRadius="8px"
                    objectFit="cover"
                    border="1px solid #ccc"
                  />
                </Td>
                <Td>{el.model}</Td>
                <Td>{el.manufacturer}</Td>
                <Td>{el.year}</Td>
                <Td>{el.mileage}</Td>
                <Td fontWeight="bold" color="green.500">₹{el.originalPrice.toLocaleString()}</Td>
                <Td>{el.power}</Td>
                <Td>{el.maxSpeed}</Td>
                <Td>
                  <Box display="flex" gap="5px">
                    {el.availableColors?.map((color, i) => (
                      <Box
                        key={i}
                        bg={color}
                        width="20px"
                        height="20px"
                        borderRadius="50%"
                        border="1px solid #333"
                      />
                    ))}
                  </Box>
                </Td>
                <Td>{el.description}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </>
  );
};

export default Oem;
