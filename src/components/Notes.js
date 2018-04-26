import React, {Component} from 'react'

import Select from 'react-select'

import NotesMenu from './NotesMenu'
import NoteEditor from './NoteEditor'

export default class Notes extends Component {

    constructor(props) {
        super(props)

        var selectedNoteVal = props.notes.find((note) => {
            return note.id == props.selectedNote
        })
        if (selectedNoteVal === undefined) selectedNoteVal = {id: -1, name: '', tag: -1, text: ''}

        this.state = {
            selectedNote: props.selectedNote,
            noteName: selectedNoteVal.name,
            noteTag: selectedNoteVal.tag,
            noteText: selectedNoteVal.text,
            tags: props.tags,
            editorState: props.editorState,
            selectionState: props.selectionState,
        }

        this.getNoteContent = this.getNoteContent.bind(this)
        this.getTagName = this.getTagName.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        var selectedNoteVal = nextProps.notes.find((note) => {
            return note.id == nextProps.selectedNote
        })
        if (selectedNoteVal === undefined) selectedNoteVal = {id: -1, name: '', tag: -1, text: ''}
        
        this.setState({
            selectedNote: nextProps.selectedNote,
            noteName: selectedNoteVal.name,
            noteTag: selectedNoteVal.tag,
            noteText: selectedNoteVal.text,
            tags: nextProps.tags,
            editorState: nextProps.editorState,
            selectionState: nextProps.selectionState,
        })
    }

    getTagName() {
        if (this.state.noteTag == -1) return ''
        return '#' + this.state.tags.find((tag) => tag.id == this.state.noteTag).name
    }

    handleTitleChange(event) {
        this.props.actions.updateNoteTitle(event.target.value)
    }

    handleSelectChange(selectedOption) {
        this.props.actions.updateNoteTag(selectedOption.value)
    }

    getOptions() {
        var options = []
        for (var i = 0; i < this.state.tags.length; i++) {
            options.push({ value: this.state.tags[i].id, label: '#' + this.state.tags[i].name })
        }
        return options
    }

    getNoteContent() {
        return (
            <div className='notes'>
                <input className='note__title' value={this.state.noteName} ref='titleInput' onChange={this.handleTitleChange.bind(this)} />
                {(this.state.selectedNote == -1) ? '' : <Select
                    name='notes-tag-select'
                    value={this.state.noteTag}
                    onChange={this.handleSelectChange.bind(this)}
                    options={this.getOptions()}
                />}
                <NotesMenu />
                <NoteEditor id={this.state.selectedNote} initialValue={this.state.noteText} editorState={this.state.editorState} selectionState={this.state.selectionState} updateHandler={this.props.actions.updateNoteEditor} />
            </div>
        )
    }

    render () {
        return (
            this.getNoteContent()
        )
    }
}