// entryComponent is a HTML representaion of the data.  This is how we'd like to see it in the dom.

export default (props) => {
    const entryComponent =
        `
            <div class = "journalEntry">
                <h2>${props.concept}</h2>
                <h3>Date: ${props.date}</h3>
                <p>Entry: <br>${props.entry}</p>
                <p>Mood Today: <br>${props.mood}</p>
            </div>
            <br>
              `
    return entryComponent
}