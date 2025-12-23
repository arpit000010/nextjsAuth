

export default async function UserProfile({params}: any){

    const {id} = await params;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <h1 className="text-4xl" >Profile Page <span className="p-2 rounded ml-2 bg-orange-500 text-black">{id}</span></h1>
        </div>
    )
}