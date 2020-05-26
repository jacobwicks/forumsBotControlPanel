import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { directions } from '../..';

const variants = {
    enter: (direction: directions) => {
        return {
            //from the right side of the screen
            x: direction === directions.left ? -1000 : 1000,

            //image fades as it leaves
            opacity: 0,
        };
    },
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1,
    },
    exit: (direction: directions) => {
        return {
            zIndex: 0,
            //to the bottom of the screen (1000)
            //or to the top -1000
            //y: direction < 0 ? 1000 : -1000,
            // prettier-ignore
            y:  direction === directions.down
                    ? 1000
                    : direction === directions.up
                        ? -1000
                        : 0,
            //image fades as it leaves
            opacity: 0,
        };
    },
};

const AnimatedImage = ({
    direction,
    image,
    key,
}: {
    direction: directions;
    image: string;
    key: number;
}) => (
    <AnimatePresence initial={false} custom={direction}>
        <motion.img
            key={key}
            src={image}
            style={{
                maxHeight: 300,
                maxWidth: 300,
            }}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
                x: { type: 'spring', stiffness: 300, damping: 200 },
                y: { type: 'spring', stiffness: 300, damping: 200 },
                opacity: { duration: 0.2 },
            }}
        />
    </AnimatePresence>
);
export default AnimatedImage;
