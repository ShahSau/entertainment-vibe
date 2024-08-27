
import {  Flex, IconButton, Text, Tooltip } from "@chakra-ui/react";
import PropTypes from "prop-types";
import {
  ArrowRightIcon,
  ArrowLeftIcon,
  ChevronRightIcon,
  ChevronLeftIcon
} from "@chakra-ui/icons";
const PaginationComponent = ({ activePage, totalPages, setActivePage }) => {
  return (
    <Flex justifyContent="space-between" m={2} alignItems="center">
      <Flex>
        <Tooltip label="First Page">
            <IconButton
              onClick={() => setActivePage(1)}
              isDisabled={activePage === 1}
              icon={<ArrowLeftIcon h={3} w={3} />}
              aria-label="First Page"
              color={"white"}
            />
        </Tooltip>
        <Tooltip label="Previous Page">
            <IconButton
              onClick={() => setActivePage(activePage - 1)}
              isDisabled={activePage === 1}
              icon={<ChevronLeftIcon h={6} w={6} />}
              aria-label="Previous Page"
              color={"white"}
            />
        </Tooltip>
      </Flex>

      <Flex alignItems="center">
        <Text flexShrink="0" m={8}>
          Page{" "}
          <Text as="span" fontWeight="bold">
            {activePage}
          </Text>{" "}
          of{" "}
          <Text as="span" fontWeight="bold">
            {totalPages}
          </Text>
        </Text>
      </Flex>

      <Flex>
        <Tooltip label="Next Page">
            <IconButton
              onClick={() => setActivePage(activePage + 1)}
              isDisabled={activePage === totalPages}
              icon={<ChevronRightIcon h={6} w={6} />}
              aria-label="Next Page"
              color={"white"}
            />
        </Tooltip>
        <Tooltip label="Last Page">
            <IconButton
              onClick={() => setActivePage(totalPages)}
              isDisabled={activePage === totalPages}
              icon={<ArrowRightIcon h={3} w={3} />}
              aria-label="Last Page"
              color={"white"}
            />
        </Tooltip>
      </Flex>
    </Flex>
  );
};

PaginationComponent.propTypes = {
  activePage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  setActivePage: PropTypes.func.isRequired
};

export default PaginationComponent;
