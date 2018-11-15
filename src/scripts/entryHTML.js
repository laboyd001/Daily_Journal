// journalHTMLEntry is a HTML representaion of the data.  This is how we'd like to see it in the dom.


const journalHTMLEntry = (entry) => {
    return `
            <div class = "journalEntry">
                <h2>${entry.concept}</h2>
                <h3>Date: ${entry.date}</h3>
                <p>Entry: <br>${entry.entry}</p>
                <p>Mood Today: <br>${entry.mood}</p>
            </div><br> 
            `
}



export default journalHTMLEntry