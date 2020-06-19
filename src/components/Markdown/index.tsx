import React from 'react';
import ReactMarkdown from 'react-markdown/with-html';

const MyMarkdown = (props: any) => {
    const maxWidth = props?.maxWidth;

    const imageNodes = new Map();
    const nodeKey = (position: any) => JSON.stringify(position.start); // or use your own hash function

    function allowNodes(node: any) {
        if (node.type === 'image') imageNodes.set(nodeKey(node.position), node);
        return true;
    }

    const renderers = {
        image: ({
            sourcePosition,
            alt,
            src,
            title,
        }: {
            sourcePosition: any;
            alt: any;
            src: any;
            title: any;
        }) => {
            console.log('processing image. maxWidth is', maxWidth);

            return <img alt={alt} src={src} style={{ maxWidth }} />;
            //     const node = imageNodes.get(nodeKey(sourcePosition));
            //     console.log('rendering an image');
            //     return (
            //         <img
            //             alt={alt}
            //             src={src}
            //             title={title}
            //             {...node.data.hProperties}
            //         />
            //     );
        },
    };

    return (
        <ReactMarkdown
            {...props}
            allowNodes={allowNodes}
            renderers={renderers}
            rawSourcePos
        />
    );
};

export default MyMarkdown;
