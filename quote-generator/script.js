const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const author = document.getElementById('author')
const btnNewQuote = document.querySelector('.btn-newQuote')
const btnTwitter = document.getElementById('twitter')
const loader = document.querySelector('.loader')


function showLoading() {
    quoteContainer.hidden = true
    loader.hidden = false
}

function hideLoading() {
    quoteContainer.hidden = false
    loader.hidden = true
}

let apiQuote = []
// generate new code
function newQuote() {
    showLoading()
    const quote = apiQuote[Math.floor(Math.random() * apiQuote.length)]
    // check if author field is valid or not
    if (!quote.author) {
        author.textContent = 'Unknown'
    }
    else {
        author.textContent = quote.author
    }

    if (quote.text.length > 100) {
        quoteText.classList.add('long-quote')
    }
    else {
        quoteText.classList.remove('long-quote')
    }
    quoteText.textContent = quote.text
    hideLoading()
}
// Fetch  quote API quote
async function getQuote() {
    showLoading()
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json'
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Oops')
        }
        else {
            apiQuote = await response.json()
            newQuote()
        }

    } catch (error) {

    }
}


// Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${author.textContent}`
    window.open(twitterUrl, '_blank')
}


btnNewQuote.addEventListener('click', newQuote)
btnTwitter.addEventListener('click', tweetQuote)
getQuote()