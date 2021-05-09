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
    const [inputFields, setinputFields] = React.useState([
        {unite: ''},
    ]);

    const [refresh, setrefresh] = React.useState(true);
//add list old 
    const publish = (e) => {
        e.preventDefault();
        if (content) {

            console.log(content);
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


  
    
    
    const handleChangeInput = (index, event) =>{
        const values = [...inputFields];
        values[index][event.target.name] = event.target.value;
        setinputFields(values);
    }

    const hanleAddFields = ( ) => {
        setinputFields([...inputFields, { unite:""}])
    }
    const handleRemoveFields = (index) => {
        const values  = [...inputFields];
        values.splice(index, 1);
        setinputFields(values);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (inputFields) {

            console.log(inputFields);
            addList(inputFields).then(() => setrefresh(true))
        }
    }

    
   

  
    return (
        <Box align="center">
            <Box  gap="medium"margin="medium">
            {/*
            Ancien add list
            <Box direction="row" gap="small">
                <TextInput placeholder="content" onChange={(e) => setcontent(e.target.value)} />
                <Button label="publier" onClick={(e) => publish(e)} />
            </Box> */}
            <FormField  >
                    {inputFields.map((inputField, index) => (
                        <Box key={index}>
                            <TextInput
                            name="unite"
                            placeholder="type here"
                            value={inputField.unite}
                            onChange={(event) => handleChangeInput(index, event)}
                            
                            />
                            <Button onClick={() => hanleAddFields() }>Add</Button>
                            <Button onClick={() => handleRemoveFields(index)}>  Delete</Button>

                        </Box>
                    ))}
                
                
               
                 <Button label="publier" onClick={(e) => handleSubmit(e)} />
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
                            {list.content.map(content => (
                                <Text key={content.id} margin="medium">{content.value}</Text>
                            )
                            )}
                                


                            {/*
                            Ancien affichage List 
                             <Text margin="medium">{list.content}</Text>
                              */}
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