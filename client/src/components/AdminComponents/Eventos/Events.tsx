import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks/hooks'
import SearchBar from '../../SearchBar/SearchBar'
import DisplayEvents from './DisplayEvents'
import { RootState } from '../../../redux/store/store'
import { getAllShows } from '../../../redux/thunks/show'

export const Events = () => {
    const dispatch = useAppDispatch();
    const data = useAppSelector((state: RootState) => state.shows)

    useEffect(() => {
        dispatch(getAllShows())
    }, [dispatch])

    useEffect(() => {
        console.log(data);
    }, [data])
    return (
        <>
            <div>
                <SearchBar />
            </div>
            <div className="w-max mt-6">
                <DisplayEvents />
            </div>
        </>
    )
}

