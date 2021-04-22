import React from "react";

import { Box, Button } from "grommet";
import { Favorite } from "grommet-icons";
import ButtonLike from "../../components/ButtonLike"

import { addLikeToList, removeLikeFromList } from "../../services/likesServices";

const Like = ({ list, isLiked }) => {

    const addLike = (list) => {
        addLikeToList(list);
    }


    const removeLike = (list) => {
        removeLikeFromList(list);
    }

    return (
        <Box align="center">
            <Box direction="row" gap="small">
                {isLiked ?
                    <ButtonLike icon={<Favorite color='brand' />}  onClick={(e) => removeLike(list)} />
                    :
                    <ButtonLike icon={<Favorite color='plain' />}  onClick={(e) => addLike(list)} />
                }
            </Box>
        </Box>
    )
}

export default Like;