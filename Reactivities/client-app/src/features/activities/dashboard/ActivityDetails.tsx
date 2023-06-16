import { Activity } from '/../app/models/Activity';
import React from 'react';
import { Button, Card, Icon, Image } from 'semantic-ui-react'
import { StringifyOptions } from 'querystring';

interface Props{
    activity: Activity;
    cancelActivity: () => void;
    openForm: (id: string)=>void;
}

export default function ActivityDetails({activity, cancelActivity, openForm}: Props){
    return(
<Card fluid>
    <Image src={`/assets/categoryImages/${activity.category}.jpg`}  />
    <Card.Content>
      <Card.Header>{activity.title}</Card.Header>
      <Card.Meta>
        <span className='date'>{activity.date}</span>
      </Card.Meta>
      <Card.Description>
      {activity.description}
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <Button onClick={()=>openForm(activity.id)} basic color='blue' content="Edit" />
      <Button onClick={cancelActivity} basic color='blue' content="Close" />
    </Card.Content>
  </Card>
)}