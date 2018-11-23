# Simple Restaurant voter for the Station Five Team WIP. Using GraphQL + React-beautiful-dnd + hooks!

WIP App can be found here 
[s5-food-voter](https://s5-lets-eat.firebaseapp.com/)

## To install please do the following
1) Clone the repo
2) Yarn install
3) Create .env file and add the following REACT_APP_S5_BASE_URL=https://s5-food.herokuapp.com/graphql (obviously shouldn't be sharing this, but not sensitive so that's ok)

## Need to do the following
1) Clean up the onDragFunction - got it going but need to refactor and use proper variable names
2) The use case when more than one user is using the app
3) Currently am mutating state, this is not ideal. Just wanted to get it working with GraphQL + React-beautiful-dnd

## Challenges/Things learnt
1) Using Apollo Mutations is a bit annoying, writing to the cache as well as the db. 
2) Passing the mutation function is also a bit weird feeling, not sure how I feel about this yet but definitely something to read up on and what good practice is.
3) GraphQL offers a lot of power, but with great power comes great responsibility. Using it further for the BE and FE I believe a strict pattern should be in place ensuring logical separation of concerns.
4) react-beautiful-dnd is fantastic! However it did get very tricky making it work with Apollo and GraphQL. Definetly need to refactor and figure out a way to batch the mutations in someway? I also don't like the mutating of data. Although we are passed the droppableId, still feels a little awkward. 
5) That being said, I do love/am really excited by GraphQL + Apollo and will continue to play around with it more!

## Adding Apollo and GraphQl 
Installed the following packages for GraphQL and Apollo. (THAT'S ALOT OF THINGS JUST FOR THE CLIENT!)
1) react-apollo 
2) apollo-client
3) apollo-link-http
4) apollo-cache-memory
5) graphql
6) graphql-tag


