import Song from "./SongModel.ts";
import {Button, ButtonGroup, HStack, Input} from "@chakra-ui/react";
import React from "react";
const Edit = (props: {song: Song, cb: (arg0: boolean) => void} )=>{
    const [inputValue, setInputValue] = React.useState(props.song.name)

    const handleEditSong = (e: React.MouseEvent<HTMLButtonElement>) => {
        setInputValue('')
        props.cb(false);
    }
    const handleEnterClick = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleEditSong(e as any)
        }
    }
    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }
    return( <HStack spacing={3} className={"mt-3"}>
        <Input variant="flushed"
               className={"=2 h-8  mt-0  class=\"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500\""}
               width={"auto"}
               placeholder='Song name'
               onKeyUp={handleEnterClick}
               onChange={onInputChange}
               value={inputValue}
        />
        <ButtonGroup size='sm' isAttached variant='outline'>
            <Button id={"add-song"} onClick={handleEditSong}
                    className={"border-2 bg-blue-300 hover:bg-blue-400 border-solid border-blue-400 hover:border-blue-500 p-1 rounded h-8 "}>Edit</Button>

        </ButtonGroup> </HStack>)
}
export default Edit;