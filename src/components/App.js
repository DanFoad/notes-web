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
            createNewNote: this.createNewNote.bind(this),
            deleteTag: this.deleteTag.bind(this),
            createNewTag: this.createNewTag.bind(this),
            updateNoteTitle: this.updateNoteTitle.bind(this),
            updateNoteTag: this.updateNoteTag.bind(this),
        }

        this.state = { ...initialState, actions }
    }

    /**
     * Change the currently selected tag to the one matching param id
     * @param {Number} id ID of tag to set as selected
     */
    setSelectedTag(id) {
        this.setState({
            ...this.state,
            selectedTag: id,
        })
    }

    /**
     * Change the currently selected note to the one matching param id
     * @param {Number} id ID of note to set as selected
     */
    setSelectedNote(id) {
        this.setState({
            ...this.state,
            selectedNote: id,
        })
    }

    /**
     * Add a note object with default state to list of notes
     * @param {Object} note Note to add to list of notes
     */
    createNewNote(note) {
        this.setState({
            ...this.state,
            notes: [ ...this.state.notes, note ],
            selectedNote: note.id,
        })
    }

    /**
     * Delete the currently selected tag
     * 
     * NOT WORKING FOR SOME REASON
     */
    deleteTag() {
        const tags = [ ...this.state.tags ]
        var newTags = [];
        for (var i = 0; i < tags.length; i++) {
            if (tags[i].id !== this.state.selectedTag) newTags.push(tags[i])
        }
        this.setState({
            ...this.state,
            tags: newTags,
        })
    }

    /**
     * Create a new tag object with given name and add to list of tags
     * @param {String} name Name of the new tag to be added
     */
    createNewTag(name) {
        var id = this.state.tags[this.state.tags.length - 1].id + 1;
        this.setState({
            ...this.state,
            tags: [ ...this.state.tags, { id, name } ]
        })
    }

    /**
     * Update currently selected note title to given value
     * @param {String} title New title to set for currently selected note
     */
    updateNoteTitle(title) {
        var notes = [ ...this.state.notes ]
        notes[this.state.selectedNote].name = title
        this.setState({
            ...this.state,
            notes
        })
    }

    /**
     * Set currently selected note to new tag value
     * @param {Number} tag New tag option to set currently selected note to
     */
    updateNoteTag(tag) {
        var notes = [ ...this.state.notes ]
        notes[this.state.selectedNote].tag = tag
        this.setState({
            ...this.state,
            notes
        })
    }

    /**
     * Return the current view for the web app
     */
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