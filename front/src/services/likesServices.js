import axios from "axios";
import fire from '../fire';

const url = 'http://localhost:3001/likes'

const createToken = async () => {

    const user = fire.auth().currentUser;
    const token = user && (await user.getIdToken());

    const payloadHeader = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    };

    return payloadHeader;
}

export const addLikeToList = async (list) => {
    const header = await createToken();

    const user = fire.auth().currentUser;
    const author = user.email;

    const payload = {
        list,
        author
    }
    try {
        const res = await axios.post(url, payload, header);
        return res.data;
    } catch (e) {
        console.error(e);
    }
}


export const removeLikeFromList = async (list) => {
    const header = await createToken();

    const user = fire.auth().currentUser;
    const author = user.email;

    const payload = {
        list,
        author
    }
    try {
        const res = await axios.put(url, payload, header);
        return res.data;
    } catch (e) {
        console.error(e);
    }
}

export const getLikesOfUser = async () => {
    const header = await createToken();

    const user = fire.auth().currentUser;

    const userMail = user.email;

    const getUrl = url + '/' + userMail;
    try {
        const res = await axios.get(getUrl, header)
        return res.data;
    } catch (e) {
        console.error(e);
    }
}

