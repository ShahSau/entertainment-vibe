import {
  Button,
  createMuiTheme,
  Tab,
  Tabs,
  TextField,
  ThemeProvider,
} from "@material-ui/core";

import SearchIcon from "@material-ui/icons/Search";
import { useEffect, useState } from "react";
import axios from "axios";
import CustomPagination from "../../components/Pagination/CustomPagination";
import SingleContent from "../../components/SingleContent/SingleContent";
import styled from "styled-components";

const Search = () => {
  const [type, setType] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();
  const [noContent, setNoContent] = useState(0);

  const darkTheme = createMuiTheme({
    palette: {
      type: "dark",
      primary: {
        main: "#2A253B",
      },
    },
  });

  const fetchSearch = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/${
          type ? "tv" : "movie"
        }?api_key=8b76bd7b8f613edcfdc16ba9318a2cfa&language=en-US&query=${searchText}&page=${page}&include_adult=false`
      );
      setContent(data.results);
      setNumOfPages(data.total_pages);
      setNoContent(1);
      // console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchSearch();
    // eslint-disable-next-line
  }, [type, page]);

  return (
    <SearchPageStyled>
      <div>
        <ThemeProvider theme={darkTheme}>
          <div className="search">
            <TextField
              style={{ flex: 1 }}
              className="searchBox"
              label="Search"
              variant="filled"
              color="#000"
              onChange={(e) => setSearchText(e.target.value)}
            />
            <Button
              onClick={fetchSearch}
              variant="contained"
              style={{ marginLeft: 10 }}
            >
              <SearchIcon fontSize="large" />
            </Button>
          </div>
          <Tabs
            value={type}
            indicatorColor="primary"
            onChange={(event, newValue) => {
              setType(newValue);
              setPage(1);
            }}
            style={{ paddingBottom: 5 }}
            aria-label="disabled tabs example"
          >
            <Tab style={{ width: "50%" }} label="Search Movies" />
            <Tab style={{ width: "50%" }} label="Search TV Series" />
          </Tabs>
        </ThemeProvider>
        <div className="trending">
          {content &&
            content.map((c) => (
              <SingleContent
                key={c.id}
                id={c.id}
                poster={c.poster_path}
                title={c.title || c.name}
                date={c.first_air_date || c.release_date}
                media_type={type ? "tv" : "movie"}
                vote_average={c.vote_average}
              />
            ))}
          {console.log(searchText)}
          {searchText &&
            noContent === 1 &&
            content.length === 0 &&
            (type ? (
              <h2>Oops! No Series Found</h2>
            ) : (
              <h2>Oops! No Movies Found</h2>
            ))}
        </div>
        {numOfPages > 1 && (
          <CustomPagination setPage={setPage} numOfPages={numOfPages} />
        )}
      </div>
    </SearchPageStyled>
  );
};

const SearchPageStyled = styled.section`
  .search {
    display: flex;
    margin: 15px 0;
    color: #000 !important;
  }
  .trending {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    font-family: "Roboto", sans-serif;
  }
  .searchBox {
    // background-color:#E3D690;
    color: #000 !important;
    font-weight: bolder;
  }
`;
export default Search;
