import React from "react";
import { IconButton } from "@material-ui/core/";
import FacebookIcon from "@material-ui/icons/Facebook";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import TwitterIcon from "@material-ui/icons/Twitter";
import InstagramIcon from "@material-ui/icons/Instagram";
import YouTubeIcon from "@material-ui/icons/YouTube";
import PublicIcon from "@material-ui/icons/Public";
import GitHubIcon from "@material-ui/icons/GitHub";

const SocialProfile = ({ social }) => {
  if (!social) return null;
  return (
    social && (
      <div
        style={{
          marginRight: 20,
          background: "#ccc",
          borderRadius: " 5px 5px 0 0",
        }}
      >
        {social.facebook && (
          <a
            href={
              social.facebook.includes("http://") ||
              social.facebook.includes("https://")
                ? social.facebook
                : `http://${social.facebook}`
            }
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconButton style={{ padding: 5 }}>
              <FacebookIcon color="primary" />
            </IconButton>
          </a>
        )}

        {social.instagram && (
          <a
            href={
              social.instagram.includes("http://") ||
              social.instagram.includes("https://")
                ? social.instagram
                : `http://${social.instagram}`
            }
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconButton style={{ padding: 5 }}>
              <InstagramIcon color="secondary" />
            </IconButton>
          </a>
        )}

        {social.twitter && (
          <a
            href={
              social.twitter.includes("http://") ||
              social.twitter.includes("https://")
                ? social.twitter
                : `http://${social.twitter}`
            }
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconButton style={{ padding: 5 }}>
              <TwitterIcon style={{ color: "rgb(29, 161, 242)" }} />
            </IconButton>
          </a>
        )}

        {social.linkedin && (
          <a
            href={
              social.linkedin.includes("http://") ||
              social.linkedin.includes("https://")
                ? social.linkedin
                : `http://${social.linkedin}`
            }
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconButton style={{ padding: 5 }}>
              <LinkedInIcon color="primary" />
            </IconButton>
          </a>
        )}
        {social.youtube && (
          <a
            href={
              social.youtube.includes("http://") ||
              social.youtube.includes("https://")
                ? social.youtube
                : `http://${social.youtube}`
            }
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconButton style={{ padding: 5 }}>
              <YouTubeIcon color="secondary" />
            </IconButton>
          </a>
        )}

        {social.githup && (
          <a
            href={
              social.githup.includes("http://") ||
              social.githup.includes("https://")
                ? social.githup
                : `http://${social.githup}`
            }
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconButton style={{ padding: 5 }}>
              <GitHubIcon style={{ color: "black" }} />
            </IconButton>
          </a>
        )}

        {social.website && (
          <a
            href={
              social.website.includes("http://") ||
              social.website.includes("https://")
                ? social.website
                : `http://${social.website}`
            }
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            <IconButton style={{ padding: 5 }}>
              <PublicIcon color="primary" />
            </IconButton>
          </a>
        )}
      </div>
    )
  );
};

export default SocialProfile;
