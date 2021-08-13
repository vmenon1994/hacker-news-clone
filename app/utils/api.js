const BASE_URL = `https://hacker-news.firebaseio.com/v0/`

function getStoryIds(storyType) {
  const storyTypeRoute =
    storyType === 'new'
      ? 'newstories.json?print=pretty'
      : 'topstories.json?print=pretty'

  return fetch(`${BASE_URL}${storyTypeRoute}`)
    .then((response) => {
      if (response.status === 200) {
        return response.json()
      } else {
        throw new Error('Failed to get Post details')
      }
    })
    .then((storyIds) => storyIds.slice(0, 50))
}

export function getItem(id) {
  return fetch(`${BASE_URL}item/${id}.json?print=pretty`).then(
    (response) => {
      if (response.status === 200 && response) {
        return response.json()
      } else {
        throw new Error('Failed to get Post details')
      }
    },
  )
  .then((response) => {
    if(response === null) return []
    else return response
  } )
}

function getItems(ids) {
  return ids.map(getItem)
}

function filterStories(items){
  return items.filter((item) => item.type === "story" && !item.deleted && !item.dead)
} 

export default function getStories(storyType) {
  return getStoryIds(storyType)
  .then((storyIds) =>
    (getItems(storyIds))
  )
  .then((storyItems) => Promise.all(storyItems))
  .then((storyItems) => filterStories(storyItems))

}

function getCommentIds(story){
  if (story.kids) {
    console.log(story.kids)
    return story.kids
  }
  else return []
}

export function getStoryComments(story){
  return Promise.all(getItems(getCommentIds(story)))
}

export function getUser(username){
  return fetch(`${BASE_URL}user/${username}.json?print=pretty`).then(
    (response) => {
      if (response.status === 200) {
        return response.json()
      } else {
        throw new Error('Failed to get User details')
      }
    },
  )
}



export function getUserStories(userSubmissions){
  return Promise.all(getItems(userSubmissions))
         .then((userSubmissions) => filterStories(userSubmissions))
         .then((userStories) => userStories)
         
}

