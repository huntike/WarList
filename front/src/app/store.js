import { configureStore } from '@reduxjs/toolkit';
import { listsReducer} from '../redux/ListsSlice';
import { likesReducer} from '../redux/LikesSlice';
import { commentsReducer} from '../redux/CommentsSlice';

import { socketReducer} from '../redux/SocketSlice';



export default configureStore({
  reducer: {
    lists: listsReducer,
    likes: likesReducer,
    comments: commentsReducer,
    socket: socketReducer
  },
});
