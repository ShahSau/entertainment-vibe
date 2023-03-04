import { Badge } from "@material-ui/core";
import { img_300, unavailable } from "../../config/config";
import ContentModal from "../ContentModal/ContentModal";
import styled from "styled-components";

const SingleContent = ({
  id,
  poster,
  title,
  date,
  media_type,
  vote_average,
}) => {
  return (
    <SingleStyled>
      <ContentModal media_type={media_type} id={id}>
        <Badge
          badgeContent={vote_average}
          color={
            vote_average < 4
              ? "secondary"
              : vote_average < 8
              ? "error"
              : "primary"
          }
        />
        <img
          className="poster"
          src={poster ? `${img_300}${poster}` : unavailable}
          alt={title}
        />
        <span className="click">Click on card for details</span>
        <b className="title">{title}</b>
        <span className="subTitle">
          {media_type === "tv" ? "TV Series" : "Movie"}
          <span className="subTitle">{date}</span>
        </span>
      </ContentModal>
    </SingleStyled>
  );
};
const SingleStyled = styled.section`
  .media {
    display: flex;
    flex-direction: column;
    width: 200px;
    padding: 5px;
    margin: 5px 0;
    background-color: #282c34;
    color: #d79b6b;
    border-radius: 10px;
    position: relative;
    font-family: "Roboto", sans-serif;
  }

  .media:hover {
    background-color: #48607c;
    color: #e3d690;
    transform: scale(1.05);
    transition: transform 0.5s;
    z-index: 99;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }

  @media (max-width: 550px) {
    .media {
      width: 46%;
    }
  }

  .poster {
    border-radius: 10px;
  }

  .title {
    width: 100%;
    text-align: center;
    font-size: 17px;
    padding: 8px 0;
  }

  .subTitle {
    display: flex;
    justify-content: space-between;
    padding-bottom: 3px;
    padding: 0 2px;
    padding-bottom: 3px;
  }
`;
export default SingleContent;
