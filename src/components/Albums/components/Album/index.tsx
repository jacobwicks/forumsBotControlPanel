import React, { useContext, ReactElement, useState } from 'react';
import { AlbumsContext } from '../../../../services/AlbumsContext';
import {
    Button,
    Icon,
    Checkbox,
    Header,
    Label,
    Input,
    Loader,
} from 'semantic-ui-react';

const AlbumProperty = ({
    keyName,
    value,
    child,
}: {
    keyName: string;
    value?: string;
    child?: ReactElement;
}) => {
    //const { dispatch } = useContext(AlbumsContext);
    const [open, setOpen] = useState(false);
    const [temp, setTemp] = useState(value);

    const handleBlur = (value: string) => {
        setOpen(false);
        //call api to attempt changeValue
    };

    return (
        <div>
            <Button disabled={!!child} icon onClick={() => setOpen(!open)}>
                <Icon name="edit" />
            </Button>
            <Label size="large" content={`${keyName}: `} />{' '}
            {child ? (
                child
            ) : open ? (
                <Input
                    onKeyPress={({ key }: { key: string }) => {
                        if (key === 'Enter') {
                            !!temp && handleBlur(temp);
                        }
                    }}
                    value={temp}
                    onChange={({ target }) => setTemp(target.value)}
                    onBlur={(e: InputEvent) => {
                        const target = e.target as HTMLInputElement;
                        handleBlur(target.value);
                    }}
                />
            ) : (
                value
            )}
        </div>
    );
};

const Album = ({ album }: { album: string }) => {
    const { albums, imageQueue } = useContext(AlbumsContext);
    //albums isn't necessarily loaded
    if (!albums)
        return (
            <div>
                <Header>{album}</Header>
                <Loader active />
            </div>
        );

    //the full album object from albums
    const thisAlbum = albums[album];

    //an array of ReviewImage
    const reviewImages =
        imageQueue?.filter((image) => image.album === album) || [];

    return (
        <div>
            <Header>{album}</Header>
            <AlbumProperty
                keyName={'description'}
                value={thisAlbum.description}
            />
            <br />
            <br />
            <AlbumProperty keyName={'hash'} value={thisAlbum.hash} />
            <br />
            <br />
            <AlbumProperty
                keyName={'Active'}
                child={
                    <Checkbox data-testid="status" checked={thisAlbum.status} />
                }
            />
            There are {reviewImages.length ? reviewImages.length : 'no'} images
            to review for this album.
        </div>
    );
};

export default Album;
