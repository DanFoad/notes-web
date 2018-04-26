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

        this.state = { ...initialState }
    }

    getCurrentView() {
        return (
            <div className='main'>
                <div className='content'>
                    <Sidebar
                        selectedTag = { this.state.selectedTag }
                        tags = { this.state.tags }
                        notes = { this.state.notes }
                    />
                    <NotesBar
                        selectedTag = { this.state.selectedTag }
                        selectedNote = { this.state.selectedNote }
                        tags = { this.state.tags }
                        notes = { this.state.notes }
                    />
                    <Notes
                        selectedNote = { this.state.selectedNote }
                        notes = { this.state.notes }
                        tags = { this.state.tags }
                        editorState = { this.state.editorState }
                        selectionState = { this.state.selectionState }
                    />
                </div>
            </div>
        )
    }

    render() {
        return this.getCurrentView()
    }
}