import {
    Button,
    ButtonGroup,
    Card,
    CardBody,
    CardHeader,
    Heading,
    HStack,
    Input,
    Stack,
    StackDivider,
} from "@chakra-ui/react";

import React, { useState} from "react";


import Edit from "./Edit.tsx";
import getToken from "./GetToken.ts";
import SongItem from "./SongItem.tsx";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./state/store.ts";
import {addSong, deleteSong} from "./state/songs/songSlice.ts";

/**
 * Main App component
 * @returns {JSX.Element} The rendered App component
 */
export default function App() {
    // State variables
    const [inputValue, setInputValue] = useState('')
    const [editToggle, setEditToggle] = useState(false)
    const [editId, setEditId] = useState('')

    const Songs = useSelector((state: RootState) => state.songs.songs);
    const dispatch = useDispatch();

    /**
     * Handles adding a song to the list
     */
    const handleAddSong = async () => {
        // Callback to add song to the list
        const spotiToken = await getToken();
        const response = await fetch(`https://api.spotify.com/v1/search?q=${inputValue}&type=track&market=PL&limit=1`, {
            headers: {
                "Authorization": `Bearer ${spotiToken}`,
            }

        });
        const data = await response.json();
        const song = {'name':data.tracks.items[0].name, 'url': data.tracks.items[0].external_urls.spotify}
        setInputValue('')
        dispatch(addSong(song));
    }
    /**
     * Handles the Enter key press event
     * @param {React.KeyboardEvent<HTMLInputElement>} e - The event object
     */
    const handleEnterClick = (e: React.KeyboardEvent<HTMLInputElement>) => {
        // Callback to handle enter key press
        if (e.key === "Enter") {
            handleAddSong()
        }
    }
    /**
     * Handles the input change event
     * @param {React.ChangeEvent<HTMLInputElement>} e - The event object
     */
    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Callback to set input value
        setInputValue(e.target.value)
    }
    /**
     * Handles the edit button click event
     * @param {React.MouseEvent<HTMLButtonElement>} e - The event object
     */
    const handleEditButton = (e: React.MouseEvent<HTMLButtonElement>) => {
        // Callback to edit song from SongItem component
        setEditToggle(!editToggle);
        setEditId(((e.target as HTMLElement)!.parentNode!.parentNode!.parentNode!.parentNode!.parentElement!.id))
    }
    /**
     * Handles deleting a song from the list
     * @param {string} id - The ID of the song to delete
     */
    const handleDeleteCB = (id:string)=>{
        // Callback to delete song from SongItem component
        dispatch(deleteSong(id));
    }



    // Render the App component
    return (<div className={"bg-gray-700 min-h-full justify-center pt-40 flex"}>
        <Card
            className={" h-fit max-w-fit bg-gradient-to-br from-gray-500 to-gray-600 border-gray-900 border-2 shadow-2xl shadow-gray-900 rounded-2xl p-4"}>
            <CardHeader>
                <Heading size="xl" className={"text-white text-xl pb-2"}>Songs</Heading>
            </CardHeader>
            <hr className={"border-gray-950 mb-2"}/>
            <CardBody>
                <Stack divider={<StackDivider/>} spacing='4'>
                    {Songs.map((s, i) => {
                        return <SongItem iVal={i.toString()} s={s} handleEditButton={handleEditButton} editToggle={editToggle} handleDeleteCB={handleDeleteCB} key={i}></SongItem>

                    })}

                </Stack>
                <hr className={"border-gray-950 mt-4"}/>


                {editToggle ? <Edit cb={setEditToggle} songId={editId} songs={Songs}></Edit> : <HStack spacing={3} className={"mt-3"}>
                    <Input variant="flushed"
                           className={"=2 h-8  mt-0  class=\"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500\""}
                           width={"auto"}
                           placeholder='Song name'
                           onKeyUp={handleEnterClick}
                           onChange={onInputChange}
                           value={inputValue}
                    />
                    <ButtonGroup size='sm' isAttached variant='outline'>
                        <Button id={"add-song"} onClick={handleAddSong}
                                className={"border-2 bg-blue-300 hover:bg-blue-400 border-solid border-blue-400 hover:border-blue-500 p-1 rounded h-8 "}>Save</Button>

                    </ButtonGroup> </HStack>}
            </CardBody>
        </Card>
    </div>)
}