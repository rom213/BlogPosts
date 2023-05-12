import PostCard from "../../components/home/PostCard";
import "./home.css";
import { useDispatch, useSelector } from "react-redux";
import usePostCrud from "../../hooks/usePostCrud";
import FormPost from "../../components/home/FormPost";
import { useEffect, useState } from "react";
import { useSocket } from "../../hooks/useSockets";
import { addPost } from "../../store/slices/posts.slice";
/* ----  */

const Home = () => {
  const { posts } = useSelector((state) => state);
  const dispatch= useDispatch()

  const [isCloseForm, setIsCloseForm] = useState(true);
  const { socket, online } = useSocket("http://localhost:3200");

  useEffect(() => {
   socket.on('render-new-post',(data)=>{
    dispatch(addPost(data))
   })
  }, [socket])
  

  useEffect(() => {
    socket.emit("saludar", { from: "react" });
  }, [socket]);

  const handleCreatePost = () => {
    setIsCloseForm(false);
  };

  return (
    <div className="home">
      <h1 className="home__title">Infinite Insights</h1>
      <p className="home__description">
        Discover a unique perspective on Infinite Insights, where we explore a
        wide range of topics and provide you with fresh and surprising ideas.
        From technology to art, from science to culture, our team of experts
        will guide you through a fascinating intellectual journey. Join us in
        the quest for endless knowledge.
      </p>
      <div className="home__post-container">
        {posts?.posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      <button onClick={handleCreatePost} className="home__btn">
        +
      </button>
      <FormPost
        isCloseForm={isCloseForm}
        setIsCloseForm={setIsCloseForm}
        socket={socket}
      />
    </div>
  );
};

export default Home;
