import React, { useContext, useState } from "react";
import { Modal, Row, Checkbox, Button, Text, Input } from "@nextui-org/react";
import axios from "axios"
import {LoginContext} from "./App"

export default function PostModal() {
  const [visible, setVisible] = React.useState(false);
  const [state, setState] = useContext(LoginContext)
  const [newPost, setNewPost] = useState({
    desc: "",
    img: ""
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("desc", newPost.desc)
    formData.append("img", newPost.img)
    formData.append("userId", state._id)
    formData.append("username", state.username)
    
    console.log("newPost", newPost)
    const res = await axios.post("http://localhost:8800/api/posts", formData)
    console.log("new post sent: ", res)
  }
  const handler = () => setVisible(true);
  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };
  return (
    <div>
      <Button auto color="warning" shadow onPress={handler}>
        Upload
      </Button>
      <Modal
        closeButton
        blur
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Upload a new post
          </Text>
        </Modal.Header>
        <Modal.Body>

          <form onSubmit={handleSubmit} encType='multipart/form-data'>

            <Input
              rounded
              bordered
              label="Description"
              name="desc"
              placeholder="Hey folks! Check this out"
              color="default"
              onChange={(e) => setNewPost({
                ...newPost,
                desc: e.target.value
              })}
            />
            <br />
            Image/video
            <input
              type="file"
              label="Image/Video"
              accept=".png, .jpg, .jpeg"
              name="image"
              placeholder="Hey folks! Check this out"
              onChange={(e) => setNewPost({
                ...newPost,
                img: e.target.files[0]
              })}
            />
            
          <Button auto type="submit" onPress={closeHandler}>
            Upload
          </Button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onPress={closeHandler}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
