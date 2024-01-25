import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import 'preline/preline';
import { IStaticMethods } from 'preline/preline';
import './App.css';
import('preline');
import 'tailwindcss/tailwind.css';
import axios, { AxiosResponse } from 'axios';
import TweetCard from './Components/TweetCard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditModal from './Components/EditModal';

declare global {
  interface Window {
    HSStaticMethods: IStaticMethods;
  }
}

interface Tweet {
  id: string;
  author: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

function App() {
  const location = useLocation();
  const [allTweets, setAllTweets] = useState<Tweet[]>([]);
  const [newUsername, setNewUsername] = useState<string | undefined>(undefined);
  const [newContent, setNewContent] = useState<string | undefined>(undefined);
  const [editModal, setEditModal] = useState<Boolean>(false);
  const [editId, setEditId] = useState<string | undefined>(undefined);
  const [editContent, setEditContent] = useState<string | undefined>(undefined);
  const [editAuthor, setEditAuthor] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true)

  const getAllTweets = () => {
    axios.get('https://test-twitter-api.lixium.dev/tweets').then((response) => {
      setLoading(false)
      setAllTweets(response.data);
    });
  };

  useEffect(() => {
    getAllTweets();
  }, []);

  useEffect(() => {
    window.HSStaticMethods.autoInit();
  }, [location.pathname]);

  const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewUsername(e.target.value);
  };

  const handleContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewContent(e.target.value);
  };

  const handleEditClick = (tweet: Tweet) => {
    setEditId(tweet.id);
    setEditContent(tweet.content);
    setEditAuthor(tweet.author);
    setEditModal(true);
  };

  const closeEditModal = () => {
    setEditModal(false);
  };

  const handleEditSuccess = (editedTweet: Tweet) => {
    // Update allTweets without making an additional API call
    setAllTweets((prevTweets) =>
      prevTweets.map((tweet) =>
        tweet.id === editedTweet.id ? editedTweet : tweet
      )
    );
    toast('Tweet edit successfully');
    // Close the edit modal
    closeEditModal();
  };

  const postTweet = () => {
    const body = {
      author: newUsername,
      content: newContent
    };
    if (newUsername && newContent) {
      axios
        .post('https://test-twitter-api.lixium.dev/tweets', body)
        .then((response: AxiosResponse) => {
          setNewUsername('');
          setNewContent('');
          setAllTweets((prevTweets) => [...prevTweets, response.data]);
          toast('Tweet saved successfully');
        })
        .catch(() => {
          toast('Something went wrong. Please try again.');
        });
    } else {
      toast('Please enter username and content');
    }
  };

  const deleteTweet = (tweetId: string) => {
    axios
      .delete(`https://test-twitter-api.lixium.dev/tweets/${tweetId}`)
      .then(() => {
        toast('Tweet deleted successfully');
        // Update the allTweets state by filtering out the deleted tweet
        setAllTweets((prevTweets) =>
          prevTweets.filter((tweet) => tweet.id !== tweetId)
        );
      })
      .catch(() => {
        toast('Something went wrong. Please try again');
      });
  };

  return (
    <>
      <ToastContainer />
      {!loading && (
      <button
        type="button"
        data-hs-overlay="#hs-slide-up-animation-modal"
        className="text-right text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
      >
        +
      </button>
      )}
      {editModal && (
        <EditModal
          editId={editId}
          editContent={editContent}
          editAuthor={editAuthor}
          onClose={closeEditModal}
          onEditSuccess={handleEditSuccess}
        />
      )}

      <div
        id="hs-slide-up-animation-modal"
        className="hs-overlay hidden w-full h-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none"
      >
        <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-14 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
          <div className="flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
            <div className="flex justify-between items-center py-3 px-4 border-b dark:border-gray-700">
              <h3 className="font-bold text-gray-800 dark:text-white">
                Add Tweet
              </h3>
              <button
                type="button"
                className="hs-dropup-toggle flex justify-center items-center w-7 h-7 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                data-hs-overlay="#hs-slide-up-animation-modal"
              >
                <span className="sr-only">Close</span>
                <svg
                  className="flex-shrink-0 w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4 overflow-y-auto">
              <input
                required
                type="text"
                value={newUsername}
                onChange={handleUsername}
                className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                placeholder="Enter Username"
              />
              <textarea
                required
                value={newContent}
                onChange={handleContent}
                className="mt-5 py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                rows="3"
                placeholder="Enter Tweet"
              ></textarea>
            </div>
            <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-gray-700">
              <button
                type="button"
                className="hs-dropup-toggle py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                data-hs-overlay="#hs-slide-up-animation-modal"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => postTweet()}
                data-hs-overlay="#hs-slide-up-animation-modal"
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
      {!loading ? allTweets.map((tweet) => (
        <TweetCard
          onEdit={() => handleEditClick(tweet)}
          onDelete={() => deleteTweet(tweet.id)}
          key={tweet.id}
          {...tweet}
        />
      )) : (
        <div className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500" role="status" aria-label="loading">
  <span className="sr-only">Loading...</span>
</div>
      )}
    </>
  );
}

export default App;
