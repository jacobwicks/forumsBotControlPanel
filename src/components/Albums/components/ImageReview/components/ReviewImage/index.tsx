import React, { ReactElement } from 'react';
import { Grid, Header, Image } from 'semantic-ui-react';
import { ReviewImage, SAUser } from '../../../../../../types';
import { getDate } from '../../services';
import User from '../../../../../User';

const _ReviewImage = ({
    animatedImage,
    reviewImage,
}: {
    animatedImage: ReactElement;
    reviewImage: ReviewImage;
}) => (
    <div style={{ height: 600 }}>
        <Grid columns="2" divided>
            <Grid.Column width="2">
                <User {...reviewImage.submittedBy} />
            </Grid.Column>
            <Grid.Column>
                <p>{getDate(reviewImage.submittedAt)}</p>
                <p>{reviewImage.status}</p>
                <div
                    style={{
                        //width: '100vw',
                        // height: '100vh',
                        width: 300,
                        position: 'relative',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'left',
                    }}
                >
                    {animatedImage}
                </div>
            </Grid.Column>
        </Grid>
    </div>
);

export default _ReviewImage;
