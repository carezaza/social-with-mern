import React, { useEffect, useState } from "react";
import { List, ListItem, ListItemText } from "@material-ui/core/";
import DropdownMenu from "../dropdown-menu/dropdown-menu";
import axios from "axios";
import PeopleItem from "../people-item/people-item";

const PeopleDropDown = ({ anchorEl, handleClose }) => {
  const [people, setPeople] = useState([]);
  const [more, setMore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [enough, setEnough] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/api/profile/people/${more}`)
      .then((res) => {
        setPeople((s) => [...s, ...res.data.people]);
        setEnough(res.data.enough);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [more]);

  const handleLoadMore = () => {
    if (loading) return;
    setMore((s) => s + 3);
  };

  if (!anchorEl) return null;
  return (
    <DropdownMenu anchorEl={anchorEl} handleClose={handleClose}>
      <List dense>
        {people.length > 0 &&
          people.map((p) => (
            <PeopleItem key={p._id} profile={p} handleClose={handleClose} />
          ))}
        {!enough && (
          <ListItem
            onClick={handleLoadMore}
            style={{ marginTop: 10 }}
            button={!loading}
          >
            <ListItemText
              primary={loading ? "Loading..." : "Load more"}
              color="primary"
            />
          </ListItem>
        )}
      </List>
    </DropdownMenu>
  );
};

export default PeopleDropDown;
