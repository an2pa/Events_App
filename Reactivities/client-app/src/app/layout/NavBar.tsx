import React from "react";
import { Button, Container, Menu } from "semantic-ui-react";
interface Props{
    openform: ()=>void;
}

export default function NavBar({openform}: Props){
    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item header>
                    <img style={{marginRight: '30px'}} src="/assets/logo.png" alt="logo"/>
                    Reactivities
                </Menu.Item>
                <Menu.Item>
                    <Button onClick={openform} positive content="Create Activity" />
                </Menu.Item>
            </Container>
        </Menu>
    )
}