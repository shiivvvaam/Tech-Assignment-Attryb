import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  useToast,
  Image
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SignupFun } from "../Redux/authReducer/action";
import { Link } from "react-router-dom";
import logo from "../assest/face.gif";

const Signup = () => {
  const toast = useToast();
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSignup = (e) => {
    setForm((prev) => {
      return { ...form, [e.target.name]: e.target.value };
    });
  };

  const handleFormSubmission = (e) => {
    e.preventDefault();
    dispatch(SignupFun(form)).then(() => {
      const message = localStorage.getItem("signupMsg");

      if (message === "New dealer has been registered") {
        toast({
          title: "Signup Success!",
          description: "We've created your account for you.",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Error creating account",
          description: "Something Went Wrong.",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }

      localStorage.removeItem("signupMsg");
    });
  };

  return (
    <Box display="flex" width="100%" mt={30}>
      <Box width="30%">
        <Image src={logo} borderRadius={10} width="100%" />
      </Box>
      <Box width="70%">
        <form
          onSubmit={handleFormSubmission}
          style={{
            width: "50%",
            margin: "auto",
            padding: "40px",
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
            marginTop: "100px",
            borderRadius: "20px",
          }}
        >
          <Heading>Signup Form</Heading>
          <br />
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input
              name="name"
              type="text"
              value={form.name}
              onChange={handleSignup}
              placeholder="Your Name"
            />
          </FormControl>
          <br />
          <FormControl>
            <FormLabel>Email address</FormLabel>
            <Input
              name="email"
              type="email"
              value={form.email}
              onChange={handleSignup}
              placeholder="Your Email"
            />
          </FormControl>
          <br />
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              name="password"
              type="password"
              value={form.password}
              onChange={handleSignup}
              placeholder="Your Password"
            />
          </FormControl>
          <br />
          <Button mt={4} colorScheme="pink" type="submit" w="full">
            Signup
          </Button>
          <Stack pt={6}>
            <Text align={"center"}>
              Already a user? <Button variant={"link"} color={"blue.400"}><Link to="/signin">Signin</Link></Button>
            </Text>
          </Stack>
        </form>
      </Box>
    </Box>
  );
};

export default Signup;
