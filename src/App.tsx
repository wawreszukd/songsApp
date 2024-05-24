import {
    Box,
    Button,
    Card,
    CardBody,
    CardHeader,
    Heading,
    HStack,
    Input,
    Stack,
    StackDivider,
    Text,
    ButtonGroup,
} from "@chakra-ui/react";
import {CloseIcon, LinkIcon, SettingsIcon} from "@chakra-ui/icons";
import {useState} from "react";

class Song {
    constructor(public name:string, public link:string) {
    }
}

const Songs = [new Song("Song1", "https://www.youtube.com/watch?v=1"),new Song("Song2", "https://www.youtube.com/watch?v=2"),new Song("Song3", "https://www.youtube.com/watch?v=3")];

export default function App() {
    const [editMode, setEditMode] = useState(false);
    const handleEditButton = (e) => {
        console.log(e.target.parentNode.parentNode.parentNode.parentNode.getAttribute("data-index"));
        setEditMode(!editMode);
    }
    return (<div className={"bg-gray-700 min-h-full justify-center pt-40 flex"} >
        <Card
            className={" h-fit max-w-fit bg-gradient-to-br from-gray-500 to-gray-600 border-gray-900 border-2 shadow-2xl shadow-gray-900 rounded-2xl p-4"}>
            <CardHeader>
                <Heading size="xl" className={"text-white text-xl pb-2"}>Songs</Heading>
            </CardHeader>
            <hr className={"border-gray-950 mb-2"}/>
            <CardBody>
                <Stack divider={<StackDivider/>} spacing='4'>
                    {Songs.map((s,i)=>{
                        return <Box data-index={i}>
                            <Text pt='2' fontSize='sm' className={"flex flex-row justify-between"}>
                                <p className={"text-gray-300 text-sm"}><a target={"_blank"} href={s.link}><LinkIcon></LinkIcon></a>  {s.name}</p>
                                <div>
                                    <Button className={"mr-3"} onClick={handleEditButton}><SettingsIcon color={"white"}></SettingsIcon></Button>
                                    <Button><CloseIcon color={"red"}></CloseIcon></Button>
                                </div>
                            </Text>
                        </Box>
                    })}

                </Stack>
                <hr className={"border-gray-950 mt-4"}/>
                { !editMode ?
                    <HStack spacing={3} className={"mt-3"}>
                        <Input variant="flushed" className={"=2 h-8  mt-0  class=\"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500\""} width={"auto"} placeholder='Song name'/>
                        <ButtonGroup size='sm' isAttached variant='outline'>
                            <Button
                                className={"border-2 bg-blue-300 hover:bg-blue-400 border-solid border-blue-400 hover:border-blue-500 p-1 rounded h-8 "}>Save</Button>

                        </ButtonGroup> </HStack> :
                    <HStack spacing={3} className={"mt-3"}>
                        <Input variant="flushed" className={"=2 h-8  mt-0  class=\"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500\""} width={"auto"} placeholder='Song name'/>
                        <ButtonGroup size='sm' isAttached variant='outline'>
                            <Button
                                className={"border-2 bg-yellow-300 hover:bg-yellow-400 border-solid border-yellow-400 hover:border-yellow-500 p-1 rounded h-8 "}>Edit</Button>

                        </ButtonGroup> </HStack>
                }
            </CardBody>
        </Card>
    </div>)
}