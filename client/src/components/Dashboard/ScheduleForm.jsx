import React, { useState } from 'react';
import { Checkbox, Form, Button } from 'semantic-ui-react';
import { useMutation, gql } from '@apollo/client';

const PUSH_SCHEDULER = gql`
    mutation pushScheduler()
`;
const ScheduleForm = () => {
    const handleSubmit = async () => {
        try {}
        catch (error) {
            console.error('Failed to save preferences', error);
        }
    };
return (
    <Form>
        <Form.Field>
        <label>Choose the time of day would</label>
        <Checkbox label='Morning' />
        <Checkbox label='Noon' />
        <Checkbox label='Evening' />
        </Form.Field>
        <Form.Field>
        <label>Choose the day of the week</label>
        <Checkbox label='Sunday' />
        <Checkbox label='Monday' />
        <Checkbox label='Tuesday' />
        <Checkbox label='Wednesday' />
        <Checkbox label='Thursday' />
        <Checkbox label='Friday' />
        <Checkbox label='Saturday' />
        </Form.Field>
        <Button onClick={handleSubmit}>Save Preferences</Button>
    </Form>
    );
};

export default ScheduleForm;