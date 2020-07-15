import React from "react";
import { IconButton } from "@material-ui/core/";
import FacebookIcon from "@material-ui/icons/Facebook";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import TwitterIcon from "@material-ui/icons/Twitter";
import InstagramIcon from "@material-ui/icons/Instagram";
import YouTubeIcon from "@material-ui/icons/YouTube";
import PublicIcon from "@material-ui/icons/Public";
import GitHubIcon from "@material-ui/icons/GitHub";

const SocialProfile = () => {
  return (
    <div style={{ marginRight: 20 }}>
      <IconButton style={{ padding: 5 }}>
        <FacebookIcon color="primary" />
      </IconButton>
      <IconButton style={{ padding: 5 }}>
        <InstagramIcon color="secondary" />
      </IconButton>
      <IconButton style={{ padding: 5 }}>
        <TwitterIcon style={{ color: "rgb(29, 161, 242)" }} />
      </IconButton>
      <IconButton style={{ padding: 5 }}>
        <LinkedInIcon color="primary" />
      </IconButton>
      <IconButton style={{ padding: 5 }}>
        <YouTubeIcon color="secondary" />
      </IconButton>
      <IconButton style={{ padding: 5 }}>
        <GitHubIcon style={{ color: "black" }} />
      </IconButton>
      <IconButton style={{ padding: 5 }}>
        <PublicIcon color="primary" />
      </IconButton>
    </div>
  );
};

export default SocialProfile;
