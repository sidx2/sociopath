import "./NavBar.css"
import { Navbar, Link, Text, Avatar, Dropdown, Button } from "@nextui-org/react";
import { Layout } from "./Layout.js";
import { AcmeLogo } from "./AcmeLogo.js";
import { useContext } from "react";
import { LoginContext } from "../App.js";
import Login from "../Login/Login";
import { redirect } from "react-router-dom";

import { Link as Linkk} from "react-router-dom";

export default function NavBar() {
  const [state, setState] = useContext(LoginContext)
  const handleAction = (actionKey) => {
    console.log(actionKey);
    if (actionKey.actionKey == "logout") {
      console.log("logging out..")
      localStorage.removeItem('token')
      setState({
        ...state,
        isLoggedIn: false
      })
    }
  }
  const collapseItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];

  return (
    <Layout>
      <Navbar isBordered variant="sticky">
        <Navbar.Toggle showIn="xs" />
        <Navbar.Brand
          css={{
            "@xs": {
              w: "12%",
            },
          }}
        >
          <AcmeLogo />
          <Text b color="inherit" hideIn="xs">
            Sociopath
          </Text>
        </Navbar.Brand>
        <Navbar.Content
          enableCursorHighlight
          activeColor="secondary"
          hideIn="xs"
          variant="highlight-rounded"
        >
          <Navbar.Link isActive="true" to="feed">
            {/* <Linkk to="/feed">Feed</Linkk> */}
            Feed
            </Navbar.Link>
          <Navbar.Link to="chat">
            Chat
          </Navbar.Link>
          <Navbar.Link to="about">About</Navbar.Link>
          <Navbar.Link to="contact">Contact</Navbar.Link>
        </Navbar.Content>
        <Navbar.Content
          css={{
            "@xs": {
              w: "12%",
              jc: "flex-end",
            },
          }}
        >
          {state.isLoggedIn ?
            <Dropdown placement="bottom-right">
              <Navbar.Item>
                <Dropdown.Trigger>
                  <Avatar
                    bordered
                    as="button"
                    color="secondary"
                    size="md"
                    src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                  />
                </Dropdown.Trigger>
              </Navbar.Item>
              <Dropdown.Menu
                aria-label="User menu actions"
                color="secondary"
                onAction={(actionKey) => handleAction({ actionKey })}
              >
                <Dropdown.Item key="profile" css={{ height: "$18" }}>
                  <Text b color="inherit" css={{ d: "flex" }}>
                    Signed in as
                  </Text>
                  <Text b color="inherit" css={{ d: "flex" }}>
                    zoey@example.com
                  </Text>
                </Dropdown.Item>
                <Dropdown.Item key="settings" withDivider>
                  My Settings
                </Dropdown.Item>
                <Dropdown.Item key="team_settings">Team Settings</Dropdown.Item>
                <Dropdown.Item key="analytics" withDivider>
                  Analytics
                </Dropdown.Item>
                <Dropdown.Item key="system">System</Dropdown.Item>
                <Dropdown.Item key="configurations">Configurations</Dropdown.Item>
                <Dropdown.Item key="help_and_feedback" withDivider>
                  Help & Feedback
                </Dropdown.Item>
                <Dropdown.Item onAction="logOut" key="logout" withDivider color="error">
                  Log Out
                </Dropdown.Item>
              </Dropdown.Menu>
              <redirect to="/" />
            </Dropdown>
            :
            <Login />
          }
        </Navbar.Content>
        <Navbar.Collapse>
          {collapseItems.map((item, index) => (
            <Navbar.CollapseItem
              key={item}
              activeColor="secondary"
              css={{
                color: index === collapseItems.length - 1 ? "$error" : "",
              }}
              isActive={index === 2}
            >
              <Link
                color="inherit"
                css={{
                  minWidth: "100%",
                }}
                href="#"
              >
                {item}
              </Link>
            </Navbar.CollapseItem>
          ))}
        </Navbar.Collapse>
      </Navbar>
    </Layout>
  );
}
