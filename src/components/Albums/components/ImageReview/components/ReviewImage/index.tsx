import React, { ReactElement } from 'react';
import { Grid, Header, Image } from 'semantic-ui-react';
import { ReviewImage, SAUser } from '../../../../../../types';
import { getDate } from '../../services';

const _ReviewImage = ({
    animatedImage,
    reviewImage,
    user,
}: {
    animatedImage: ReactElement;
    reviewImage: ReviewImage;
    user: SAUser;
}) => {
    const { submittedAt, status, image } = reviewImage;
    const { avatar, name, regDate, title } = user;
    return (
        <div style={{ height: 600 }}>
            <Grid columns="2" divided>
                <Grid.Column width="2">
                    <Header h1 content={name} />
                    {regDate}
                    <br />
                    <br />
                    {avatar && <Image src={avatar} />}
                    {title}
                </Grid.Column>
                <Grid.Column>
                    <p>{getDate(submittedAt)}</p>
                    <p>{status}</p>
                    {animatedImage}
                </Grid.Column>
            </Grid>
        </div>
    );
};

export default _ReviewImage;
