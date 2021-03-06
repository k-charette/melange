import React, { useState } from 'react'
import Planets from './Planets'
import Search from './Search'
import { gql } from 'apollo-boost';
import { useLazyQuery } from '@apollo/react-hooks';
import Spinner from './Spinner'

const SEARCH = gql`
query Search($match: String) {
    planets(order_by: { name: asc }, where: { name: { _ilike: $match }}) {
      name
      imageUrl
      inhabitants
      id
    }
  }
`

const PlanetSearch = () => {

    const [searchValue, setSearchValue] = useState('') 
    const [search, { loading, error, data }] = useLazyQuery(SEARCH)

    if (loading) return <Spinner />
    if (error) return <p>Error :( </p>
    return(
        <div>
            <Search 
                searchValue={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onSearch={() => search({ variables: { match: `%${searchValue}%` } })}
                onKeyPress={(ev) => {
                    if (ev.key === 'Enter'){
                        search({ variables: { match: `%${searchValue}%`}})
                        ev.preventDefault()
                    }
                }}
            />
            <Planets 
                newPlanets={data ? data.planets : null}
            />
        </div>
    )
}

export default PlanetSearch