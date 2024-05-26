import {
    Box,
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
    Text,
} from "@chakra-ui/react";
import {CloseIcon, LinkIcon, SettingsIcon} from "@chakra-ui/icons";
import React, {useEffect, useState} from "react";
import GetToken from "./GetToken.ts";
import Song from "./SongModel.ts";
import Edit from "./Edit.tsx";

const Songs = [new Song(0, "Song1", "https://www.youtube.com/watch?v=1"), new Song(1, "Song2", "https://www.youtube.com/watch?v=2"), new Song(2, "Song3", "https://www.youtube.com/watch?v=3")];

export default function App() {
    const [spotiToken, setSpotiToken] = useState('')
    const [inputValue, setInputValue] = useState('')
    const [editToggle, setEditToggle] = useState(false)
    const [songToEdit, setSongToEdit] = useState(new Song(0, "", ""))


    useEffect(() => {
        let token: string | null = null;
        setInterval(async () => {
            token = await GetToken();
        }, 60 * 60 * 1000);
        setSpotiToken(token!);
    }, []);


    const handleAddSong = (e: React.MouseEvent<HTMLButtonElement>) => {
        setInputValue('')
    }
    const handleEnterClick = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleAddSong(e as any)
        }
    }
    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }
    const handleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
        setSongToEdit(Songs[parseInt(e.target!.parentElement!.parentElement!.parentElement!.parentElement!.getAttribute("data-index")!)])
        setEditToggle(true)
    }


    return (<div className={"bg-gray-700 min-h-full justify-center pt-40 flex"}>
        <Card
            className={" h-fit max-w-fit bg-gradient-to-br from-gray-500 to-gray-600 border-gray-900 border-2 shadow-2xl shadow-gray-900 rounded-2xl p-4"}>
            <CardHeader>
                <Heading size="xl" className={"text-white text-xl pb-2"}>Songs</Heading>
            </CardHeader>
            <hr className={"border-gray-950 mb-2"}/>
            <CardBody>
                <Stack divider={<StackDivider/>} spacing='4'>
                    {Songs.map((s) => {
                        return <Box data-index={s.id}>
                            <Text pt='2' fontSize='sm' className={"flex flex-row justify-between"}>
                                <span className={"text-gray-300 text-sm"}><a target={"_blank"}
                                                                             href={s.link}><LinkIcon></LinkIcon></a> {s.name}
                                </span>
                                { editToggle ? <></>: <div>
                                    <Button
                                        className={"mr-3"}
                                        onClick={handleEdit}
                                    >
                                        <SettingsIcon
                                            color={"white"}
                                        >
                                        </SettingsIcon>
                                    </Button>
                                    <Button>
                                        <CloseIcon color={"red"}></CloseIcon>
                                    </Button>
                                </div>}
                            </Text>
                        </Box>
                    })}

                </Stack>
                <hr className={"border-gray-950 mt-4"}/>


                {editToggle ? <Edit cb={setEditToggle} song={songToEdit}></Edit> : <HStack spacing={3} className={"mt-3"}>
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