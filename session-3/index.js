'use strict'

const BASE_URL = 'https://pokeapi.co/api/v2'
const $image = document.querySelector('#image')
const $name = document.querySelector('#name')
const READY_STATE_NOT_INITIALIZED = 0
const READY_STATE_LOADING = 1
const READY_STATE_LOADED = 2
const READY_STATE_INTERACTIVE = 3
const READY_STATE_COMPLETED = 4
const NOT_INITIALIZED = 'Not initialized.'
const LOADING = 'Loading…'
const LOADED = 'Loaded.'
const INTERACTIVE = 'Interactive.'
const COMPLETED = 'Completed.'
const HTTP_STATUS_SUCCESS = 200

const renderPokemon = pokemon => {
    $name.textContent = pokemon.name
    $image.setAttribute('src', pokemon.sprites.front_default)
}

const renderError = status =>
    ($name.textContent = `${status} Pokemon no encontrado`)

function ajax({
    url,
    method = 'GET',
    async = true,
    responseType = 'text',
    done = () => {},
    error = () => {},
}) {
    const status = ({ readyState }) => {
        switch (readyState) {
            case READY_STATE_NOT_INITIALIZED:
                return NOT_INITIALIZED
            case READY_STATE_LOADING:
                return LOADING
            case READY_STATE_LOADED:
                return LOADED
            case READY_STATE_INTERACTIVE:
                return INTERACTIVE
            case READY_STATE_COMPLETED:
                return COMPLETED
        }
    }

    const request = new XMLHttpRequest()
    request.responseType = responseType

    console.log(status(request), request.readyState)

    request.open(method, url, async)
    request.send(null)

    console.log(status(request), request.readyState)

    request.onreadystatechange = event => {
        console.log(event)
        console.log(status(request), request.readyState)

        if (status(request) === COMPLETED) {
            if (request.status === HTTP_STATUS_SUCCESS) {
                done(JSON.parse(request.responseText))
            } else {
                error('Pokémon not found. :(')
            }
        }
    }

    debugger
}

const pikachu = ajax({
    url: `${BASE_URL}/pokemon/445`,
    async: true,
    done: renderPokemon,
    error: renderError,
})
