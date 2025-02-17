import React from 'react'
import Form from 'next/form'
import SearchFormReset from './SearchFormReset'

const SearchForm = ({query}:{query?:string}) => {
  return (
      <Form action="/" scroll = {false} className='search-form'>
        <input type="text" name='query' defaultValue="" placeholder='Search Startups' className='search-input' />
        <div className='flex gap-2'>
            {query && <SearchFormReset/>}
            <button className='search-btn text-white'>
                S
            </button>
        </div>
      </Form>
  )
}

export default SearchForm
