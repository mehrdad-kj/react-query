import axios from "axios"
import { useQuery } from "react-query"


const fetchSuperHeroes = () => {
  return axios.get('http://localhost:4000/superheroes')
}

export const RQSuperHeroesPage = () => {

  const onSuccess = (data) => {
    console.log("data", data)
  }

  const onError = (error) => {
    console.log("error", error)
  }

  const { data, isLoading, isError, error, isFetching } = useQuery('superheroes', fetchSuperHeroes, {
    onSuccess,
    onError,
    select: (data) => {
      const filteredData = data.data.filter((e) => e.name.includes("woman"))
      console.log("filteredData", filteredData)
      return filteredData;
    }
  })


  console.log({isLoading, isFetching})

  
  if (isLoading) {
    return <h2>Loading ...</h2>
  }

  if (isError) {
    return <h2>{error.message}</h2>
  }
  
  return (
    <div>
      <button>Fetch Heroes</button>
      {/* {data?.data.map((i) => <div key={i.id}>{i.name}</div>)} */}
      {data.map((i) => <div key={i}>{i.name}</div>)}
    </div>
  )
}
