import {React, useState, useContext} from "react";
import { Modal, Button, Text, Input, Row, Checkbox } from "@nextui-org/react";
import { Mail } from "./Mail";
import { Password } from "./Password";
import { LoginContext } from "../App";
import axios from "axios";
import { redirect } from "react-router-dom";
import { useEffect } from "react";

export default function Login() {
  const [state, setState] = useContext(LoginContext)
  const [visible, setVisible] = useState(false);
  const handler = () => setVisible(true);
  
  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };

  const [em, setEm] = useState("")
  const [pw, setPw] = useState("")

  const postData = async (url = '', data = {}) => {
      
    try {
        const res = await axios.post(url, data)
        console.log(res.data)
        localStorage.setItem('token', res.data.token)
        setState({
            isLoggedIn: true,
            username: "",
            email: ""
        
          })
          redirect("/feed")
    } catch (e) {
        console.log(e)
    }
  }
  const LoginHandler = () => {
    console.log(em, pw)
        postData('http://localhost:8800/api/auth/user/login/', {
            "email": em,
            "password": pw
        })
  }
  return (
    <div>
      <Button auto shadow onPress={handler}>
        Login
      </Button>
      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Welcome to 
            <Text b size={18}>
              Sociopath
            </Text>
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Input
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Email"
            onChange={(e) => setEm(e.target.value)}
            contentLeft={<Mail fill="currentColor" />}
          />
          <Input
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Password"
            type="password"
            onChange={(e) => setPw(e.target.value)}
            contentLeft={<Password fill="currentColor" />}
          />
          <Row justify="space-between">
            <Checkbox>
              <Text size={14}>Remember me</Text>
            </Checkbox>
            <Text size={14}>Forgot password?</Text>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onPress={closeHandler}>
            Close
          </Button>
          <Button auto onPress={LoginHandler}>
            Login
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
