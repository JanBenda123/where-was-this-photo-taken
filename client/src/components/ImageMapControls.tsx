
interface ImageMapControlsProps{
    onSend: ()=>void;
}


export function ImageMapControls(props: ImageMapControlsProps){

    return (
        <div style={{
            padding: "20px", 
            border: "1px solid black",
        }}>
        <button onClick={props.onSend}>Send</button>

        </div>
    )
}