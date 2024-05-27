import Song from "./SongModel.ts";
import {Button, ButtonGroup, HStack, Input} from "@chakra-ui/react";
import React from "react";
import SongItem from "./SongItem.tsx";
import getToken from "./GetToken.ts";

/**
 * Edit component for editing a song
 * @param {object} props - The props object
 * @param {string} props.songId - The ID of the song to edit
 * @param {function} props.cb - Callback function to update the parent component
 * @param {Song[]} props.songs - Array of songs
 * @returns {JSX.Element} The rendered Edit component
 */
const Edit = (props: { songId: string, cb: (arg0: boolean) => void, songs:Song[] })=>{
    // State variable for the input value
    const [inputValue, setInputValue] = React.useState('')


    /**
     * Handles editing a song
     * @param {React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLInputElement>} e - The event object
     */
    const handleEditSong = async (e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLInputElement>) => {
        const spotiToken = await getToken();
        const response = await fetch(`https://api.spotify.com/v1/search?q=${inputValue}&type=track&market=PL&limit=1`, {
            headers: {
                "Authorization": `Bearer ${spotiToken}`,
            }

        });
        const data = await response.json();
        const song = new Song(+props.songId, data.tracks.items[0].name, data.tracks.items[0].external_urls.spotify)
        props.songs[+props.songId] = song;
        setInputValue('')
        props.cb(false);
    }
    /**
     * Handles the Enter key press event
     * @param {React.KeyboardEvent<HTMLInputElement>} e - The event object
     */
    const handleEnterClick = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleEditSong(e);
        }
    }
    /**
     * Handles the input change event
     * @param {React.ChangeEvent<HTMLInputElement>} e - The event object
     */
    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }
    // Render the Edit component
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