/**
 * THIS SCRIPT DELETES DATA!
 *
 * To use this script:
 * 1. Put this script in your studio-folder
 * 2. Write a GROQ filter that outputs the documents you want to delete
 * 3. Run `sanity dataset export` to backup your dataset before deleting a bunch of documents
 * 4. Run `sanity exec deleteDocsByFilter.js --with-user-token` to delete the documents
 *
 * NOTE: For the time being you should not delete more than ~1000 documents in one transaction. This will change in the future.
 * See docs:https://www.sanity.io/docs/http-api/http-mutations#deleting-multiple-documents-by-query
 */

const sanityClient = require('@sanity/client')

const san = sanityClient.createClient({
  projectId: 'hap90xhy',
  dataset: 'production',
  apiVersion: '2022-03-07',
  token: `sk8cY9Uc0UIWJH3uEzvlZiO0dFexk0Lof2Y1T91UM21hjf46iz9lUT9XdLZx2LQZ7hXWEcIWnINfscDOW7BCLDR0if6fpRrLYL86TcT63wXYN3wfDGVQvcgzaJKGnKALIFgrfItNJhWTUTMpW3TmJpHkE4zk2fAV6lZCN3djrW5ufpqsIvuQ`,
  useCdn: false,
})

san.delete({query: '*[_type == "product"][0...100]'}).then(console.log).catch(console.error)
