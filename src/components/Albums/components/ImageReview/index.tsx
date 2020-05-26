import React, { useContext, useState, useEffect, useRef } from 'react';
import { AlbumsContext } from '../../../../services/AlbumsContext';
import { Header, Segment } from 'semantic-ui-react';
import ImageReviewControls from './components/ImageReviewControls';
import { ImageReviewStatus, ReviewImage } from '../../../../types';
import AnimatedImage from './components/AnimatedImage';
import ReviewImageDisplay from './components/ReviewImage';

const usePrevious = <T extends any>(value: T): T | undefined => {
    const ref = useRef<T>();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
};

export enum directions {
    down = 'down',
    left = 'left',
    right = 'right',
    up = 'up',
}

const numbers = {
    down: 1,
    left: 2,
    right: 3,
    up: 4,
};

const ImageReview = ({ album }: { album?: string }) => {
    const [qIndex, setQIndex] = useState(0);
    const [key, setKey] = useState(0);
    const [enterDirection, setEnterDirection] = useState(directions.right);
    const [exitDirection, setExitDirection] = useState(directions.left);
    const [overrideImage, setOverrideImage] = useState(false);

    const custom = {
        enterDirection,
        exitDirection,
    };

    const animateOut = (newDirection: directions) => {
        setExitDirection(newDirection);
        setKey(key + numbers[newDirection]);
    };

    const { imageQueue } = useContext(AlbumsContext);

    const filteredQueue =
        // prettier-ignore
        (album 
        ? imageQueue?.filter((i) => i.album === album && i.status === ImageReviewStatus.pending) 
        : imageQueue) 
        || [];
    const reviewImage = filteredQueue[qIndex];

    const submittedAt = reviewImage?.submittedAt;

    //2 things should trigger animation
    //1.when the lenght of the filteredQueue changes but the album does not
    //it means that the image status has changed such that it is no longer pending
    //hold a reference to the previous image and compare the status
    //trigger animation by detecting context change but also
    //difficult part: keep displaying the previous image until the animation has completed
    //then display the new image

    const previousAlbum = usePrevious(album);
    const previousReviewImage = usePrevious(reviewImage) as ReviewImage;
    const previousKey = usePrevious(key) as number;
    const previousFilteredQueueLength = usePrevious(filteredQueue.length);

    console.log(`album ${album}, previousAlbum ${previousAlbum}`);
    console.log(
        `filteredQ length ${filteredQueue.length}, previousFilteredQLength ${previousFilteredQueueLength}`
    );

    useEffect(() => {
        if (
            album === previousAlbum &&
            filteredQueue.length !== previousFilteredQueueLength
        ) {
            setOverrideImage(true);
            console.log(
                `the status of the previous review image is `,
                previousReviewImage?.status
            );
            if (previousReviewImage.status === ImageReviewStatus.accepted) {
                setEnterDirection(directions.right);
                animateOut(directions.up);
                setOverrideImage(false);
                nextImage();
            }

            if (previousReviewImage.status === ImageReviewStatus.rejected) {
                setEnterDirection(directions.right);
                animateOut(directions.down);
                setOverrideImage(false);
                nextImage();
            }
        }
    }, [
        album,
        previousAlbum,
        filteredQueue.length,
        previousFilteredQueueLength,
        reviewImage,
        previousReviewImage,
    ]);
    //2: when the qIndex changes but the album does not
    //it means that the user has changed what image they are looking at
    //animate the old one out, animate the new one in
    useEffect(() => {
        setQIndex(0);
    }, [album, setQIndex]);

    const nextImage = () => {
        if (qIndex + 1 < filteredQueue.length) {
            setQIndex(qIndex + 1);
        }
    };

    const animatedNextImage = () => {
        animateOut(directions.left);
        nextImage();
    };

    const prevImage = () => {
        if (qIndex - 1 >= 0) {
            setQIndex(qIndex - 1);
        }
    };

    const animatedPrevImage = () => {
        setEnterDirection(directions.left);
        animateOut(directions.right);
        prevImage();
    };

    const selectImage = (index: number) => {
        if (index < 0) setQIndex(0);
        else if (index > filteredQueue.length - 1)
            setQIndex((filteredQueue.length - 1) & 0);
        else setQIndex(index);
    };

    // //if the image status changes, animate it out
    // useEffect(() => {
    //     if (reviewImage.status) {
    //         if (reviewImage.status === ImageReviewStatus.accepted) {
    //             setEnterDirection(directions.right);
    //             animateOut(directions.up);
    //             nextImage();
    //         }

    //         if (reviewImage.status === ImageReviewStatus.rejected) {
    //             setEnterDirection(directions.right);
    //             animateOut(directions.down);
    //             nextImage();
    //         }
    //     }
    // }, [reviewImage?.status]);

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
            <ImageReviewControls
                maxIndex={(filteredQueue.length - 1) & 0}
                nextImage={animatedNextImage}
                prevImage={animatedPrevImage}
                qIndex={qIndex}
                selectImage={selectImage}
                submittedAt={submittedAt}
            />
            {!!reviewImage && reviewImage.submittedBy && (
                <ReviewImageDisplay
                    animatedImage={
                        <AnimatedImage
                            custom={custom}
                            image={
                                overrideImage
                                    ? previousReviewImage.image
                                    : reviewImage.image
                            }
                            keyProp={overrideImage ? previousKey : key}
                        />
                    }
                    reviewImage={reviewImage}
                />
            )}
        </Segment>
    );
};

export default ImageReview;
