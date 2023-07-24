import React, { useState } from 'react';
import styled from 'styled-components';
import RoomList from './RoomList';
import ChatForm from './ChatForm';
import Conversation from './Conversation';
import Navigation from './Navigation';
import SearchRooms from './SearchRooms';
import { useChat } from '../context/ChatProvider';
import { Description } from '../styled/Description';
import axios from '../../node_modules/axios'; 
import { getFirstLetter } from '../helpers';


const ChatAppContainer = styled.div`
    --vertical-padding: 3vh;

    display: flex;
    gap: 2vw;
    height: 80vh;
    width: 80vw;
    justify-content: space-between;
    background: #e5e7e8;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
                rgba(0, 0, 0, 0.12) 0px -12px 30px,
                rgba(0, 0, 0, 0.12) 0px 4px 6px,
                rgba(0, 0, 0, 0.17) 0px 12px 13px,
                rgba(0, 0, 0, 0.09) 0px -3px 5px;

    @media (max-width: 820px) {
        position: relative;
        width: 100%;
        height: 100vh;
        flex-direction: column-reverse;
        font-size: 0.85rem;
        gap: 0;
    }
`;

const CenterContainer = styled.div`
    display: flex;
    flex: 1;
    gap: 1.5vw;
    flex-direction: column;
    height: 100%;
    margin: auto 0;
    padding: 3vw 1vw;

    @media (max-width: 820px) {
        height: 80%;
    }
    
`;

const Chat = styled.div`
    padding: var(--vertical-padding) var(--vertical-padding) 1.5vh var(--vertical-padding);
    display: flex;
    flex: 1;
    flex-direction: column;
    height: 80%;
    background: #fff;
    border-radius: 30px;

    @media (max-width: 820px) {
        margin: 0 2.5vw;
    }
`;

const Header = styled.header`
    display: flex;
    align-items: center;
    gap: 1.1em;
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
    padding-bottom: 1em;
    height: 3.2em;
    
    & img {
        height: 100%;
        border-radius: 0.7em;
    }

    & h2 {
        font-size: 0.85em;
        font-weight: 600;
    }
`;

const WelcomeMessage = styled.p`
    margin: auto 0;
    font-size: 0.9em;
    text-align: center;
    color: rgba(0, 0, 0, 0.5);
`;


const MessageContent = styled.div`
    display: flex;
    font-size: 0.8em;
    font-weight: 300;
    padding: 0.8em 1em;
    width: fit-content;
    height: fit-content;
`;

const MessageContainer = styled.div`
    display: flex;
    gap: 20px;
    color: #fff;
    font-size: 1rem;
    flex-direction: ${ props => props.incomingMessage ? 'row' : 'row-reverse' };

    ${ MessageContent } {
        background: ${ props => props.incomingMessage ? 'var(--blue-gradient)' : '#fff' };
        border: ${ props => props.incomingMessage ? 'none' : '1px solid rgba(0, 0, 0, 0.1)' };
        color: ${ props => props.incomingMessage ? '#fff' : '#000' };
        box-shadow:  ${ props => props.incomingMessage ? 'rgba(32, 112, 198, 0.4)' : 'rgba(0, 0, 0, 0.15)'} 2px 3px 15px;
        border-radius: ${ props => props.incomingMessage ? '0 8px 8px 8px' : '8px 0 8px 8px' };
    }
`;

const UserProfile = styled.div`
    display: flex;
    position: relative;
    height: 100%;

    &::before {
        content: '${props => getFirstLetter(props.content) }';
        display: grid;
        place-content: center;
        padding: 0.5em;
        width: 1.3em;
        height: 1.3em;
        border-radius: 50%;
        background: var(--secondry-color-dark-palette);
    }
`


const ChatContainer = (props) => {
    const { currentRoom } = useChat();
    const [query, setQuery] = useState('');
    const [isNavOpen, setIsNavOpen] = useState(true);
    
    return (
        <ChatAppContainer>
            <Navigation openRoomNav={ () => setIsNavOpen(true) } /> 

            <CenterContainer>
                <SearchRooms query={ query } setQuery={ setQuery } />

                <Chat>
                    {
                        ! currentRoom ? 
                        
                        <WelcomeMessage><br/> Selecciona un chat para iniciar.<br/></WelcomeMessage>
                        :
                        <>
                            <Header>
                                <img alt='' src={ currentRoom.src } />

                                <div>
                                    <h2>{ currentRoom.name }</h2>
                                    <Description color='#000' size='0.75em'>{ currentRoom.description }</Description>
                                </div>
                            </Header>

                            <Conversation currentRoom={currentRoom.id} userid={props.userid}/>
            
                            <ChatForm userid={props.userid}/>
                        </>

                    }
                </Chat>
            </CenterContainer>
                     
            <RoomList 
                query={ query }
                isNavOpen={ isNavOpen }
                setIsNavOpen={ setIsNavOpen }
                rooms={props.rooms}
            />
            
        </ChatAppContainer>
    );
};

export default ChatContainer;