import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from './BooksAPI'

class SearchBooks extends Component {

	state = {
		query: '',
		results: [],
	}

	updateResults = (results) => {
		results.error || results === false
			? this.setState(() => ({ results: [] }))
			: this.setState(() => ({ results: results }))
	}

	updateQuery = (input) => {
		this.setState(() => ({
			query: input.trim()
		}))
		input
			? BooksAPI.search(input.trim()).then((results) => { this.updateResults(results) })
			: this.updateResults(false)
	}

	changeShelf = (book, shelf) => {
		BooksAPI.update(book, shelf)
	}

	render() {
		const { query, results } = this.state
		return(
			<div className="search-books">
				<div className="search-books-bar">
					<Link className="close-search" to='/'>Close</Link>
					<div className="search-books-input-wrapper">
						<input
							className='search-books'
							type="text"
							placeholder="Search by title or author"
							value={ query }
							onChange={(event) => this.updateQuery(event.target.value)}
						/>
					</div>
				</div>
				<div className="search-books-results">
					<ol className="books-grid">
						{ results.map((book) => (
							<Book
								book={ book }
								key={ book.id }
								onChangeShelf={(book, shelf) => {
									this.changeShelf(book, shelf) }}
								/>
						))}
					</ol>
				</div>
			</div>
		)
	}

}

export default SearchBooks
