import React, { useState, useEffect } from "react";
import GifSearch from "./GifSearch";
import GifList from "./GifList";

function GifListContainer() {
  const [gifs, setGifs] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (query !== "") {
      // Replace 'YOUR_API_KEY' with your actual Giphy API key
      const apiKey = "EW4SJcsl10OLo06b9jDoZ3CqF3pxSqVE";
      const apiUrl = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${query}&limit=3&offset=0&rating=g&lang=en&bundle=messaging_non_clips`;

      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          const fetchedGifs = data.data.map((gif) => ({
            id: gif.id,
            url: gif.images.fixed_height.url,
            title: gif.title,
          }));
          setGifs(fetchedGifs);
        })
        .catch((error) => {
          console.error("Error fetching data from Giphy API: ", error);
          // Handle errors, e.g., set an error state for your component
        });
    }
  }, [query]);

  const handleSearchSubmit = (searchQuery) => {
    setQuery(searchQuery);
  };

  return (
    <div>
      <GifSearch onSubmit={handleSearchSubmit} />
      <GifList gifs={gifs} />
    </div>
  );
}

export default GifListContainer;




// import React, { Component } from 'react';
// import GifList from './GifList'; // Assume GifList is the component to display gifs
// import GifSearch from './GifSearch'; // Assume GifSearch is the component for the search form

// class GifListContainer extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       gifs: [],
//     };
//   }

//   componentDidMount() {
//     // Fetch data from the provided Giphy API URL and update the component state
//     this.fetchGifs();
//   }

//   fetchGifs = () => {
//     const apiUrl =
//       'https://api.giphy.com/v1/gifs/search?api_key=EW4SJcsl10OLo06b9jDoZ3CqF3pxSqVE&q=g&limit=25&offset=0&rating=g&lang=en&bundle=messaging_non_clips';

//     fetch(apiUrl)
//       .then(response => response.json())
//       .then(data => {
//         this.setState({ gifs: data.data });
//       })
//       .catch(error => console.error('Error fetching data:', error));
//   };

//   handleSearch = query => {
//     const apiUrl = `https://api.giphy.com/v1/gifs/search?api_key=YOUR_API_KEY&q=${query}&limit=25&offset=0&rating=g&lang=en&bundle=messaging_non_clips`;
    
//     this.setState({ gifs: [] }); // Reset gifs to empty array before fetching new data
//     fetch(apiUrl)
//       .then(response => response.json())
//       .then(data => {
//         this.setState({ gifs: data.data });
//       })
//       .catch(error => console.error('Error fetching data:', error));
//   };

//   render() {
//     return (
//       <div>
//         {/* Render the search form and pass down the submit handler */}
//         <GifSearch onSearch={this.handleSearch} />
//         {/* Render the list of gifs and pass down the fetched data */}
//         <GifList gifs={this.state.gifs} />
//       </div>
//     );
//   }
// }

// export default GifListContainer;
