import moment from "moment";

interface Tweet {
    id: string;
    author: string;
    content: string;
    createdAt: string;
    updatedAt: string;
  }



const TweetCard: React.FC<Tweet> = ({id, author, content, createdAt, updatedAt}) => {

    return (
        <div className="flex flex-col bg-white border shadow-sm  dark:bg-indigo-500 dark:border-gray-700 dark:shadow-slate-700/[.7]">
        <div className="p-4 md:p-5">
        <div className="relative">
        <p className="dark:text-white font-bold text-left">{author}</p>
        <p className="text-right absolute top-0 right-0">{moment(createdAt).format('DD-MM-YYYY')}</p>
        </div>
          <p className="mt-2 text-gray-500 dark:text-white text-left">
           {content}
          </p>
          <a className="mt-3 inline-flex items-center gap-x-1 text-sm font-semibold  border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" href="#">
            Card link
            <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </a>
        </div>
        <div className="bg-gray-100 border-t  py-3 px-4 md:py-4 md:px-5 dark:bg-slate-900 dark:border-gray-700">
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-500">
            Last updated 5 mins ago
          </p>
        </div>
      </div>
    )
}

export default TweetCard