import React, { Component } from 'react'
import PropTypes from 'prop-types'

class BookMenu extends Component {

	static PropTypes = {
		onNewValue: PropTypes.func.isRequired,
		book: PropTypes.object.isRequired
	}

// state should equal the value of book.shelf
// when handle submit occurs, it should update the API
// when the API updates it should send the new value to state

	handleSubmit = (book , e) => {
		e.preventDefault();
		if(this.props.onNewValue){
			this.props.onNewValue(book , e.target.value);
		}
	}

	render() {
		const { book } = this.props
		/*
		 * Should compare books in myBooks for nonSelect status or other value,
		 * or! Add book.shelf value to those already in myBooks from SearchBooks.js
		 */

		// if (!book.shelf) {
		//   book.shelf = 'noneSelect'
		// }
		return(
			<div className="book-shelf-changer">
				<select value={ book.shelf } onChange={ (e) => this.handleSubmit(book, e)}>
					<option value="select" disabled>Move to...</option>
					<option value="currentlyReading">Currently Reading</option>
					<option value="wantToRead">Want to Read</option>
					<option value="read">Read</option>
					<option value="none">None</option>
				</select>
			</div>
		)
	}
}

export default BookMenu