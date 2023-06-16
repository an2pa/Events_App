import React, {  useState } from 'react';
import { Activity } from '/../app/models/Activity';
import {v4 as uuid} from 'uuid';

import { Button, Form, Segment } from 'semantic-ui-react';

interface Props{
    closeForm: ()=> void;
    selectedActivity: Activity | undefined;
    create: (activity: Activity)=> void;
    edit: (activity: Activity)=> void;
}



export default function ActivityCreateForm({closeForm, selectedActivity, create, edit}: Props) {

    const initialState= selectedActivity ||  {
        id: " ",
        title: " ",
        date: " ",
        description: " ",
        category: " ",
        city: " ",
        venue: " "
    }
    
    const [activity, setActivity]= useState(initialState);

    function handleSubmit(activity: Activity){
        console.log(activity);
    }

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement >){
        const {name, value}=event.target;
        setActivity({ ...activity, [name]: value });

    }


    return (
        <Segment clearing>
        <Form onSubmit={()=>handleSubmit(activity)}>
            <Form.Input placeholder="Title" value={activity?.title} name="title" onChange={handleInputChange} />
            <Form.TextArea placeholder="Description" value={activity?.description} name="description" onChange={handleInputChange} />
            <Form.Input placeholder="Category" value={activity?.category} name="category" onChange={handleInputChange} />
            <Form.Input placeholder="Date" value={activity?.date} name="date" onChange={handleInputChange} />
            <Form.Input placeholder="City" value={activity?.city} name="city" onChange={handleInputChange}/>
            <Form.Input placeholder="Venue" value={activity?.venue} name="venue" onChange={handleInputChange}/>
            <Button onClick={()=>{edit(activity)}}  type='submit' floated='right' positive content="Submit" />
            <Button onClick={closeForm} type='button' floated='right' positive content="Cancel" />
        </Form>
        </Segment>
    )


}