import { Card, Col, Row, Button, Text, styled, Badge } from "@nextui-org/react";
import axios from "axios";
import { useContext } from "react";
import { LoginContext } from "./App";

const PostCard = (props) => {
  const [state, setState] = useContext(LoginContext)
  const StyledButton = styled("button", {
    background: "transparent",
    border: "none",
    cursor: "pointer",
    '&:active': {
      opacity: 0.8,
    }
  });
  const handleLike = async () => {
    console.log(props.data._id)
    axios.put(`http://localhost:8800/api/posts/${props.data._id}/like`, {userId: state._id})
  }

  return (
    <Card css={{ w: "75%", h: "500px" }}>
      <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
        <Col>
          <Text h3 color="black">
            {props.data.username}
          </Text>
        </Col>
      </Card.Header>
      <Card.Body css={{ p: 0 }}>
        <Card.Image
          src={`http://localhost:8800/images/${props.data.img}`}
          width="100%"
          height="100%"
          objectFit="cover"
          alt="Card example background"
        />
      </Card.Body>
      <Card.Footer
        isBlurred
        css={{
          position: "absolute",
          bgBlur: "#ffffff66",
          borderTop: "$borderWeights$light solid rgba(255, 255, 255, 0.2)",
          bottom: 0,
          zIndex: 1,
        }}
      >
        <Row>
          <Col>
            <Text color="#000" size={12}>
              {props.data.updatedAt}
            </Text>
            <Text color="#000" size={12}>
              {props.data.desc}
            </Text>
          </Col>
          <Col>
            <Row justify="flex-end">
              <StyledButton aria-label="more than 99 notifications">
                <Badge color="error" content={props.data.likes.length} shape="circle">

                  <Button flat auto rounded color="secondary">
                    <Text
                      css={{ color: "inherit" }}
                      size={12}
                      weight="bold"
                      transform="uppercase"
                      onClick={handleLike}
                    >
                      Like
                    </Text>
                  </Button>
                </Badge>
              </StyledButton>
            </Row>
          </Col>
        </Row>
      </Card.Footer>
    </Card>
  );
}

export default PostCard