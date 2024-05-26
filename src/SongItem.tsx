import {Box, Button, Text} from "@chakra-ui/react";
import {CloseIcon, LinkIcon, SettingsIcon} from "@chakra-ui/icons";
import React from "react";
import Song from "./SongModel.ts";

const SongItem = (props:{handleDeleteCB:(id:string)=>void ,iVal:string, handleEditButton: (e: React.MouseEvent<HTMLButtonElement>)=>void, editToggle:boolean, s:Song}) =>{
    const handleDelete = ()=>{
        props.handleDeleteCB(props.iVal)
    }
    return (<Box key={props.iVal} id={props.iVal}>
        <Text pt='2' fontSize='sm' className={"flex flex-row justify-between"}>
                                <span className={"text-gray-300 text-sm"}><a target={"_blank"}
                                                                             href={props.s.link}><LinkIcon></LinkIcon></a> {props.s.name}
                                </span>
            {props.editToggle ? <></>: <div>
                <Button
                    className={"mr-3"}
                    onClick={props.handleEditButton}
                >
                    <SettingsIcon
                        color={"white"}
                    >
                    </SettingsIcon>
                </Button>
                <Button>
                    <CloseIcon
                        color={"red"}
                        onClick={handleDelete}
                    ></CloseIcon>
                </Button>
            </div>}
        </Text>
    </Box>)
}
export default SongItem;