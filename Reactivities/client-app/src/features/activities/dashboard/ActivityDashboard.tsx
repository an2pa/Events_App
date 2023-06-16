import { Activity } from "../../../app/models/Activity";
import React from "react";
import { Grid } from 'semantic-ui-react';
import ActivityList from "./ActivityList";
import ActivityDetails from "./ActivityDetails";
import ActivityForm from "./ActivityForm";
import ActivityCreateForm from "./ActivityCreateForm";

interface Props {
    activities: Activity[];
    selectedActivity: Activity | undefined;
    selectActivity: (id: string) => void;
    cancelActivity: () => void;
    editMode: boolean;
    createMode: boolean;
    openForm: (id: string) => void;
    closeForm: () => void
    create: (activity: Activity) => void;
    edit: (activity: Activity) => void;
    deleteActivity: (id: string) => void;
}

export default function ActivityDashboard({createMode, activities, selectedActivity, selectActivity, deleteActivity, cancelActivity, editMode, openForm, closeForm, create, edit }: Props) {
    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList deleteActivity={deleteActivity} activities={activities} selectActivity={selectActivity} />
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedActivity && !editMode &&
                    <ActivityDetails openForm={openForm} activity={selectedActivity} cancelActivity={cancelActivity} />}
                {editMode ? (
                    <ActivityForm
                        create={create}
                        edit={edit}
                        closeForm={closeForm}
                        selectedActivity={selectedActivity}
                    />
                ) : createMode ? (
                    <ActivityCreateForm
                    create={create}
                    closeForm={closeForm}
                    selectedActivity={selectedActivity}
                    />
                ) : null}

            </Grid.Column>
        </Grid>
    )
}