import React, { useContext, useState, useEffect } from 'react';
import { AlbumsContext } from '../../../../services/AlbumsContext';
import { Button, Grid, Header, Image, Segment } from 'semantic-ui-react';

export const getDate = (submittedDate: string) => {
    submittedDate = new Date(submittedDate).toString();

    //get the date
    submittedDate = submittedDate.slice(0, submittedDate.length - 36);

    //the minutes
    const minutes = submittedDate.slice(-3);

    let hours = submittedDate.slice(-5, -3);

    //set am or pm
    const amPm = Number(hours) > 11 ? 'PM' : 'AM';

    //set hours
    if (Number(hours) > 12) hours = (Number(hours) - 12).toString();
    if (Number(hours) === 0) hours = '12';

    //set the date
    const date = submittedDate.slice(0, submittedDate.length - 5);

    return `${date} ${hours} ${minutes} ${amPm}`;
};

const ImageReview = ({ album }: { album?: string }) => {
    const [qIndex, setQIndex] = useState(0);
    const { imageQueue } = useContext(AlbumsContext);

    const filteredQueue =
        // prettier-ignore
        (album 
            ? imageQueue?.filter((i) => i.album === album) 
            : imageQueue) 
        || [];

    useEffect(() => {
        setQIndex(0);
    }, [album, setQIndex]);

    const selectImage = (index: number) => {
        if (index < 0) setQIndex(0);
        else if (index > filteredQueue.length - 1)
            setQIndex((filteredQueue.length - 1) & 0);
        else setQIndex(index);
    };

    const reviewImage = filteredQueue[qIndex];

    const user = reviewImage?.submittedBy;
    return (
        <Segment>
            <Header
                h2
                content={
                    qIndex !== undefined &&
                    `Image ${qIndex + 1} of ${
                        filteredQueue.length
                    } pending review for ${album ? album : 'all albums'}`
                }
            />
            <Segment>
                <Button icon="backward" onClick={() => selectImage(0)} />
                <Button
                    icon="step backward"
                    onClick={() => selectImage(qIndex - 1)}
                />
                <Button color="green" icon="thumbs up" />
                <Button color="red" icon="thumbs down" />
                <Button
                    icon="step forward"
                    onClick={() => selectImage(qIndex + 1)}
                />
                <Button
                    icon="forward"
                    onClick={() => selectImage(filteredQueue.length - 1)}
                />
            </Segment>
            {!!reviewImage && user && (
                <div style={{ height: 600 }}>
                    <Grid columns="2" divided>
                        <Grid.Column width="2">
                            <Header h1 content={user.name} />
                            {user.regDate}
                            <br />
                            <br />
                            {user.avatar && <Image src={user.avatar} />}
                            {user.title}
                        </Grid.Column>
                        <Grid.Column>
                            <p>{getDate(reviewImage.submittedAt)}</p>
                            <p>{reviewImage.status}</p>
                            <Image src={reviewImage.image} size="large" />
                        </Grid.Column>
                    </Grid>
                </div>
            )}
        </Segment>
    );
};

export default ImageReview;
