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
import EditableInput from '../../../EditableInput';
import { AlbumsActionTypes, AlbumsAction } from '../../../../types';

// Flow for e.g. album active status checkbox

// status is assigned in config.json
// control panel asks api for albums
// api reads config, sends to cpanel
// cpanel loads data into albums context
// component loads data, displays checkbox

// user clicks checkbox
// checkbox calls a value setting function
// value setting function
// 1. dispatches attempt action to albumscontext
// 1a. context changes value pending receipt of success or failure
// 2. calls setValue
// 	setValue calls API
// 	setValue returns true or false to value setting function
// 3. value setting function receives true or false
// 4. if true, value setting function dispatched success to context
// If true, we are done. maybe show a success message?

// 5. if false, value setting function dispatches failure to context
// 6. context reverts the value
// 7. Maybe show a failed toast?

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

const AlbumInput = ({
    album,
    type,
    input,
    textArea,
    value,
}: {
    album: string;
    //the type of action to set the input value
    type: AlbumsActionTypes;
    //the input
    input: string;
    textArea?: boolean;
    //the old value of the input
    value: string;
}) => {
    const { dispatch } = useContext(AlbumsContext);
    const configKeys = ['albums', album];

    return (
        <EditableInput
            configKeys={configKeys}
            dispatch={dispatch}
            dispatchBefore={[{ type, album } as any]}
            dispatchOnFailure={[
                {
                    type,
                    album,
                    value,
                } as any,
            ]}
            input={input}
            textArea={textArea}
            value={value}
        />
    );
};

const Album = ({ album }: { album: string }) => {
    const { albums, dispatch, imageQueue } = useContext(AlbumsContext);
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
            <AlbumInput
                album={album}
                input="description"
                textArea
                type={AlbumsActionTypes.setDescription}
                value={thisAlbum.description}
            />
            <br />
            <br />
            <AlbumInput
                album={album}
                input="hash"
                type={AlbumsActionTypes.setHash}
                value={thisAlbum.hash}
            />
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

{
    /* <EditableInput
configKeys={configKeys}
dispatch={dispatch}
dispatchBefore={[
    { type: AlbumsActionTypes.setHash, album } as any,
]}
dispatchOnFailure={[
    {
        type: AlbumsActionTypes.setHash,
        album,
        hash: thisAlbum.hash,
    },
]}
input="hash"
value={thisAlbum.hash}
/> */
}
