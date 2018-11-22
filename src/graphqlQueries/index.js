import gql from 'graphql-tag';

export const GET_VOTELIST = gql`
    query($id: ID!){
        getVoteList(id: $id) {
            id
            columnOrder
            columns {
                id
                title
                columnName
                userNames {
                    title
                    id
                }
            }
        }
    }
`

export const USER_SWAP = gql`
  mutation($input: UpdatedColumn!) {
      updateColumn (input: $input) {
          id
          title
      }
  }
`
