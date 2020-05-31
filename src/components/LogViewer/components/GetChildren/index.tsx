import React, { ReactElement } from 'react';
import { KeyStringInterface, LogEventTypes } from '../../../../types';
import ErrorEvent from '../ErrorEvent';
import ArrayDisplay from '../ArrayDisplay';
import ObjectDisplay from '../ObjectDisplay';
import Instructions from '../Instructions';

const getChildren = (object: KeyStringInterface, newest?: boolean) =>
    Object.keys(object).reduce((children, key) => {
        switch (key) {
            case LogEventTypes.array: {
                const array = object[key];
                const arrayChild = (
                    <ArrayDisplay array={array} newest={!!newest} />
                );
                children.push(arrayChild);
                return children;
            }
            case LogEventTypes.error: {
                const errorChild = (
                    <ErrorEvent newest={!!newest} error={object[key]} />
                );
                children.push(errorChild);
                return children;
            }
            case LogEventTypes.instructions: {
                const child = <Instructions instructions={object[key]} />;
                children.push(child);
                return children;
            }
            case LogEventTypes.link: {
                const child = (
                    <a
                        href={object[key]}
                        style={{ color: 'lightBlue' }}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Link
                    </a>
                );
                children.push(child);
                return children;
            }
            case LogEventTypes.text: {
                children.push(<span>{object[key]}</span>);
                return children;
            }
            case LogEventTypes.setting: {
                const thisSetting = object[key];
                const setting = Object.keys(thisSetting)[0];
                children.push(
                    <span>
                        {setting} is {object[key][setting].toString()}
                    </span>
                );
                return children;
            }
            default: {
                const value = object[key];
                //the key isn't one of the recognized types, so make a generic display
                //if it's a primitive value, just display it as a key: string pair
                //if it's an array, display using ArrayDisplay
                //object but not array, use ObjectDisplay
                //ArrayDisplay and ObjectDisplay will recursively call getChildren for contents
                const display =
                    // prettier-ignore
                    typeof value === 'object'
                        ? Array.isArray(value)
                            ? <ArrayDisplay array={value} newest={!!newest} />
                            : <ObjectDisplay object={value} newest={!!newest}/>
                        : value;

                children.push(
                    <span>
                        {key}: {display}
                    </span>
                );
            }
        }
        return children;
    }, [] as ReactElement[]);

export default getChildren;
