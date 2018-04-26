import React, { Component } from 'react'
import { render } from 'react-dom'

import Sidebar from './Sidebar'

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
                </div>
            </div>
        )
    }

    render() {
        return this.getCurrentView()
    }
}