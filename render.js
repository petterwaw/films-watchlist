export function generateInnerHtml(film, idsArr, filmsInWatchlist) {

    if (film.Genre !== 'N/A' && film.Plot !== 'N/A' && film.Runtime !== 'N/A') {
        const buttonText = idsArr.includes(film.imdbID)
            ? '<i class="fa-solid fa-circle-minus"></i><p>Watchlist<p>'
            : '<i class="fa-solid fa-circle-plus"></i><p>Watchlist<p>'

        return `
            <div class="film-card">
                <img src="https://img.omdbapi.com/?i=${film.imdbID}&apikey=c8fedda4"
                     alt="${film.Title}"
                     onerror="this.onerror=null; this.src='posterError.png';"/>
                <div class="film-info">
                    <div class="film-info-top">
                        <h2>${film.Title}</h2>
                        <i class="fa-solid fa-star"></i>
                        <p>${film.imdbRating}</p>
                    </div>
                    <div class="film-info-middle">
                        <p>${film.Runtime}</p>
                        <p>${film.Genre}</p>
                        <button data-watchlist="${film.imdbID}">
                            ${buttonText}
                        </button>
                    </div>
                    <p class="film-info-plot">${film.Plot}</p>
                </div>
            </div>
        `
    }

    return ''
}

export function generateFilmsInPage(films, filmsInWatchlist) {
    let innerHTML = ''

    const idsArr = filmsInWatchlist.map(item => item.imdbID)

    films.forEach(film => {
        const html = generateInnerHtml(film, idsArr, filmsInWatchlist)
        if (html) innerHTML += html
    })

    return innerHTML
}
