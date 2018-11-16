// journalHTMLEntry is a HTML representaion of the data.  This is how we'd like to see it in the dom.


const journalHTMLEntry = (entry) => {
    return `
            <div class = "journalEntry">
                <h4>${entry.concept}</h4>
                <h5>Date: ${entry.date}</h5>
                <p>Entry: <br>${entry.entry}</p>
                <p>Mood Today: <br>${entry.mood}</p>
            </div><br> 
            `
}



export default journalHTMLEntry