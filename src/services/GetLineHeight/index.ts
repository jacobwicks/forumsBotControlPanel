const getLineHeight = () => {
    //to get the line height
    const root = document.getElementById('root');
    const text = document.createElement('span');
    text.innerHTML = 'Hello';
    //add an element containing some text
    root?.appendChild(text);

    //find the height
    const lineHeight = parseInt(window.getComputedStyle(text).fontSize, 10);
    //remove the element
    root?.removeChild(text);
    return lineHeight;
};

export default getLineHeight;
