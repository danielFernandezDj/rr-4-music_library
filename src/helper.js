// const API_URL = `https://itunes.apple.com/search?term=`
// const fetchSearch = async (searchTerm) => {
//     const response = await fetch(API_URL + searchTerm)
//     const resData = await response.json()
//     return resData.results
// }

const fetchData = async () => {
  try {
    document.title = `${search} Music`
    const response = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(search)}`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const resData = await response.json()
    if (resData.results.length > 0) {
      setData(resData.results)
    } else {
      setMessage('Not Found')
    }
  } catch (error) {
    console.error("Fetch error: ", error);
    setMessage('Failed to fetch data')
  }
}
if (search) {
  fetchData()
}

// Being that our fetchSearch function returns a promise,
// We want wrapPromise to take that promise as an argument.
const wrapPromise = (promise) => {
  // the default state of our promise. We assume it to be pending.
  let status = 'pending'
  // result will store the data we get from the promise.
  let result = ''
  // our suspender represents the resolution of the promise.
  // An ideal resolution should flag the status to "success"
  // And our catch should set it to "error".
  let suspender = promise.then(response => {
    status = 'success'
    result = response
  }, err => {
    status = 'error'
    result = err
  })

  // finally, we should plan to return an object that emits
  // a different response depending on our status:
  return {
    read() {
      // if the promise hasn't triggered, run it!
      if (status === 'pending') {
        throw suspender
      }
      // otherwise, send an error
      else if (status === 'error') {
        throw result
      }
      // if the status is neither "pending" nor "error",
      // we should just send the result forward!
      return result
    }
  }
}

export const createRessource = (searchTerm) => {
  return {
    result: wrapPromise(fetchSearch(searchTerm))
  }
}