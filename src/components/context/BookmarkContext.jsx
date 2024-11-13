import { createContext, useState, useEffect } from "react";

const BookmarkContext = createContext();

export const BookmarkProvider = ({ children }) => {
  const [bookmarks, setBookmarks] = useState(() => {
    const savedBookmarks = localStorage.getItem("bookmarks");
    return savedBookmarks ? JSON.parse(savedBookmarks) : [];
  });

  const addBookmark = (movie) => {
    if (!bookmarks.find((item) => item.id === movie.id)) {
      const updatedBookmarks = [...bookmarks, movie];
      setBookmarks(updatedBookmarks);
    }
  };

  const removeBookmark = (movieId) => {
    const updatedBookmarks = bookmarks.filter((item) => item.id !== movieId);
    setBookmarks(updatedBookmarks);
  };

  useEffect(() => {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  return (
    <BookmarkContext.Provider
      value={{ bookmarks, addBookmark, removeBookmark }}
    >
      {children}
    </BookmarkContext.Provider>
  );
};

export default BookmarkContext;
