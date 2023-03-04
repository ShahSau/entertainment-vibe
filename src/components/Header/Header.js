import styled from "styled-components";
const Header = () => {
  return (
    <HeaderStyled>
      <span onClick={() => window.scroll(0, 0)} className="header">
        Entertainment Hive
      </span>
    </HeaderStyled>
  );
};
const HeaderStyled = styled.section`
  .header {
    width: 100%;
    cursor: pointer;
    position: fixed;
    display: flex;
    justify-content: center;
    text-transform: uppercase;
    background-color: #2d313a;
    font-family: "Roboto", sans-serif;
    font-size: 2.5vw;
    padding-bottom: 15px;
    box-shadow: 0px 1px 5px black;
    // color: white;
    z-index: 100;
    // color:#D79B6B;
    color: #d96452;
  }

  @media (max-width: 1000px) {
    .header {
      padding-top: 15px;
      font-size: 6.4vw;
    }
  }
`;
export default Header;
