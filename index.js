import {
    getWatchlist,
    setWatchlist,
    addFilm,
    removeFilm
} from './store.js'

import {
    generateFilmsInPage
} from './render.js'

const searchBar = document.getElementById('search-input')
const searchBtn = document.getElementById('search-btn')
const content = document.getElementById('content')
const startExploringMsg = document.getElementById('start-exploring-msg')

let filmsInWatchlist = getWatchlist()

document.addEventListener('click', e => {
    if (e.target.id === 'search-btn') {
        startExploringMsg.style.display = 'none'
        getFilms(searchBar.value)
    }

    const btn = e.target.closest('[data-watchlist]')
    if (!btn) return
    handleAddWatchlistBtn(btn)
})

function handleAddWatchlistBtn(btn) {
    if (filmsInWatchlist.some(film => film.imdbID === btn.dataset.watchlist)) {
        btn.innerHTML = '<i class="fa-solid fa-circle-plus"></i><p>Watchlist<p>'
        filmsInWatchlist = filmsInWatchlist.filter(
            item => item.imdbID !== btn.dataset.watchlist
        )
        setWatchlist(filmsInWatchlist)
    } else {
        btn.disabled = true
        btn.innerHTML = '<i class="fa-solid fa-circle-minus"></i><p>Watchlist<p>'
        fetchFilmToWatchlist(btn)
    }
}

async function fetchFilmToWatchlist(btn) {
    const res = await fetch(
        `https://www.omdbapi.com/?i=${btn.dataset.watchlist}&apikey=c8fedda4`
    )
    const data = await res.json()

    const film = {
        imdbID: btn.dataset.watchlist,
        Title: data.Title,
        Runtime: data.Runtime,
        Plot: data.Plot,
        Poster: data.Poster,
        imdbRating: data.imdbRating,
        Genre: data.Genre
    }

    addFilm(film)
    btn.disabled = false
}

async function getFilms(searchValue) {
    const res = await fetch(
        `https://www.omdbapi.com/?s=${searchValue}&apikey=c8fedda4`
    )
    const data = await res.json()

    const filmPromises = data.Search.map(film =>
        fetch(
            `https://www.omdbapi.com/?i=${film.imdbID}&apikey=c8fedda4`
        ).then(res => res.json())
    )

    const filmsInfo = await Promise.all(filmPromises)

    content.innerHTML = generateFilmsInPage(
        filmsInfo,
        filmsInWatchlist
    )
}
