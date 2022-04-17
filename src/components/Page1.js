import React from 'react'
export default function Page1(props) {
  return (
    <div className="c justify-content-md-center" style={{width:"100%",display:"flex",flexDirection:"row",alignItems:"center",padding:"0px"}}>
    <div className="row justify-content-md-center mx-1 my-5"style={{width:"80%",alignContent:"center",padding:"0px"}}>
      {props.title.map(place => (
        <div className="col-sm-md-auto card mx-4 my-3" style={{width: "18rem" ,padding:"0px",margin:"0px"}}>
          <div className="card" style={{ width: "18rem" ,border: "0px",alignSelf:"center" }}>
            <div className="card-body">
              <h5 className="card-title">{place.name}</h5>
              <p className="card-text">Owner name: {place.owner.login}</p>
              <p className="card-text">Stars count: {place.stargazers_count}</p>
              <p className="card-text">Number of forks: {place.forks_count}</p>
              <p className="card-text">Language: {place.language}</p>
              <p className="card-text">{place.description}</p>
              <a href={place.html_url} className="btn btn-primary" target="_blank">See Details</a>
            </div>
          </div>
        </div>
      ))}
    </div>
    </div>

  )
}