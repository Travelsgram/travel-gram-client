import React from "react";
import { IconButton, Text, Image } from "@chakra-ui/react";
import { FaGithub } from "react-icons/fa";
import { VStack } from "@chakra-ui/layout";
import TravelsgramLogo from "../images/TravelsgramLogo.png"
import { Link } from "react-router-dom";

function Footer() {
  return (
    <VStack
      as="footer"
      role="contentinfo"
      py={{ base: "8", md: "8" }}
      w="100%"
      bg="gray.100"
      alignItems="center"
      justifyContent="center"
    >
      <Text spacing={{ base: "4", md: "5" }}>

        <Link to="/"> <Image src={TravelsgramLogo} left="2.5rem" pos="relative" /> </Link>

        <Text fontSize="sm" color="subtle">
          &copy; {new Date().getFullYear()} Created by Travelsgram Team
        </Text>

        <Text fontSize="sm" color="subtle">
         
          Tuna Erkmen
          <IconButton
            as="a"
            href="https://github.com/TunaErkmen.com/Travelsgram"
            aria-label="GitHub"
            icon={<FaGithub fontSize="1.25rem" />}
            variant="ghost"
          />
          Hristos Pappas
          <IconButton
            as="a"
            href="https://github.com/hristosppp"
            aria-label="GitHub"
            icon={<FaGithub fontSize="1.25rem" />}
            variant="ghost"
          />
        </Text>
      </Text>
    </VStack>
  );
}

export default Footer;
