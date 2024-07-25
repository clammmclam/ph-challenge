import Avatar from "@mui/material/Avatar";
import { stringAvatar } from "../helpers";

export default function InitialsAvatar({ userName }) {
  {
    /* eslint-disable react/jsx-props-no-spreading */
  }
  return <Avatar {...stringAvatar(userName)} />;
}
