import axios from "axios";
import fire from '../fire';

const url = 'http://localhost:3001/lists'

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

export const addList = async (content) => {
    const header = await createToken();

    const user = fire.auth().currentUser;
    const author = user.email;
    
    const payload = {
        content,
        author
    }
    try {
        const res = await axios.post(url, payload, header);
        return res.data;
    } catch (e) {
        console.error(e);
    }

}

export const getLists = async () => {
    const header = await createToken();

    try {
        const res = await axios.get(url, header)
        return res.data;
    } catch (e) {
        console.error(e);
    }
}

