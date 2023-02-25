import "./closeFriend.css";

export default function CloseFriend({state}) {
  // const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <li className="sidebarFriend">
      <img className="sidebarFriendImg" src={user.profilePic} alt="" />
      <span className="sidebarFriendName">{state.username}</span>
    </li>
  );
}
