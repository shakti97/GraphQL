import React, { } from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

var getBookQuery = gql`
{
    books{
        name
        genre
        id
    }
}`

class BookList extends React.Component {
    display(){
        var data=this.props.data;
        if(data.loading){
            return (<div>Loading Data...</div>)
        }
        else{
            return data.books.map(book=>{
                return(
                <li key={book.id}>{book.name}</li>
                )
            })
        }
    }
    render()
        { return(
            <React.Fragment>
               
                <ul ><h2>BookName</h2>
                    {this.display()}
                </ul>
            </React.Fragment>
            )
        }
}
export default graphql(getBookQuery)(BookList);