
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'bugDB'

export const bugService = {
    query,
    getById,
    save,
    remove,
    getEmptyBug,
    getRandomBug,
    getDefaultFilter
}

function query(filterBy = {}) {
    filterBy = {...filterBy}
    return storageService.query(STORAGE_KEY)
        .then(bugs => {
            if (!filterBy.txt) filterBy.txt = ''
            if (!filterBy.maxCreatedAt) filterBy.maxCreatedAt = Infinity
            if (!filterBy.minSeverity) filterBy.minSeverity = -Infinity
            const regExp = new RegExp(filterBy.txt, 'i')
            return bugs.filter(bug =>
                regExp.test(bug.title) &&
                bug.createdat <= filterBy.maxCreatedAt &&
                bug.severity >= filterBy.minSeverity
            )
        })
}

function getById(bugId) {
    return storageService.get(STORAGE_KEY, bugId)
}

function remove(bugId) {
    // return Promise.reject('Not now!')
    return storageService.remove(STORAGE_KEY, bugId)
}


function save(bug) {
    if (bug._id) {
        return storageService.put(STORAGE_KEY, bug)
    } else {
        return storageService.post(STORAGE_KEY, bug)
    }
}

function getEmptyBug() {
    return {
        title: '',
        createdAt: '',
        severity: '',
    }
}

function getRandomBug() {
    return {
        title: 'bug a Susita-' + (Date.now() % 1000),
        createdAt: utilService.getRandomIntInclusive(1000, 9000),
        severity: utilService.getRandomIntInclusive(90, 200),
    }
}

function getDefaultFilter() {
    return { txt: '', maxCreatedAt: '', minSeverity: '' }
}

// TEST DATA
// storageService.post(STORAGE_KEY, {title: 'Subali Rahok 6', createdat: 980}).then(x => console.log(x))


