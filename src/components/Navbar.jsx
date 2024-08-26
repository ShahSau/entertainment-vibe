
import {
    Box,
    Container,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    Flex,
    IconButton,
    useDisclosure,
  } from "@chakra-ui/react";
  import { Link } from "react-router-dom";
  import { HamburgerIcon, SearchIcon } from "@chakra-ui/icons";
  
  const Navbar = () => {
    const { onOpen, isOpen, onClose } = useDisclosure();
  
  
    return (
      <Box py="4" mb="2">
        <Container maxW={"container.xl"}>
          <Flex justifyContent={"space-between"}>
            <Link to="/">
              <Box
                fontSize={"2xl"}
                fontWeight={"bold"}
                color={"red"}
                letterSpacing={"widest"}
                fontFamily={"mono"}
              >
                Entertainment Vibe
              </Box>
            </Link>
  
            {/* DESKTOP */}
            <Flex
              gap="4"
              alignItems={"center"}
              display={{ base: "none", md: "flex" }}
            >
              <Link to="/">Home</Link>
              <Link to="/movies">Movies</Link>
              <Link to="/shows">TV Shows</Link>
              <Link to="/search">
                <SearchIcon fontSize={"xl"} />
              </Link>

            </Flex>
  
            {/* Mobile */}
            <Flex
              display={{ base: "flex", md: "none" }}
              alignItems={"center"}
              gap="4"
            >
              <Link to="/search">
                <SearchIcon fontSize={"xl"} />
              </Link>
              <IconButton onClick={onOpen} icon={<HamburgerIcon />} />
              <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
                <DrawerOverlay />
                <DrawerContent bg={"black"}>
                  <DrawerCloseButton />
                  <DrawerHeader>
                    
                  </DrawerHeader>
  
                  <DrawerBody>
                    <Flex flexDirection={"column"} gap={"4"} onClick={onClose}>
                      <Link to="/">Home</Link>
                      <Link to="/movies">Movies</Link>
                      <Link to="/shows">TV Shows</Link>
                      
                    </Flex>
                  </DrawerBody>
                </DrawerContent>
              </Drawer>
            </Flex>
          </Flex>
        </Container>
      </Box>
    );
  };
  
  export default Navbar;
  