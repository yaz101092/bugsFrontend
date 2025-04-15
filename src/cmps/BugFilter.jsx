// const { useState, useEffect, useRef } = React

import { useEffect, useRef, useState } from "react"
import { utilService } from "../services/util.service.js"


export function BugFilter({ filterBy, onSetFilterBy }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    const onSetFilterDebounce = useRef(utilService.debounce(onSetFilterBy, 300)).current

    useEffect(() => {
        onSetFilterDebounce(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field, type } = target
        value = type === 'number' ? +value : value
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    return (
        <section className="bug-filter ">
            <h2>Bugs Filter</h2>
            <form >
                <div>
                    <label htmlFor="title">Title:</label>
                    <input type="text"
                        id="title"
                        name="txt"
                        placeholder="By title"
                        value={filterByToEdit.txt}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="maxCreatedAt">Max createdAt:</label>
                    <input type="number"
                        id="maxCreatedAt"
                        name="maxCreatedAt"
                        placeholder="By max createdAt"
                        value={filterByToEdit.maxCreatedAt || ''}
                        onChange={handleChange}
                    />
                </div>
                <div>

                    <label htmlFor="minSeverity">Min severity:</label>
                    <input type="number"
                        id="minSeverity"
                        name="minSeverity"
                        placeholder="By min severity"
                        value={filterByToEdit.minSeverity || ''}
                        onChange={handleChange}
                    />
                </div>

            </form>
        </section>
    )
}