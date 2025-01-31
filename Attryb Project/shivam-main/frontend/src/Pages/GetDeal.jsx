import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteMyDealFun, getMyDealFun } from "../Redux/marketplaceReducer/action";
import { 
  Box, Button, HStack, Image, Table, TableContainer, 
  Tbody, Td, Text, Th, Thead, Tr, useToast, DarkMode 
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import logo from "../assest/sammy.gif";

const MyDeals = () => {
  const dispatch = useDispatch();
  const toast = useToast();

  const { myData, isLoading, isError } = useSelector(
    (state) => state.marketplaceReducer
  );

  const removeDeal = (id) => {
    dispatch(deleteMyDealFun(id)).then(() => {
      toast({
        title: "Deal successfully removed",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      dispatch(getMyDealFun());
    });
  };

  useEffect(() => {
    dispatch(getMyDealFun());
  }, [dispatch]);

  if (isLoading) {
    return (
      <Image
        src="https://cdn.dribbble.com/users/543574/screenshots/4824123/ezgif.com-video-to-gif.gif"
        alt="Loading..."
        m="auto"
        pt="90px"
        mb="360px"
      />
    );
  }

  if (isError) {
    return (
      <Image
        src="https://tse3.mm.bing.net/th?id=OIP.UR9mmwtD7RltXtpdFxHE2wHaDq&pid=Api&P=0&h=180"
        alt="Error occurred"
        m="auto"
        pt="30px"
      />
    );
  }

  return (
    <DarkMode>
      <Box pt="100px" h="100vh">
        <HStack m="20px" ml="70%" spacing={8}>
          <Box w="50%">
            <Image src={logo} borderRadius={10} w="100%" />
          </Box>
          <Link to="/adddeal">
            <Button colorScheme="yellow">Create Deal</Button>
          </Link>
          <Link to="/oem">
            <Button colorScheme="yellow">OEM Info</Button>
          </Link>
        </HStack>

        <TableContainer>
          <Table variant="simple" size="sm">
            <Thead>
              <Tr>
                <Th>#</Th>
                <Th>Image</Th>
                <Th>Details</Th>
                <Th>Edit</Th>
                <Th>Delete</Th>
              </Tr>
            </Thead>
            <Tbody>
              {myData?.map((item, index) => (
                <Tr key={index}>
                  <Td>{index + 1}</Td>
                  <Td>
                    <Image src={item.imageURL} alt={item.title} w="100px" />
                  </Td>
                  <Td>
                    <Text mb={2} color="gray.300">Manufacturer: {item.manufacturer}</Text>
                    <Text mb={2} color="gray.400">Title: {item.title}</Text>
                    <Text mb={2} color="gray.500">Model: {item.model}</Text>
                  </Td>
                  <Td>
                    <Link to={`/editDeal/${item._id}`}>
                      <Button colorScheme="green">
                        <EditIcon />
                      </Button>
                    </Link>
                  </Td>
                  <Td>
                    <Button colorScheme="red" onClick={() => removeDeal(item._id)}>
                      <DeleteIcon />
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </DarkMode>
  );
};

export default MyDeals;