import React from "react";

import { Box, Button, Text, TextInput,ResponsiveContext, FormField} from "grommet";
import { Refresh } from "grommet-icons";

import Card from "../../components/Card";
import CardComment from "../../components/CardComment"
import Like from "../likes/likes";


import { addList, getLists } from "../../services/listsServices";
import { addComment} from "../../services/commentsServices"
 
import { useSelector, useDispatch } from 'react-redux';
import { update, selectLists } from '../../redux/ListsSlice';
import { updateLikes, selectLikes } from '../../redux/LikesSlice';

import { getLikesOfUser } from "../../services/likesServices";

const Lists = () => {
    const lists = useSelector(selectLists);
    const likes = useSelector(selectLikes);
    
    const size = React.useContext(ResponsiveContext);
    const dispatch = useDispatch();
    const [content, setcontent] = React.useState();
    const [comment, setcomment] = React.useState();
    const [inputField, setinputField] = React.useState([
        {uniti: ''},
    ]);

    const [refresh, setrefresh] = React.useState(true);
//add list 
    const publish = (e) => {
        e.preventDefault();
        if (content) {


            addList(content).then(() => setrefresh(true))
        }
    }

    //add comment
    const publishComment = (e,idList) => {
        e.preventDefault();
        
        if (comment) {
            addComment(idList, comment).then(() => setrefresh(true))
            
        }
    }
//update like and list
    React.useEffect(() => {
        const fecthLists = async () => {
            const fetchData = await getLists();
            dispatch(update(fetchData));
        }

        const fecthLikes = async () => {
            const fetchData = await getLikesOfUser();
            dispatch(updateLikes(fetchData));
        }
        if (refresh) {
            fecthLists();
            fecthLikes();
            setrefresh(false);
        }
    }, [refresh])




    

  
    
    const [inputList, setInputList] = React.useState([{ firstName: "" }]);
 
    // handle input change
    const handleInputChange = (e, index) => {
      const { name, value } = e.target;
      const list = [...inputList];
      list[index][name] = value;
      setInputList(list);
    };
   
    // handle click event of the Remove button
    const handleRemoveClick = index => {
      const list = [...inputList];
      list.splice(index, 1);
      setInputList(list);
    };
   
    // handle click event of the Add button
    const handleAddClick = () => {
      setInputList([...inputList, { firstName: ""}]);
    };
  
    return (
        <Box align="center">
            <Box  gap="medium"margin="medium">
            {/* <Box direction="row" gap="small">
                <TextInput placeholder="content" onChange={(e) => setcontent(e.target.value)} />
                <Button label="publier" onClick={(e) => publish(e)} />
            </Box> */}
            <FormField  >
                
                
                
               {inputList.map((x, i) => {
                return (
                    <Box className="box">
                        <TextInput
                            name="unite"
                            placeholder="type here"
                           
                            onChange={(e) => setcontent(e.target.value)}
                        />
                    
                        <Box margin="small" >
                            {inputList.length !== 1 && <Button onClick={() => handleRemoveClick(i)}>Remove</Button>}
                        </Box>
                        <Box margin="small">

                            {inputList.length - 1 === i && <Button onClick={handleAddClick}>Add</Button>}
                        </Box>
                    </Box>
                );
                })}
                 <Button label="publier" onClick={(e) => publish(e)} />
            </FormField>
                
                
            </Box>
            <Button icon={<Refresh />} onClick={() => setrefresh(true)} />
           
                {lists ?
                    lists.map(list => (
                        <Card key={list.id} align="center"
                            justify="center"
                            round="medium"
                            padding="medium"
                            margin="medium"
                            width={ size==="small" ?"medium":"large"}>
                            
                            <Text margin="medium">Poster par  {list.author}</Text>
                            <Text margin="medium">{list.content}</Text>
                            <Box justify="end">
                                {likes.find(x => x === list.id) ?
                                    <Like list={list.id} isLiked={true}></Like>
                                    :
                                    <Like list={list.id} isLiked={false}></Like>
                                }
                                </Box>
                            <Box direction="row" gap="medium"margin="medium">
                                <TextInput placeholder="comentaire" onChange={(e) => setcomment(e.target.value)} />
                                <Button label="publier" onClick={(e) => publishComment(e,list.id)} />
                            </Box>
                            {list.comment ?
                                list.comment.map(comment => (
                                    <CardComment key={comment.id} align="center"
                                        justify="center"
                                        round="medium"
                                        padding="medium"
                                        margin="small"
                                        width={ size==="small" ?"medium":"large"}
                                        height="xsmall">
                                <Text>{comment.content} by {comment.author}</Text>
                                </CardComment>
                                ))
                                :
                                <Text>aucun commentaire</Text>
                            }
                        </Card>
                    ))

                    :
                    <Text>Ceci sont tout les liste</Text>
                }
           
        </Box>
    )
}

export default Lists;