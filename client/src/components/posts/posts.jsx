import React, { useEffect, useRef, useState, useCallback } from "react";
import CreatePost from "../create-post/create-post";
import PostItem from "../post-item/post-item";
import axios from "axios";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);

  const load = useCallback(() => {
    axios
      .get(`/api/post/${page}`)
      .then((res) => {
        setPosts((p) => [...p, ...res.data.posts]);
        if (!res.data.hasMore) {
          setHasMore(res.data.hasMore);
        }
      })
      .catch((err) => console.log(err));
    setPage(page + 1);
  }, [page]);

  const loader = useRef(load);

  const observer = useRef(
    new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loader.current();
        }
      },
      { threshold: 1 }
    )
  );
  const [el, setEl] = useState(null);

  useEffect(() => {
    loader.current = load;
  }, [load]);

  useEffect(() => {
    const currentEl = el;
    const currentObserver = observer.current;

    if (currentEl) {
      currentObserver.observe(currentEl);
    }

    return () => {
      if (currentEl) currentObserver.unobserve(currentEl);
    };
  }, [el]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: 10,
      }}
    >
      <CreatePost />
      {posts &&
        posts.length > 0 &&
        posts.map((post) => <PostItem key={post._id} post={post} />)}

      {hasMore && (
        <div ref={setEl} style={{ margin: "10px  auto" }}>
          Loading...
        </div>
      )}
    </div>
  );
};

export default Posts;
