
interface AppInterfaceControlsProps{
    onSend: ()=>void;
}


export function AppInterfaceControls(props: AppInterfaceControlsProps){

    return (
        <div style={{
            padding: "20px", 
            border: "1px solid black",
        }}>
        <button onClick={props.onSend}>Send</button>

        </div>
    )
}