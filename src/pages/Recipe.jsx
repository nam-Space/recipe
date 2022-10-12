import { useEffect, useState } from "react"
import styled from "styled-components"
import { useParams } from "react-router-dom"

function Recipe() {
  let params = useParams()
  const [details, setDetails] = useState({})
  const [activeTab, setActiveTab] = useState('instructions')

  const fetchDetails = async () => {
    const data = await fetch(`https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`)
    const detailData = await data.json()
    setDetails(detailData)
  }

  useEffect(() => {
    fetchDetails()
  }, [params.name])

  return (
    <DetailWrapper>
      <div className="wrapper-img">
        <h2>{details.title}</h2>
        <img src={details.image} alt="" />
      </div>
      <Info className="wrapper-recipe">
        <div className="wrapper-btn">
          <Button className={activeTab === 'instructions' ? 'active' : ''} onClick={() => setActiveTab('instructions')}>Instructions</Button>
          <Button className={activeTab === 'ingredients' ? 'active' : ''} onClick={() => setActiveTab('ingredients')}>Ingredients</Button>
        </div>
        {activeTab === 'instructions' ? (
          <div>
            <h3 dangerouslySetInnerHTML={{ __html: details.summary }}></h3>
            <h3 dangerouslySetInnerHTML={{ __html: details.instructions }}></h3>
          </div>
        ) : (
          <ul>
            {details.extendedIngredients.map((ingredient) => (
              <li key={ingredient.id}>{ingredient.original}</li>
            ))}
          </ul>
        )}
      </Info>
    </DetailWrapper>
  )
}

const DetailWrapper = styled.div`
  margin-top: 10rem;
  margin-bottom: 5rem;
  display: flex;
  .active {
    background: linear-gradient(35deg, #494949, #313131);
    color: white
  }
  .wrapper-img{
    width: 40%;
  }

  .wrapper-img img {
    width: 90%;
    border-radius: 20px;
  }

  h2 {
    margin-bottom: 2rem;
    padding-right: 30px;
    font-size: 25px;
  }

  .wrapper-recipe{
    margin-left: 0;
    flex: 1;
  }

  h3 {
    font-size: 16px;
  }

  li {
    font-size: 1.2rem;
    line-height: 2.5rem;
  }
  ul {
    margin-top: 2rem;
  }

  @media (max-width: 768px) {
    flex-wrap: wrap;
    .wrapper-img{
      width: 100%;
    }

    h2 {
      padding-right: 0;
    }

    .wrapper-recipe{
      margin-top: 50px;
    }
  }

  @media (max-width: 768px) {
    .wrapper-btn{
      display: flex;
    }

    Button:last-child{
      margin-right: 0;
    }
  }
`

const Button = styled.button`
  padding: 1rem 2rem;
  color: #313131;
  background: white;
  border: 2px solid black;
  margin-right: 2rem;
  font-weight: 600;
`

const Info = styled.div`
  margin-left: 10rem;
`

export default Recipe