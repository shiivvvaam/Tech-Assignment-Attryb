import {
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  Image,
  Input,
  Select,
  SimpleGrid,
  Text,
  VStack,
  Flex,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getColorDealFun,
  getDealFun,
  getMileageDealFun,
  getPriceDealFun,
  getSearchDealFun,
} from "../Redux/marketplaceReducer/action";
import { Link } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const { marketData, isLoading, isError } = useSelector(
    (store) => store.marketplaceReducer
  );

  useEffect(() => {
    dispatch(getDealFun());
  }, []);

  return (
    <Box p={8} maxW="1200px" mx="auto">
      <Heading textAlign="center" mb={8} color="blue.600">
        Explore Deals
      </Heading>
      <Flex wrap="wrap" gap={4} justifyContent="center" mb={6}>
        <FormControl w={"200px"}>
          <Select placeholder="Sort by Price" onChange={(e) => dispatch(getPriceDealFun(e.target.value))}>
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </Select>
        </FormControl>
        <FormControl w={"200px"}>
          <Select placeholder="Sort by Mileage" onChange={(e) => dispatch(getMileageDealFun(e.target.value))}>
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </Select>
        </FormControl>
        <FormControl w={"200px"}>
          <Select placeholder="Filter by Color" onChange={(e) => dispatch(getColorDealFun(e.target.value))}>
            {['Red', 'Black', 'Silver', 'Blue', 'White', 'Yellow', 'Green'].map(color => (
              <option key={color} value={color.toLowerCase()}>{color}</option>
            ))}
          </Select>
        </FormControl>
        <FormControl w={"250px"}>
          <Input placeholder="Search Car" onChange={(e) => dispatch(getSearchDealFun(e.target.value))} />
        </FormControl>
        <Button colorScheme="red" onClick={() => dispatch(getDealFun())}>
          Reset Filters
        </Button>
      </Flex>
      
      {isLoading ? (
        <Center>
          <Image src="https://cdn140.picsart.com/301568770156201.gif?to=min&r=640" alt="Loading" />
        </Center>
      ) : isError ? (
        <Center>
          <Text fontSize="xl" color="red.500">Something went wrong. Please try again.</Text>
        </Center>
      ) : (
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={6}>
          {marketData.map((car) => (
            <Box key={car._id} p={4} boxShadow="lg" borderRadius="lg" overflow="hidden" bg="white">
              <Image src={car.imageURL} alt={car.title} borderRadius="md" h="200px" w="100%" objectFit="cover" />
              <VStack align="start" mt={4} spacing={2}>
                <Text fontSize="lg" fontWeight="bold">{car.title}</Text>
                <Text>Model: {car.model}</Text>
                <Text>Manufacturer: {car.manufacturer}</Text>
                <Text>Year: {car.year}</Text>
                <Text>Mileage: {car.mileage} Km/L</Text>
                <Text fontWeight="bold" color="green.600">₹ {car.price} /-</Text>
                <Button as={Link} to={`/deal/${car._id}`} colorScheme="blue" size="sm" mt={2} w="full">
                  View Details
                </Button>
              </VStack>
            </Box>
          ))}
        </SimpleGrid>
      )}
      
      {marketData.length === 0 && !isLoading && (
        <Center>
          <Text fontSize="xl" color="gray.500">No results found.</Text>
        </Center>
      )}
    </Box>
  );
};

export default Home;
