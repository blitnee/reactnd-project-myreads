import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

class SearchBooks extends Component {

	state = {
		query: '',
		reBooks: []
	}

	updateQuery = (query) => {
		this.setState({ query: query.trim() })
		 console.log('query: ')
		 console.log(query)
	}

  render() {
  	const { reBooks } = this.state
  	const { query } = this.state

  	if (query) {
  		BooksAPI.search(query).then((reBooks) => {
      	this.setState({ reBooks })
    	})
  	} else {
  		console.log('clear books')

  	}

  	return(

		  <div className="search-books">
		    <div className="search-books-bar">
		      <Link className="close-search" to='/'>Close</Link>
		      <div className="search-books-input-wrapper">
		        <input
        			className='search-books'
        			type="text"
        			placeholder="Search by title or author"
        			value={query}
        			onChange={(event) => this.updateQuery(event.target.value)}
		        />
		      </div>
		    </div>
		    <div className="search-books-results">
		      <ol className="books-grid">

            { reBooks.map(( book ) => (
              <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    <div className="book-cover" style={{
                      width: 128, height: 193,
                      backgroundImage: `url(${book.imageLinks.thumbnail})`
                    }}/>
                    <div className="book-shelf-changer">
                        <select value={book.shelf}>
                        <option value="none" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                  </div>
                  <div className="book-title">{book.title}</div>
                  <div className="book-authors">{book.authors}</div>
                </div>
              </li>
            ))}

          </ol>
		    </div>
		  </div>
		)
	}

}

export default SearchBooks