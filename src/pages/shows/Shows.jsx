import {
    Box,
    Container,
    Flex,
    Grid,
    Heading,
    Hide,
    Select,
    Skeleton,
    Spacer,
    Show,
    Center,
  } from "@chakra-ui/react";
  import { useEffect, useState } from "react";
  import { fetchTvSeries, fetchGenres } from "../../services/api";
  import CardComponent from "../../components/CardComponent";
  import PaginationComponent from "../../components/PaginationComponent";
  
  const Shows = () => {
    const [shows, setShows] = useState([]);
    const [activePage, setActivePage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [sortBy, setSortBy] = useState("popularity.desc");
    const [isLoading, setIsLoading] = useState(true);
    const [genres, setGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState("");

    useEffect(() => {
      setIsLoading(true);
      fetchTvSeries(activePage, sortBy, selectedGenre)
        .then((res) => {

          setShows(res?.results);
          setActivePage(res?.page);
          setTotalPages(res?.total_pages);
        })
        .catch((err) => console.log(err, "err"))
        .finally(() => setIsLoading(false));
    }, [activePage, sortBy, selectedGenre]);

    useEffect(() => {
        fetchGenres("tv")
            .then((res) => {
            res.unshift({ id: "1", name: "All" });
            setGenres(res);
            })
            .catch((err) => console.log(err, "err"));
        }, []);
  
    return (
      <Container maxW={"container.xl"}>
        <Flex  display={{ md: 'flex' }}>
            <Box p="4">
            <Flex alignItems={"baseline"} gap={"4"} my="2">
                <Heading as="h2" fontSize={"md"} textTransform={"uppercase"}>
                    Discover TV Shows
                </Heading>
                <Select
                    w={"130px"}
                    onChange={(e) => {
                    setActivePage(1);
                    setSortBy(e.target.value);
                    }}
                >
                    <option value="popularity.desc">Popular</option>
                    <option value="vote_average.desc&vote_count.gte=1000">
                    Top Rated
                    </option>
                </Select>
            </Flex>
            </Box>
            <Spacer />
            <Hide below='md'>
                <Box p="4">
                    <Flex alignItems={"baseline"} gap={"4"} my="2">
                        <Heading as="h2" fontSize={"md"} textTransform={"uppercase"}>
                            Discover TV Shows
                        </Heading> 
                        <Select
                            w={"130px"}
                            onChange={(e) => {
                                setActivePage(1);
                                if (e.target.selectedOptions[0].value === "1") {
                                    setSelectedGenre("");
                                }
                                else {
                                    setSelectedGenre(e.target.selectedOptions[0].value);
                                }
                            }}
                        >
                            {genres?.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </Select>
                    </Flex>
                </Box>
            </Hide>
        </Flex>

        <Show below='md'>
            <Box p="4">
                <Flex alignItems={"baseline"} gap={""} my="2">
                    <Heading as="h2" fontSize={"md"} textTransform={"uppercase"}>
                        Discover TV Shows
                    </Heading> 
                    <Select
                        w={"130px"}
                        onChange={(e) => {
                            setActivePage(1);
                            if (e.target.selectedOptions[0].value === "1") {
                                setSelectedGenre("");
                            }
                            else {
                                setSelectedGenre(e.target.selectedOptions[0].value);
                            }
                        }}
                    >
                        {genres?.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.name}
                            </option>
                        ))}
                    </Select>
                </Flex>
            </Box>
        </Show>

  
        <Grid
          templateColumns={{
            base: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(4, 1fr)",
            lg: "repeat(5, 1fr)",
          }}
          gap={"4"}
        >
          {shows &&
            shows?.map((item, i) =>
              isLoading ? (
                <Skeleton height={300} key={i} />
              ) : (
                <CardComponent key={item?.id} item={item} type={"tv"} />
              )
            )}
        </Grid>
        <Center>
            <PaginationComponent
            activePage={activePage}
            totalPages={totalPages}
            setActivePage={setActivePage}
            />
        </Center>
      </Container>
    );
  };
  
  export default Shows;