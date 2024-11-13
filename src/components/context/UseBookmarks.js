import { useContext } from "react";
import BookmarkContext from "./BookmarkContext";

export const useBookmarks = () => useContext(BookmarkContext);
