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
import { SigninFun } from "../Redux/authReducer/action";
import { Link, Navigate } from "react-router-dom";
import logo1 from "../assest/florid.gif";

const Signin = () => {
  const toast = useToast();
  const { isAuth } = useSelector((store) => store.authReducer);
  const dispatch = useDispatch();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSignup = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFormSubmission = (e) => {
    e.preventDefault();
    dispatch(SigninFun(form)).then(() => {
      const dealerName = localStorage.getItem("dealerName");
      const message = localStorage.getItem("signinMsg");
      if (message === "Login Succesfull") {
        toast({
          title: "Welcome!",
          description: `Hello, ${dealerName}`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Login Failed",
          description: "Please check your credentials.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
      localStorage.removeItem("signinMsg");
    });
  };

  if (isAuth) {
    return <Navigate to="/getdeal" />;
  }

  return (
    <Box display="flex" width="100vw" height="100vh" alignItems="center" justifyContent="center" bgGradient="linear(to-r, gray.800, gray.900)">
      <Box width={{ base: "90%", md: "50%", lg: "40%" }} p={8} bg="gray.700" borderRadius="md" boxShadow="lg" color="white">
        <Image src={logo1} borderRadius={10} width="100px" mx="auto" mb={4} />
        <Heading size="lg" textAlign="center" mb={6}>Sign In</Heading>
        <form onSubmit={handleFormSubmission}>
          <FormControl mb={4}>
            <FormLabel>Email Address</FormLabel>
            <Input name="email" type="email" value={form.email} onChange={handleSignup} placeholder="Enter your email" bg="gray.600" />
          </FormControl>
          <FormControl mb={6}>
            <FormLabel>Password</FormLabel>
            <Input name="password" type="password" value={form.password} onChange={handleSignup} placeholder="Enter your password" bg="gray.600" />
          </FormControl>
          <Button type="submit" colorScheme="blue" width="full" mb={4}>
            Sign In
          </Button>
          <Stack textAlign="center">
            <Text>
              Don't have an account? <Button variant="link" color="blue.300"><Link to="/signup">Sign Up</Link></Button>
            </Text>
          </Stack>
        </form>
      </Box>
    </Box>
  );
};

export default Signin;
