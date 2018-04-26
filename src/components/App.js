import React, { Component } from 'react'
import { render } from 'react-dom'

import Sidebar from './Sidebar'
import NotesBar from './NotesBar'
import Notes from './Notes'

import initialState from '../initial-state.js'

import {} from '../style/local.css'

export default class App extends Component {
    constructor(props) {
        super(props)

        var actions = {
            setSelectedTag: this.setSelectedTag.bind(this),
            setSelectedNote: this.setSelectedNote.bind(this),
        }

        this.state = { ...initialState, actions }
    }

    setSelectedTag(id) {
        this.setState({
            ...this.state,
            selectedTag: id,
        })
    }

    setSelectedNote(id) {
        this.setState({
            ...this.state,
            selectedNote: id,
        })
    }

    getCurrentView() {
        return (
            <div className='main'>
                <div className='content'>
                    <Sidebar { ...this.state } />
                    <NotesBar { ...this.state } />
                    <Notes { ...this.state } />
                </div>
            </div>
        )
    }

    render() {
        return this.getCurrentView()
    }
}