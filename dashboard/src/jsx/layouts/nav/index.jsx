import { Fragment, useState } from "react";
import NavHader from "./NavHader";
import ChatBox from "../ChatBox";
import SideBar from "./SideBar";
import Header from "./header";

const Nav = ({ title, onClick: ClickToAddEvent }) => {
    const [toggle, setToggle] = useState("");
    const onClick = (name) => setToggle(toggle === name ? "" : name);
    return (
        <Fragment>
            <NavHader />
            <ChatBox
                onClick={() => onClick("chatbox")} toggle={toggle}
            />
            <Header
                onNote={() => onClick("chatbox")}
                onNotification={() => onClick("notification")}
                onProfile={() => onClick("profile")}
                toggle={toggle}
                title={title}
                onBox={() => onClick("box")}
                onClick={() => ClickToAddEvent()}
            />
            <SideBar />
        </Fragment>
    );
};
export default Nav;
