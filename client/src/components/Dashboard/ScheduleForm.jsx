import React, { useState } from 'react';
import { Checkbox, Form, Button } from 'semantic-ui-react';
import { useMutation, gql } from '@apollo/client';

const UPDATE_NOTIFICATIONS = gql`
    mutation updateNotifications($input: NotificationInput!) {
        updateNotifications(input: $input) {
            success
            message
        }
    }
`;
const ScheduleForm = () => {
    const [selectedTimes, setSelectedTimes] = useState([]);
    const [selectedDays, setSelectedDays] = useState([]);
    const [updateNotifications] = useMutation(UPDATE_NOTIFICATIONS);

    const handleTimeChange = (event, { value }) => {
        setSelectedTimes((prevTimes) =>
            prevTimes.includes(value)
            ? prevTimes.filter((time) => time !== value)
            : [...prevTimes, value]
);
    };

        const handleDayChange = (event, { value }) => {
        setSelectedDays((prevDays) =>
            prevDays.includes(value)
            ? prevDays.filter((day) => day !== value)
            : [...prevDays, value]
);
    };

    const handleSubmit = async () => {
        try {
            const response = await updateNotifications({
                variables: {
                    input: {
                        time: selectedTimes,
                        dayOfWeek: selectedDays,
                    },
                },
        });
    } catch (error) {
            console.error('Failed to save preferences', error);
        }
    };
return (
    <Form>
        <Form.Field>
        <label>Notification time of day</label>
        <Checkbox label='Morning' value='Morning' onChange={handleTimeChange} />
        <Checkbox label='Noon' value='Noon' onChange={handleTimeChange} />
        <Checkbox label='Evening' value='Evening' onChange={handleTimeChange} />
        </Form.Field>
        <Form.Field>
        <label>Notification day of week</label>
        <Checkbox label='Sunday' value='Sunday' onChange={handleDayChange} />
        <Checkbox label='Monday' value='Morning' onChange={handleDayChange} />
        <Checkbox label='Tuesday' value='Tuesday' onChange={handleDayChange} />
        <Checkbox label='Wednesday' value='Wednesday' onChange={handleDayChange} />
        <Checkbox label='Thursday' value='Thursday' onChange={handleDayChange} />
        <Checkbox label='Friday' value='Friday' onChange={handleDayChange} />
        <Checkbox label='Saturday' value='Saturday' onChange={handleDayChange} />
        </Form.Field>
        <Button onClick={handleSubmit}>Save Preferences</Button>
    </Form>
    );
};

export default ScheduleForm;