import React, { useContext } from 'react';
import { AlbumsContext } from '../../../../services/AlbumsContext';
import { Checkbox, Header, Label, Input } from 'semantic-ui-react';

const AlbumProperty = ({
    keyName,
    value,
}: {
    keyName: string;
    value: string;
}) => {
    return (
        <div>
            <Label content={`${keyName}: `} />
            {value}
        </div>
    );
};

const Album = ({ album }: { album: string }) => {
    const { albums, imageQueue } = useContext(AlbumsContext);
    if (!albums)
        return (
            <div>
                <Header>{album}</Header>
            </div>
        );

    const thisAlbum = albums[album];
    const reviewImages =
        imageQueue?.filter((image) => image.album === album) || [];
    return (
        <div>
            <Header>{album}</Header>
            <AlbumProperty
                keyName={'description'}
                value={thisAlbum.description}
            />
            <AlbumProperty keyName={'hash'} value={thisAlbum.hash} />
            <Checkbox
                data-testid="status"
                label="Status"
                checked={thisAlbum.status}
            />
            There are {reviewImages.length ? reviewImages.length : 'no'} images
            to review for this album.
        </div>
    );
};

export default Album;
