import axios from 'axios';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Tweet } from '../TweetCard';

interface EditModalProps {
  editId?: string;
  editContent?: string;
  editAuthor?: string;
  onClose: () => void; // Add onClose prop to close the modal
  onEditSuccess: (editedTweet: Tweet) => void;
}

const EditModal: React.FC<EditModalProps> = ({
  editId,
  editContent,
  editAuthor,
  onClose,
  onEditSuccess
}) => {
  const [newContent, setNewContent] = useState<string | undefined>(undefined);
  const [newUsername, setNewUsername] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  const handleContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewContent(e.target.value);
  };

  const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewUsername(e.target.value);
  };

  const editTweet = () => {
    setLoading(true);
    const body = {
      author: newUsername ? newUsername : editAuthor,
      content: newContent ? newContent : editContent
    };
    axios
      .patch(`https://test-twitter-api.lixium.dev/tweets/${editId}`, body)
      .then((response) => {
        setLoading(false);
        const editedTweet: Tweet = response.data;
        onEditSuccess(editedTweet);
        onClose();
      })
      .catch(() => {
        setLoading(false);
        toast('Something went wrong please try again');
      });
  };

  return (
    <div className="w-full h-full fixed top-0 start-0 z-[80]  overflow-y-auto pointer-events-none">
      <ToastContainer />
      <div className="mt-14   sm:max-w-lg sm:w-full m-3 sm:mx-auto">
        <div className="flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
          <div className="flex justify-between items-center py-3 px-4 border-b dark:border-gray-700">
            <h3 className="font-bold text-gray-800 dark:text-white">
              Edit Tweet
            </h3>
            <button
              onClick={onClose}
              type="button"
              className="hs-dropup-toggle flex justify-center items-center w-7 h-7 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              data-hs-overlay="#hs-slide-up-animation-modal"
            >
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
              value={newUsername ? newUsername : editAuthor}
              onChange={handleUsername}
              className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
              placeholder="Enter Username"
            />
            <textarea
              required
              value={newContent ? newContent : editContent}
              onChange={handleContent}
              className="mt-5 py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
              rows="3"
              placeholder="Enter Tweet"
            ></textarea>
          </div>
          <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-gray-700">
            <button
              onClick={onClose}
              type="button"
              className="hs-dropup-toggle py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              data-hs-overlay="#hs-slide-up-animation-modal"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => editTweet()}
              data-hs-overlay="#hs-slide-up-animation-modal"
              className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
            >
              {loading && (
                <span
                  className="animate-spin inline-block w-4 h-4 border-[3px] border-current border-t-transparent text-white rounded-full"
                  role="status"
                  aria-label="loading"
                >
                  <span className="sr-only">Loading...</span>
                </span>
              )}
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
