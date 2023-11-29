const newsAPI = require('newsapi')
const newsapi= new newsAPI('3a32b7a0995a4210844a7c4a360aeab6');

export async function getAllNews()
{
await newsapi.v2.everything({
    q: 'bitcoin',
    sources: 'bbc-news,the-verge',
    domains: 'bbc.co.uk, techcrunch.com',
    from: '2022-12-0',
    to: '2023-10-10',
    language: 'en',
    sortBy: 'relevancy',
    page: 2
  }).then(response => {
    console.log(response);
    /*
      {
        status: "ok",
        articles: [...]
      }
    */
   return {data: response}
  })
  .catch(err=>{
    console.log("ERR", err);
    return {error:err};
  });
}

