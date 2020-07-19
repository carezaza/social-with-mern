import React from "react";
// import * as yup from "yup";
// import { yupResolver } from "@hookform/resolvers";
import {
  CardActions,
  CardContent,
  Button,
  TextField,
  Typography,
} from "@material-ui/core/";
import { useForm } from "react-hook-form";
import FacebookIcon from "@material-ui/icons/Facebook";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import TwitterIcon from "@material-ui/icons/Twitter";
import InstagramIcon from "@material-ui/icons/Instagram";
import YouTubeIcon from "@material-ui/icons/YouTube";
import PublicIcon from "@material-ui/icons/Public";
import GitHubIcon from "@material-ui/icons/GitHub";
import { connect } from "react-redux";
import { EditSocialStart } from "../../redux/profile/profile.actions";

// const SocialSchema = yup.object().shape({
//   facebook: yup.string().url("Invalid URL. URL should be http://yoursite.com"),
//   instagram: yup.string().url("Invalid URL. URL should be http://yoursite.com"),
//   twitter: yup.string().url("Invalid URL. URL should be http://yoursite.com"),
//   linkedin: yup.string().url("Invalid URL. URL should be http://yoursite.com"),
//   youtube: yup.string().url("Invalid URL. URL should be http://yoursite.com"),
//   githup: yup.string().url("Invalid URL. URL should be http://yoursite.com"),
//   website: yup.string().url("Invalid URL. URL should be http://yoursite.com"),
// });

const EditSocial = ({
  handleClose,
  social,
  EditSocialStart,
  isPending,
}) => {
  const { handleSubmit, register, errors } = useForm({
    // resolver: yupResolver(SocialSchema),
    defaultValues: social,
  });

  const onSubmit = async (data) => {
    EditSocialStart(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ overflowY: "auto", maxHeight: 560 }}
    >
      <CardContent>
        <FacebookIcon color="primary" />
        <TextField
          id="facebook"
          name="facebook"
          label="Facebook URL"
          variant="outlined"
          size="small"
          inputRef={register}
          error={!!errors.facebook}
          style={{ width: "100%" }}
          autoComplete="off"
        />
        {errors.facebook && (
          <Typography style={{ color: "red" }}>
            {errors.facebook.message}
          </Typography>
        )}
        <InstagramIcon color="secondary" />
        <TextField
          id="instagram"
          name="instagram"
          label="Instagram URL"
          variant="outlined"
          size="small"
          inputRef={register}
          error={!!errors.instagram}
          style={{ width: "100%" }}
        />
        {errors.instagram && (
          <Typography style={{ color: "red" }}>
            {errors.instagram.message}
          </Typography>
        )}
        <TwitterIcon style={{ color: "rgb(29, 161, 242)" }} />
        <TextField
          id="twitter"
          name="twitter"
          label="Twitter URL"
          variant="outlined"
          size="small"
          inputRef={register}
          error={!!errors.twitter}
          style={{ width: "100%" }}
        />
        {errors.twitter && (
          <Typography style={{ color: "red" }}>
            {errors.twitter.message}
          </Typography>
        )}
        <LinkedInIcon color="primary" />
        <TextField
          id="linkedin"
          name="linkedin"
          label="Linkedin URL"
          variant="outlined"
          size="small"
          inputRef={register}
          error={!!errors.linkedin}
          style={{ width: "100%" }}
        />
        {errors.linkedin && (
          <Typography style={{ color: "red" }}>
            {errors.linkedin.message}
          </Typography>
        )}
        <YouTubeIcon color="secondary" />
        <TextField
          id="youtube"
          name="youtube"
          label="Youtube URL"
          variant="outlined"
          size="small"
          inputRef={register}
          error={!!errors.youtube}
          style={{ width: "100%" }}
        />{" "}
        {errors.youtube && (
          <Typography style={{ color: "red" }}>
            {errors.youtube.message}
          </Typography>
        )}
        <GitHubIcon style={{ color: "black" }} />{" "}
        <TextField
          id="githup"
          name="githup"
          label="Githup URL"
          variant="outlined"
          size="small"
          inputRef={register}
          error={!!errors.githup}
          style={{ width: "100%" }}
        />{" "}
        {errors.githup && (
          <Typography style={{ color: "red" }}>
            {errors.githup.message}
          </Typography>
        )}
        <PublicIcon color="primary" />
        <TextField
          id="website"
          name="website"
          label="Website URL"
          variant="outlined"
          size="small"
          inputRef={register}
          error={!!errors.website}
          style={{ width: "100%" }}
        />
        {errors.website && (
          <Typography style={{ color: "red" }}>
            {errors.website.message}
          </Typography>
        )}
      </CardContent>

      <CardActions>
        <div style={{ marginLeft: "auto" }}>
          <Button
            type="submit"
            variant="contained"
            size="small"
            color="primary"
            disabled={isPending}
          >
            Save Social
          </Button>
          <Button size="small" onClick={handleClose}>
            Cancel
          </Button>
        </div>
      </CardActions>
    </form>
  );
};

const mapStateToProps = (state) => ({
  isPending: state.profileReducer.isPending,
});

export default connect(mapStateToProps, { EditSocialStart })(EditSocial);
