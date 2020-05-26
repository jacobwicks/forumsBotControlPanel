import React, { useContext, Dispatch } from 'react';
import { Button, Segment } from 'semantic-ui-react';
import { AlbumsContext } from '../../../../../../services/AlbumsContext';
import { AlbumsAction, AlbumsActionTypes } from '../../../../../../types';

const acceptImage = ({
    dispatch,
    submittedAt,
}: {
    dispatch: Dispatch<AlbumsAction>;
    submittedAt: string;
}) => {
    //dispatch action to AlbumsContext
    dispatch({ type: AlbumsActionTypes.accept, submittedAt });
    //request API to accept image
    //API Route calls uploadImageToAlbum function
    //uploadImageToAlbum function returns true/undefined
    //api route returns 200/500
    //if true/200 do nothing
    //if false/500, put the image back in the queue
    //and display a toast
};

const rejectImage = ({
    dispatch,
    submittedAt,
}: {
    dispatch: Dispatch<AlbumsAction>;
    submittedAt: string;
}) => {
    //dispatch action to AlbumsContext
    dispatch({ type: AlbumsActionTypes.reject, submittedAt });
};

const ImageReviewControls = ({
    maxIndex,
    nextImage,
    prevImage,
    qIndex,

    selectImage,
    submittedAt,
}: {
    //the maximum select
    maxIndex: number;

    nextImage: () => void;
    prevImage: () => void;
    //index of current image in the queue
    qIndex: number;

    //change the image
    selectImage: (qIndex: number) => void;

    //the timestamp when the image was submitted- unique
    submittedAt: string;
}) => {
    const { dispatch } = useContext(AlbumsContext);
    return (
        <Segment>
            <Button icon="backward" onClick={() => selectImage(0)} />
            <Button icon="step backward" onClick={() => prevImage()} />
            <Button
                color="green"
                icon="thumbs up"
                onClick={() => acceptImage({ dispatch, submittedAt })}
            />
            <Button
                color="red"
                icon="thumbs down"
                onClick={() => rejectImage({ dispatch, submittedAt })}
            />
            <Button icon="step forward" onClick={() => nextImage()} />
            <Button icon="forward" onClick={() => selectImage(maxIndex)} />
        </Segment>
    );
};

export default ImageReviewControls;
