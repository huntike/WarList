import axios from "axios";
import fire from '../fire';

const url = 'http://localhost:3001/comment'

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

export const addComment = async (idList, content) => {
    const header = await createToken();
    const user = fire.auth().currentUser;
    const author = user.email;
    
    const payload = {
        idList,
        
        content,
        author
    }
    try {
        const res = await axios.post(url, payload, header);
        console.log('idlist ',payload);

        return res.data;
    } catch (e) {
        console.error(e);
    }

}