import React from "react"


import 'bootstrap/dist/css/bootstrap.min.css';

export default function Meme(){
    // const [memeImg , setMemeImg]=React.useState("")
    const [meme, setMeme]=React.useState({
        topText:"",
        bottomText: "",
        randomImg:"https://i.imgflip.com/1ur9b0.jpg"
    })
    const [allMeme, setAllMeme] = React.useState([])
    React.useEffect(()=>{
        fetch("https://api.imgflip.com/get_memes")
        .then(res=> res.json())
        .then(data => setAllMeme(data.data.memes))
    },[])

    function getImg(){
        
        const randommeme=Math.floor(Math.random() * allMeme.length)
        const url= allMeme[randommeme].url
        // setMemeImg(url)
        setMeme(prevmeme => ({
            ...prevmeme ,
            randomImg: url
        }))
        
        
    }
    function handleChange(event){
        const {name, value}=event.target
        return setMeme(prevMeme => {
            return {
                ...prevMeme,
                [name]: value
                
            }
        })
    }

    return(
        <main>
            <div className="container-sm">
                
        <div className="forms row">
            <input 
            className="form-text col-sm" 
            type="text"
            placeholder="Top Text" 
            name="topText"
            value={meme.topText}
            onChange={handleChange}
             />
            <input 
            className="form-text col-sm"
            type="text"
            placeholder="bottom text" 
            name="bottomText"
            value={meme.bottomText}
            onChange={handleChange}
            />
            
            <button className="form-btn" type="input" onClick={getImg}>Get a new meme image 🖼</button>
            
            
        
        </div>
        
        <div className="meme col-sm-6">
        <img
          src={meme.randomImg}
          className="card-img-top meme-img"
          alt="..."
        />
        <div className="card-img-overlay justify-content-start d-flex flex-column">
          <h1 className="text-break text-center mt-4 meme-text">
            {meme.topText}
          </h1>
          <div className="card-img-overlay justify-content-end d-flex flex-column">
            <h1 className="text-break text-center overflow-hidden meme-text">
              {meme.bottomText}
            </h1>
          </div>
        </div>
      </div>
      </div>
        </main>
    )
}