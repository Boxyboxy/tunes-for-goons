import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import { createPostListener } from "../firebase/database";
import { Col } from "react-bootstrap";
import { JournalEntryList } from "./JournalEntryList";

export function Homepage() {
  const [user, setUser] = useOutletContext();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (user) {
      createPostListener(user.id, (snapshot) => {
        const newPosts = [];
        snapshot.forEach((post) => {
          newPosts.push({
            db_id: post.key,
            ...post.val(),
          });
        });
        setPosts(newPosts);
      });
    }

    console.log(posts);
  }, []);

  return (
    <Col
      className="d-flex align-items-center flex-column m-auto"
      style={{ maxWidth: "80%", backgroundColor: "#191414", color: "#1DB954" }}
    >
      <JournalEntryList entries={posts} user={user} />
    </Col>
  );
}
