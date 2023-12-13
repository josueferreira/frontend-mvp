"use client";
import React, { useEffect, useState } from "react";
import {
  FaHeart,
  FaRegHeart,
  FaRegComment,
  FaRegBookmark,
  FaBookmark,
  FaStar,
  FaRegStar,
} from "react-icons/fa";
import { FaShareSquare } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Slider from "./ui/Slider";
import PostEdit from "./PostEdit";
import PostAdd from "./PostAdd";
import { SlOptions } from "react-icons/sl";
import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { BiTrip } from "react-icons/bi";
import axios from "axios";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);
  const [isAddFormVisible, setIsAddFormVisible] = useState(false);
  const [editPost, setEditPost] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/viagens");
      const postsData = response.data.viagem.reverse().map((post) => ({
        ...post,
        postState: {
          isLiked: false,
          isMarked: false,
          isDropdownVisible: false,
        },
      }));
      setPosts(postsData);
    } catch (error) {
      console.error("Erro ao obter dados da API:", error);
    }
  };

  const toggleDropdown = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              postState: {
                ...post.postState,
                isDropdownVisible: !post.postState.isDropdownVisible,
              },
            }
          : post
      )
    );
    const post = posts.find((p) => p.id === postId);
    setSelectedPost(post);
  };

  const handleLike = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              postState: {
                ...post.postState,
                isLiked: !post.postState.isLiked,
              },
            }
          : post
      )
    );
  };

  const handleMarked = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              postState: {
                ...post.postState,
                isMarked: !post.postState.isMarked,
              },
            }
          : post
      )
    );
  };

  const showEditForm = (post) => {
    setEditPost(post);
    setIsEditFormVisible(true);
  };

  const hideEditForm = () => {
    setIsEditFormVisible(false);
    setEditPost(null);
  };
  const showAddForm = () => {
    setIsAddFormVisible(true);
  };

  const hideAddForm = () => {
    setIsAddFormVisible(false);
  };

  const deletePost = async (postId) => {
    try {
      const formData = new FormData();
      formData.append("id", postId);

      const response = await fetch(`http://127.0.0.1:5000/viagem`, {
        method: "DELETE",
        body: formData,
      });

      if (response.ok) {
        setOpenModal(false);
        setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
        toast.success("Viagem excluída com sucesso!");
      } else {
        toast.error("Ocorreu um erro ao excluir sua viagem.");
        console.error(`Erro ao excluir o post ${postId}:`);
      }
    } catch (error) {
      console.error("Erro ao excluir o post:", error);
    }
  };

  const handleDelete = (postId) => {
    console.log("ID a ser excluído:", postId);
    deletePost(postId);
  };

  return (
    <>
      <div className="w-full md:w-3/5 py-4 px-8 bg-yellow-300 fixed z-20 md:ml-[20%]  ">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-lg text-white">Trip Experience</h1>
            <p className="text-sm text-cyan-50">
              Compartilhe suas viagens com o mundo!
            </p>
          </div>
          <div>
            <button
              onClick={() => showAddForm()}
              className="rounded-full bg-white px-3 py-3 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100"
            >
              <BiTrip />
            </button>
          </div>
        </div>
      </div>
      <div className="w-full mt-28 p-5 h-screen md:w-3/5 md:ml-[20%] md:mt-32 mb-10">
        <ToastContainer />
        <div className="flex flex-col items-center relative">
          {posts.map((post) => (
            <div
              key={post.id}
              className="max-w-3xl w-full mb-5 mt-5 border rounded-lg overflow-hidden"
            >
              <div className="relative px-4 py-2 flex justify-between items-center">
                <div className="flex items-center">
                  <img
                    src="/images/users/user.jpg"
                    alt="Avatar"
                    className="w-14 h-14 rounded-full"
                  />
                  <p className="font-bold ml-4">Thomas Anree</p>
                </div>
                <div>
                  <button
                    onClick={() => toggleDropdown(post.id)}
                    type="button"
                    className="inline-flex w-full justify-center gap-x-1.5 rounded-full bg-white px-3 py-3 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100"
                    id="menu-button"
                    aria-expanded="true"
                    aria-haspopup="true"
                  >
                    <SlOptions />
                  </button>
                </div>
                {post.postState.isDropdownVisible && (
                  <div
                    className="absolute top-12 right-4 z-10 mt-2 w-52 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="menu-button"
                    tabIndex="-1"
                  >
                    <div className="py-1" role="none">
                      <button
                        onClick={() => showEditForm(post)}
                        className="w-full text-left text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
                        role="menuitem"
                        tabIndex="-1"
                        id="menu-item-1"
                      >
                        Editar
                      </button>
                    </div>

                    <div className="py-1" role="none">
                      <button
                        onClick={() => setOpenModal(true)}
                        className="w-full text-left text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
                        role="menuitem"
                        tabIndex="-1"
                        id="menu-item-6"
                      >
                        Excluir
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <div className="relative">
                <Slider images={post.fotos.split(",")} />
              </div>
              <div className="px-4 py-2">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <button
                      onClick={() => handleLike(post.id)}
                      className="p-2 rounded-full hover:bg-gray-200"
                    >
                      {post.postState.isLiked ? (
                        <FaHeart className="text-red-600" />
                      ) : (
                        <FaRegHeart />
                      )}
                    </button>
                    <button className="p-2 rounded-full hover:bg-gray-200 mr-2">
                      <FaRegComment />
                    </button>
                    <button className="p-2 rounded-full hover:bg-gray-200">
                      <FaShareSquare /> {/* Corrected icon */}
                    </button>
                  </div>
                  <button
                    onClick={() => handleMarked(post.id)}
                    className="p-2 rounded-full hover:bg-gray-200"
                  >
                    {post.postState.isMarked ? (
                      <FaBookmark />
                    ) : (
                      <FaRegBookmark />
                    )}
                  </button>
                </div>
                <p className="font-bold">{post.destino}</p>
                <div className="flex mb-2">
                  {[...Array(5)].map((_, i) => (
                    <div key={i}>
                      {i < post.rating ? (
                        <FaStar className="text-yellow-500" />
                      ) : (
                        <FaRegStar className="text-gray-300 " />
                      )}
                    </div>
                  ))}
                </div>
                <p>{post.detalhes}</p>
                
              </div>
            </div>
          ))}

          <Modal
            show={openModal}
            size="md"
            onClose={() => setOpenModal(false)}
            popup
          >
            <Modal.Header />
            <Modal.Body>
              <div className="text-center">
                <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  Tem certeza que deseja excluir{" "}
                  <b className="font-bold">{selectedPost?.destino}</b>?
                </h3>
                <div className="flex justify-center gap-4">
                  <Button
                    color="failure"
                    onClick={() => handleDelete(selectedPost.id)}
                  >
                    Excluir
                  </Button>
                  <Button color="gray" onClick={() => setOpenModal(false)}>
                    Cancelar
                  </Button>
                </div>
              </div>
            </Modal.Body>
          </Modal>
        </div>
        {isEditFormVisible && (
          <PostEdit
            onCancel={hideEditForm}
            initialValues={editPost}
            postId={editPost.id}
          />
        )}
        {isAddFormVisible && <PostAdd onCancel={hideAddForm} />}
      </div>
    </>
  );
};

export default Feed;
