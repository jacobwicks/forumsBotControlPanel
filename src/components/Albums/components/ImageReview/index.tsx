import React, { useContext, useState } from 'react';
import { AlbumsContext } from '../../../../services/AlbumsContext';
import {
    Button,
    Grid,
    GridColumn,
    Header,
    Image,
    Segment,
} from 'semantic-ui-react';

const ImageReview = ({ album }: { album?: string }) => {
    const [qIndex, setQIndex] = useState(0);
    const { imageQueue } = useContext(AlbumsContext);

    const filteredQueue =
        (album ? imageQueue?.filter((i) => i.album === album) : imageQueue) ||
        [];

    const reviewImage = imageQueue?.[qIndex];
    const user = reviewImage?.submittedBy;
    return (
        <Segment>
            <Header
                h2
                content={
                    qIndex !== undefined &&
                    `Image ${qIndex + 1} of ${
                        filteredQueue.length
                    } pending review for ${album}`
                }
            />
            <Segment>
                <Button
                    icon="double arrow backward"
                    onClick={() => setQIndex(0)}
                />
                <Button
                    icon="step backward"
                    onClick={() => setQIndex(qIndex - 1)}
                />
                <Button color="green" icon="thumbs up" />
                <Button color="red" icon="thumbs down" />
                <Button
                    icon="step forward"
                    onClick={() => setQIndex(qIndex + 1)}
                />
                <Button
                    icon="double arrow forward"
                    onClick={() => setQIndex(filteredQueue.length - 1)}
                />
            </Segment>
            {!!reviewImage && user && (
                <div>
                    <Grid columns="2" divided>
                        <GridColumn width="2">
                            <Header h1 content={user.name} />
                            {user.regDate}
                            {user.avatar && <Image src={user.avatar} />}
                            {user.title}
                        </GridColumn>

                        <Image src={reviewImage.image} size="small" />
                        {reviewImage.status}
                        {reviewImage.submittedAt}
                    </Grid>
                </div>
            )}
        </Segment>
    );
};

export default ImageReview;
