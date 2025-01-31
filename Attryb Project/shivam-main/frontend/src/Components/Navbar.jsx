import {
  Avatar,
  Image,
  Box,
  Button,
  Flex,
  Heading,
  Tooltip,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SignoutFun } from "../Redux/authReducer/action";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import logo from "../assest/car.png";

const Navbar = () => {
  const { isAuth } = useSelector((store) => store.authReducer);
  const { colorMode, toggleColorMode } = useColorMode();
  const dealerName = localStorage.getItem("dealerName");
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(SignoutFun());
  };

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding={4}
      bg={colorMode === "light" ? "gray.100" : "gray.900"}
      boxShadow="md"
    >
      {/* Logo Section */}
      <Flex align="center">
        <Link to="/">
          <Image src={logo} alt="Logo" boxSize="50px" borderRadius="full" />
        </Link>
        <Heading ml={3} fontSize={{ base: "lg", md: "xl" }} color="yellow.500">
          UsedCars
        </Heading>
      </Flex>

      {/* Navigation Links */}
      <Flex gap={5} align="center">
        <Link to="/getdeal">
          <Button variant="ghost" colorScheme="blue">
            Dealers
          </Button>
        </Link>
        {!isAuth ? (
          <>
            <Link to="/signup">
              <Button colorScheme="green" variant="solid">
                Sign Up
              </Button>
            </Link>
            <Link to="/signin">
              <Button colorScheme="blue" variant="outline">
                Sign In
              </Button>
            </Link>
          </>
        ) : (
          <>
            <Tooltip label={dealerName} bg="gray.300" color="black">
              <Avatar name={dealerName} size="sm" />
            </Tooltip>
            <Button colorScheme="red" onClick={handleLogout}>
              Sign Out
            </Button>
          </>
        )}

        {/* Dark Mode Toggle */}
        <Button onClick={toggleColorMode} variant="ghost">
          {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        </Button>
      </Flex>
    </Flex>
  );
};

export default Navbar;