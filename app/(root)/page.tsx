import Image from "next/image";
import SearchForm from "../../components/SearchForm";
import StartupCard from "@/components/StartupCard";
import { client } from "@/sanity/lib/client";
import { STARTUPS_QUERIES } from "@/sanity/lib/queries";

export default async function Home({searchParams}:{searchParams: Promise<{query:string}>}) {
  const query = (await searchParams).query;
  const posts = await client.fetch(STARTUPS_QUERIES);
  console.log(JSON.stringify(posts,null,2));
  // const posts =[
  //   {
  //     _createdAt: new Date(),
  //     views: 55,
  //     author:{_id: 1,name:'Daksh'},
  //     _id: 1,
  //     description: "This is the description of the startup",
  //     image:"https://images.unsplash.com/photo-1739433438073-397a07dccdd5?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyM3x8fGVufDB8fHx8fA%3D%3D",
  //     category: "ghosts",
  //     title: "ghostbusters"
  //   },
  //   {
  //     _createdAt: new Date(),
  //     views: 55,
  //     author:{_id: 1,name:'Daksh'},
  //     _id: 2,
  //     description: "This is the description of the startup",
  //     image:"https://images.unsplash.com/photo-1739433438073-397a07dccdd5?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyM3x8fGVufDB8fHx8fA%3D%3D",
  //     category: "ghosts",
  //     title: "ghostbusters"
  //   },
  //   {
  //     _createdAt: new Date(),
  //     views: 55,
  //     author:{_id: 3,name:'Daksh'},
  //     _id: 3,
  //     description: "This is the description of the startup",
  //     image:"https://images.unsplash.com/photo-1739433438073-397a07dccdd5?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyM3x8fGVufDB8fHx8fA%3D%3D",
  //     category: "ghosts",
  //     title: "ghostbusters"
  //   },
  //   {
  //     _createdAt: new Date(),
  //     views: 55,
  //     author:{_id: 1,name:'Daksh'},
  //     _id: 4,
  //     description: "This is the description of the startup",
  //     image:"https://images.unsplash.com/photo-1739433438073-397a07dccdd5?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyM3x8fGVufDB8fHx8fA%3D%3D",
  //     category: "ghosts",
  //     title: "ghostbusters"
  //   },
  //   {
  //     _createdAt: new Date(),
  //     views: 55,
  //     author:{_id: 5,name:'Daksh'},
  //     _id: 5,
  //     description: "This is the description of the startup",
  //     image:"https://images.unsplash.com/photo-1739433438073-397a07dccdd5?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyM3x8fGVufDB8fHx8fA%3D%3D",
  //     category: "ghosts",
  //     title: "ghostbusters"
  //   },
  // ];
  return (
    <>
    <section className="pink_container">
      <h1 className="heading">Pitch Your startup, <br /> connect with Entrepreneurs</h1>
      <p className="sub-heading !max-w-3xl">
        Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions.
      </p>
      <SearchForm query={query}/>
    </section>
    <section className="section_container">
      <p className="text-30-semibold">
        {query ? `Search results for ${query}`: "All Startups"}
      </p>
      <ul className="mt-7 card_grid">
        {posts.length>0 ? (
          posts.map((post: StartupCardType)=>(
            <StartupCard key={post?. _id} post = {post}/>
          ))
        ): (
          <p className="no-results">
            No Startups Found!
          </p>
        )}
      </ul>
    </section>
    </>
  );
}
