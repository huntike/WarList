import socketIOClient from "socket.io-client";
import { update } from '../src/redux/ListsSlice';
import { updateLikes } from '../src/redux/LikesSlice';
import {updatecomment} from '../src/redux/CommentsSlice'

// here is all the receivers for socketio
// used to update the store
const connect = (url, store) => {
    const io = socketIOClient(url);
    console.log('socket connected');

    io.on('UPDATE', data => {
        console.log('socket received:', data);
        store.dispatch(update(data));
    });

    io.on('LIKES', data => {
        console.log('likes socket received:', data);
        store.dispatch(updateLikes(data));
    });

    io.on('COMMENT', data => {
        console.log('likes socket received:', data);
        store.dispatch(updatecomment(data));
    });
}

export default connect; 