import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Image,
  Input,
  VStack,
  useDisclosure,
  useToast,
  Grid,
  GridItem,
  Card,
  CardBody,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addDealFun } from "../Redux/marketplaceReducer/action";
import { Link } from "react-router-dom";
import OemModal from "./OemModal";
import logo2 from "../assest/polar.gif";

const initialState = {
  title: "",
  manufacturer: "",
  model: "",
  imageURL: "",
  year: "",
  price: "",
  mileage: "",
  color: "",
  accidents: "",
  prevBuyers: "",
  registrationPlace: "",
};

const AddDeal = () => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const toast = useToast();
  const dispatch = useDispatch();
  const [dealForm, setDealForm] = useState(initialState);

  const handleFormChange = (e) => {
    const { name, value, type } = e.target;
    setDealForm((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(addDealFun(dealForm)).then(() => {
      let msg = localStorage.getItem("marketmsg");
      toast({
        title: msg === "New Data has been added" ? "Success" : "Error",
        description:
          msg === "New Data has been added"
            ? "Your deal has been added successfully!"
            : "Oops! Something went wrong.",
        status: msg === "New Data has been added" ? "success" : "error",
        duration: 2000,
        isClosable: true,
      });
    });
  };

  return (
    <Box bgGradient="linear(to-br, cyan.50, blue.50)" minH="100vh" py={10} px={5}>
      <Box maxW="900px" mx="auto">
        <Card boxShadow="xl" borderRadius="xl" p={8} bg="white">
          <CardBody>
            <VStack spacing={6} align="center">
              <HStack spacing={4} w="full" justify="space-between">
                <HStack>
                  <Image src={logo2} borderRadius="md" boxSize="60px" />
                  <Heading size="lg" color="cyan.700">
                    Add New Deal
                  </Heading>
                </HStack>
                <OemModal />
              </HStack>

              <form onSubmit={handleFormSubmit} style={{ width: "100%" }}>
                <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={6}>
                  <GridItem>
                    <FormControl>
                      <FormLabel>Title</FormLabel>
                      <Input
                        name="title"
                        type="text"
                        value={dealForm.title}
                        onChange={handleFormChange}
                        placeholder="Enter vehicle title"
                        focusBorderColor="indigo.400"
                      />
                    </FormControl>
                    <FormControl mt={4}>
                      <FormLabel>Manufacturer</FormLabel>
                      <Input
                        name="manufacturer"
                        type="text"
                        value={dealForm.manufacturer}
                        onChange={handleFormChange}
                        placeholder="Enter manufacturer"
                        focusBorderColor="indigo.400"
                      />
                    </FormControl>
                    <FormControl mt={4}>
                      <FormLabel>Model No.</FormLabel>
                      <Input
                        name="model"
                        type="text"
                        value={dealForm.model}
                        onChange={handleFormChange}
                        placeholder="Enter model number"
                        focusBorderColor="indigo.400"
                      />
                    </FormControl>
                    <FormControl mt={4}>
                      <FormLabel>Year</FormLabel>
                      <Input
                        name="year"
                        type="number"
                        value={dealForm.year}
                        onChange={handleFormChange}
                        placeholder="Enter manufacture year"
                        focusBorderColor="indigo.400"
                      />
                    </FormControl>
                    <FormControl mt={4}>
                      <FormLabel>Image URL</FormLabel>
                      <Input
                        name="imageURL"
                        type="url"
                        value={dealForm.imageURL}
                        onChange={handleFormChange}
                        placeholder="Enter image URL"
                        focusBorderColor="indigo.400"
                      />
                    </FormControl>
                    <FormControl mt={4}>
                      <FormLabel>Price</FormLabel>
                      <Input
                        name="price"
                        type="number"
                        value={dealForm.price}
                        onChange={handleFormChange}
                        placeholder="Enter price"
                        focusBorderColor="indigo.400"
                      />
                    </FormControl>
                  </GridItem>

                  <GridItem>
                    <FormControl>
                      <FormLabel>Mileage</FormLabel>
                      <Input
                        name="mileage"
                        type="number"
                        value={dealForm.mileage}
                        onChange={handleFormChange}
                        placeholder="Enter mileage"
                        focusBorderColor="indigo.400"
                      />
                    </FormControl>
                    <FormControl mt={4}>
                      <FormLabel>Color</FormLabel>
                      <Input
                        name="color"
                        type="text"
                        value={dealForm.color}
                        onChange={handleFormChange}
                        placeholder="Enter color"
                        focusBorderColor="indigo.400"
                      />
                    </FormControl>
                    <FormControl mt={4}>
                      <FormLabel>Accidents</FormLabel>
                      <Input
                        name="accidents"
                        type="number"
                        value={dealForm.accidents}
                        onChange={handleFormChange}
                        placeholder="Enter accident count"
                        focusBorderColor="indigo.400"
                      />
                    </FormControl>
                    <FormControl mt={4}>
                      <FormLabel>Previous Owners</FormLabel>
                      <Input
                        name="prevBuyers"
                        type="number"
                        value={dealForm.prevBuyers}
                        onChange={handleFormChange}
                        placeholder="Enter previous owner count"
                        focusBorderColor="indigo.400"
                      />
                    </FormControl>
                    <FormControl mt={4}>
                      <FormLabel>Registration Place</FormLabel>
                      <Input
                        name="registrationPlace"
                        type="text"
                        value={dealForm.registrationPlace}
                        onChange={handleFormChange}
                        placeholder="Enter registration place"
                        focusBorderColor="indigo.400"
                      />
                    </FormControl>
                    <Button mt={6} colorScheme="cyan" type="submit" w="full">
                      ADD DEAL
                    </Button>
                  </GridItem>
                </Grid>
              </form>
            </VStack>
          </CardBody>
        </Card>

        <Box textAlign="center" mt={6}>
          <Link to="/getdeal">
            <Button bg="cyan.600" color="white" _hover={{ bg: "cyan.700" }}>
              Go Back
            </Button>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default AddDeal;
