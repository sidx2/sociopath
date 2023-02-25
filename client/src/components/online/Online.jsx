import "./online.css";

export default function Online({state}) {
  // const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <li className="rightbarFriend">
      <div className="rightbarProfileImgContainer">
        <img className="rightbarProfileImg"  alt="" />
        <span className="rightbarOnline"></span>
      </div>
      <span className="rightbarUsername">{state.username}</span>
    </li>
  );
}
