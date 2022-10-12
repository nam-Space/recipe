import styled from "styled-components"
import { useState } from "react"
import { FaSearch } from "react-icons/fa"
import { useNavigate } from "react-router-dom"

function Search() {
    const [input, setInput] = useState('')
    const navigate = useNavigate()

    const submitHandler = (e) => {
        e.preventDefault()
        if (input) {
            navigate(`/searched/${input}`)
        }
    }

    return (
        <FormStyle onSubmit={submitHandler}>
            <div>
                <FaSearch/>
                <input 
                    onChange={(e) => setInput(e.target.value)}
                    value={input}
                    type="text" 
                />
            </div>
            
        </FormStyle>    
    )
}

const FormStyle = styled.form`
    margin: 0 20rem;
    
    div {
        width: 100%;
        position: relative;
    }

    input{
        border: none;
        background: linear-gradient(35deg, #494949, #313131);
        font-size: 1.5rem;
        color: white;
        padding: 1rem 3rem;
        border: none;
        border-radius: 1rem;
        outline: none;
        width: 100%;
    }

    svg {
        position: absolute;
        top: 50%;
        left: 0;
        transform: translate(100%, -50%);
        color: white;
    }

    @media (max-width: 1280px) {
        margin: 0 10rem;
    }

    @media (max-width: 768px) {
        margin: 0;
    }
`

export default Search