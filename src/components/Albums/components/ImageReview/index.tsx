import React, { useContext, useState, useEffect, useRef } from 'react';
import { AlbumsContext } from '../../../../services/AlbumsContext';
import { Header, Segment } from 'semantic-ui-react';
import ImageReviewControls from './components/ImageReviewControls';
import { ImageReviewStatus } from '../../../../types';
import AnimatedImage from './components/AnimatedImage';
//import ReviewImage from './components/ReviewImage';
import { motion, AnimatePresence } from 'framer-motion';

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

const variants = {
    enter: ({ enterDirection }: { enterDirection: directions }) => {
        console.log(`enterDirection`, enterDirection);
        return {
            //from the right side of the screen
            x:
                enterDirection === directions.left
                    ? -1000
                    : enterDirection === directions.right
                    ? 1000
                    : 0,

            //image fades as it leaves
            opacity: 0,
        };
    },
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1,
    },
    exit: ({ exitDirection }: { exitDirection: directions }) => {
        return {
            zIndex: 0,

            //from the right side of the screen
            // prettier-ignore
            x:
                exitDirection === directions.left
                    ? -1000
                    : exitDirection === directions.right
                        ? 1000
                        : 0,

            //to the bottom of the screen (1000)
            //or to the top -1000
            //y: direction < 0 ? 1000 : -1000,
            // prettier-ignore
            y:  exitDirection === directions.down
                    ? 1000
                    : exitDirection === directions.up
                        ? -1000
                        : 0,
            //image fades as it leaves
            opacity: 0,
        };
    },
};

const ImageReview = ({ album }: { album?: string }) => {
    const [qIndex, setQIndex] = useState(0);
    const [key, setKey] = useState(0);
    const [enterDirection, setEnterDirection] = useState(directions.right);
    const [exitDirection, setExitDirection] = useState(directions.left);

    const animateOut = (newDirection: directions) => {
        setExitDirection(newDirection);
        setKey(key + numbers[newDirection]);
    };

    const { imageQueue } = useContext(AlbumsContext);

    const filteredQueue =
        // prettier-ignore
        (album 
        ? imageQueue?.filter((i) => i.album === album) 
        : imageQueue) 
        || [];

    //2 things should trigger animation
    //1.when the lenght of the filteredQueue changes but the album does not
    //it means that the image status has changed such that it is no longer pending
    //hold a reference to the previous image and compare the status
    //trigger animation by detecting context change but also
    //difficult part: keep displaying the previous image until the animation has completed
    //then display the new image

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

    const reviewImage = filteredQueue[qIndex];

    //if the image status changes, animate it out
    useEffect(() => {
        if (reviewImage.status) {
            if (reviewImage.status === ImageReviewStatus.accepted) {
                setEnterDirection(directions.right);
                animateOut(directions.up);
                nextImage();
            }

            if (reviewImage.status === ImageReviewStatus.rejected) {
                setEnterDirection(directions.right);
                animateOut(directions.down);
                nextImage();
            }
        }
    }, [reviewImage?.status]);

    const submittedAt = reviewImage?.submittedAt;

    const custom = {
        enterDirection,
        exitDirection,
    };

    const animatedImage = (
        <AnimatePresence initial={false} custom={custom}>
            <motion.img
                key={key}
                src={filteredQueue[qIndex].image}
                custom={custom}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                style={{ maxWidth: 300, maxHeight: 300 }}
                transition={{
                    x: { type: 'spring', stiffness: 300, damping: 200 },
                    opacity: { duration: 0.2 },
                }}
            />
        </AnimatePresence>
    );

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
            {!!reviewImage && reviewImage.submittedBy && animatedImage}
        </Segment>
    );
};

export default ImageReview;
