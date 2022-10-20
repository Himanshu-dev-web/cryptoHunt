import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'



const  cryptoNewsHeaders = {
    'X-BingApis-SDK': 'true',
    'X-RapidAPI-Key': '4e6e7fc431msh9b39bbb65626133p17682fjsn2801eb7bf154',
    'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
}


const baseUrl = 'https://bing-news-search1.p.rapidapi.com'


const createRequest = (url) => ({ url, headers:cryptoNewsHeaders })


export const newsApi = createApi({

	reducerPath:'newsApi',
	baseQuery: fetchBaseQuery( {baseUrl}),
	endpoints : (builder) => ({
		 getNews : builder.query({
			query: ({newsCategory, count}) => createRequest(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`),
		 })
	})
})

export const {
	useGetNewsQuery,
} = newsApi;
  